import { Module } from '@nestjs/common';
import { DiscountAdminModule } from './admin/discount.admin.module';
import { DiscountAppModule } from './client/discount.client.module';
import { DiscountSupplierModule } from './supplier/discount.supplier.module';

@Module({
  imports: [DiscountAdminModule, DiscountAppModule, DiscountSupplierModule],
  controllers: [],
  providers: [],
})
export class DiscountModule {}
