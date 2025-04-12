import { Module } from '@nestjs/common';
import { AuthAppController } from './auth.client.controller';
import { AuthAppService } from './auth.client.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OtpEntity } from '../entities/otp.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OtpEntity])],
  controllers: [AuthAppController],
  providers: [AuthAppService],
})
export class AuthAppModule {}
