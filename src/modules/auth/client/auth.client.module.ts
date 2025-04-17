import { Module } from '@nestjs/common';
import { AuthAppController } from './auth.client.controller';
import { AuthAppService } from './auth.client.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OtpEntity } from '../entities/user-otp.entity';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { UserAppService } from 'src/modules/users/client/user.client.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { Jwtconfig } from 'src/common/configs/jwt.config';

@Module({
  imports: [
    TypeOrmModule.forFeature([OtpEntity, UserEntity]),
    JwtModule.register(Jwtconfig),
  ],
  controllers: [AuthAppController],
  providers: [AuthAppService, UserAppService, JwtService],
})
export class AuthAppModule {}
