import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SupplierService } from 'src/modules/supplier/supplier.service';
import { SupplierOtpEntity } from '../entities/supplier-otp.entity';
import * as bcrypt from 'bcrypt';
import { randomInt } from 'crypto';
import { generateCode } from 'src/common/types/generateCode.type';

@Injectable()
export class AuthSupplierService {
  constructor(
    private readonly SupplierService: SupplierService,
    @InjectRepository(SupplierOtpEntity)
    private readonly SupplierOtp_Repository: Repository<SupplierOtpEntity>,
  ) {}

  //private methods
  private async CheckRate(mobile: string) {
    const otp = await this.SupplierOtp_Repository.findOne({
      where: { mobile },
      order: { createdAt: 'DESC' },
    });

    if (otp) {
      const expireResult = await this.CheckExpire(otp);

      if (!expireResult) {
        throw new HttpException(
          'Too many request',
          HttpStatus.TOO_MANY_REQUESTS,
        );
      }
    }
  }

  private async CheckExpire(otp: SupplierOtpEntity) {
    return otp.expiredAt < new Date(Date.now());
  }

  private async generateUniqueInviteLink(mobile: string) {
    const cleanMobile = mobile.replace(/\D/g, '');
    const prime1 = 73856093;
    const prime2 = 19349663;

    let hash = 0;
    for (let i = 0; i < cleanMobile.length; i++) {
      hash = (hash * prime1) ^ (cleanMobile.charCodeAt(i) * prime2);
    }

    return `${process.env.APP_URL}/${Math.abs(hash % 1000000)}-${Date.now()}`;
  }

  private async DeleteOtp(otp: SupplierOtpEntity) {
    return (
      await this.SupplierOtp_Repository.delete({
        mobile: otp.mobile,
        otpCode: otp.otpCode,
      })
    ).affected;
  }

  private async ValidateOtp(mobile: string, otpCode: string) {
    const otp = await this.SupplierOtp_Repository.findOne({
      where: {
        mobile,
      },
      order: { createdAt: 'DESC' },
    });

    if (!otp) {
      throw new NotFoundException('There is no otp for this Mobile-number');
    }

    const isMatch = await bcrypt.compare(otpCode, otp.otpCode);

    if (!isMatch) {
      throw new BadRequestException('Wrong otp for this mobile-number');
    }

    return otp;
  }

  private async generateOtp(): Promise<generateCode> {
    const otpCode = randomInt(10000, 99999).toString();
    const hashedOtpCode = await bcrypt.hash(otpCode, 10);

    return {
      otp: otpCode,
      hashedOtp: hashedOtpCode,
    };
  }

  private async verifyOtp(mobile: string, otpCode: string) {
    const otp = await this.ValidateOtp(mobile, otpCode);

    const exprireResult = await this.CheckExpire(otp);

    if (exprireResult) {
      throw new BadRequestException('Otp has expired');
    }

    await this.DeleteOtp(otp);
  }

  //public methods

  public async getOtp(mobile: string) {
    await this.CheckRate(mobile);

    const newOtpCode = await this.generateOtp();

    const newOtp = this.SupplierOtp_Repository.create({
      mobile,
      otpCode: newOtpCode.hashedOtp,
    });

    await this.SupplierOtp_Repository.save(newOtp);

    return newOtpCode.otp;
  }
}
