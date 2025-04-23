import { Module } from '@nestjs/common';
import { MenuAppModule } from './client/menu.client.module';
import { MenuAdminModule } from './admin/menu.admin.module';
import { MenuSupplierModule } from './supplier/menu.supplier.module';

@Module({
  imports: [MenuAppModule, MenuAdminModule, MenuSupplierModule],
  controllers: [],
  providers: [],
})
export class MenuModule {}
