import { Module } from '@nestjs/common';
import { AuthAppModule } from './client/auth.client.module';
import { AuthAdminModule } from './admin/auth.admin.module';
import { JwtModule } from '@nestjs/jwt';
import { Jwtconfig } from 'src/common/configs/jwt.config';
import { AuthSupplierModule } from './supplier/auth.supplier.module';

@Module({
  imports: [
    AuthAppModule,
    AuthAdminModule,
    JwtModule.registerAsync(Jwtconfig),
    AuthSupplierModule,
  ],
  controllers: [],
  providers: [],
})
export class AuthModule {}
