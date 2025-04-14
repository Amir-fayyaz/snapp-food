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
import { SignInDto } from '../dto/signInDto.dto';
import { v4 as uuidv4 } from 'uuid';
import { IUser } from 'src/common/types/user.type';
import { config } from 'dotenv';
import { UserAppService } from 'src/modules/users/client/user.client.service';
import { JwtService } from '@nestjs/jwt';

config();
@Injectable()
export class AuthAppService {
  constructor(
    @InjectRepository(OtpEntity)
    private readonly Otp_Repository: Repository<OtpEntity>,
    private readonly UserService: UserAppService,
    private readonly JwtService: JwtService,
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

  private async generateUniqueInviteLink(mobile: string) {
    const cleanMobile = mobile.replace(/\D/g, '');
    const prime1 = 73856093;
    const prime2 = 19349663;

    let hash = 0;
    for (let i = 0; i < cleanMobile.length; i++) {
      hash = (hash * prime1) ^ (cleanMobile.charCodeAt(i) * prime2);
    }

    return `${process.env.APP_URL}/register?ref=${Math.abs(hash % 1000000)}-${Date.now()}`;
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

  public async verifyOtp(data: SignInDto) {
    const otp = await this.ValidateOtp(data.mobile, data.otpCode);

    const exprireResult = await this.CheckExpire(otp);

    if (exprireResult) {
      throw new BadRequestException('Otp has expired');
    }

    await this.DeleteOtp(otp);
  }

  public async getUser(data: SignInDto) {
    const user = await this.UserService.findUserByMobile(data.mobile);

    if (user) {
      return this.JwtService.sign(
        {
          user_id: user.id,
        },
        { secret: process.env.JWT_SECRET, expiresIn: process.env.JWT_EXPIRE },
      );
    } else {
      const uniqueInviteCode = await this.generateUniqueInviteLink(data.mobile);

      const newUser = await this.UserService.CreateUser(
        data.mobile,
        uniqueInviteCode,
      );

      return this.JwtService.sign(
        { user_id: newUser.id },
        { secret: process.env.JWT_SECRET, expiresIn: process.env.JWT_EXPIRE },
      );
    }
  }

  //exports
}
