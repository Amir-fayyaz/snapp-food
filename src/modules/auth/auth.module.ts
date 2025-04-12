import { Module } from '@nestjs/common';
import { AuthAppModule } from './client/auth.client.module';
import { AuthAdminModule } from './admin/auth.admin.module';
import { JwtModule } from '@nestjs/jwt';
import { Jwtconfig } from 'src/common/configs/jwt.config';

@Module({
  imports: [AuthAppModule, AuthAdminModule, JwtModule.register(Jwtconfig)],
  controllers: [],
  providers: [],
})
export class AuthModule {}
