import { Module } from '@nestjs/common';
import { AuthAppModule } from './client/auth.client.module';
import { AuthAdminModule } from './admin/auth.admin.module';

@Module({
  imports: [AuthAppModule, AuthAdminModule],
  controllers: [],
  providers: [],
})
export class AuthModule {}
