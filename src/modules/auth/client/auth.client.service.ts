import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OtpEntity } from '../entities/otp.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { randomInt } from 'crypto';
import { generateCode } from 'src/common/types/generateCode.type';

@Injectable()
export class AuthAppService {
  constructor(
    @InjectRepository(OtpEntity)
    private readonly Otp_Repository: Repository<OtpEntity>,
  ) {}

  //private methods
  private async CheckExpire(otp: OtpEntity) {
    return otp.expiredAt < new Date(Date.now());
  }

  private async CheckRate(mobile: string) {
    const otp = await this.Otp_Repository.findOne({
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

  private async DeleteOtp(otp: OtpEntity) {
    return (
      await this.Otp_Repository.delete({
        mobile: otp.mobile,
        otpCode: otp.otpCode,
      })
    ).affected;
  }

  private async ValidateOtp(mobile: string, otpCode: string) {
    const otp = await this.Otp_Repository.findOne({
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

  //public methods
  public async createOtp(mobile: string) {
    await this.CheckRate(mobile);

    const newOtpCode = await this.generateOtp();

    const newOtp = this.Otp_Repository.create({
      mobile,
      otpCode: newOtpCode.hashedOtp,
    });

    await this.Otp_Repository.save(newOtp);

    return newOtpCode.otp;
  }

  //exports
}
