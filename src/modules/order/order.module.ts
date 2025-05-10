import { Module } from '@nestjs/common';
import { OrderAppModule } from './client/order.client.module';
import { OrderSupplierModule } from './supplier/order.supplier.module';
import { OrderAdminModule } from './admin/order.admin.module';

@Module({
  imports: [OrderAppModule, OrderSupplierModule, OrderAdminModule],
  controllers: [],
  providers: [],
})
export class OrderModule {}
