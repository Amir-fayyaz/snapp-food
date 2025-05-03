import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiscountEntity } from '../entites/discount.entity';
import { DiscountSupplierController } from './discount.supplier.controller';
import { DiscountSupplierService } from './discount.supplier.service';
import { SupplierService } from 'src/modules/supplier/supplier.service';
import { SupplierEntity } from 'src/modules/supplier/entities/supplier.entity';
import { CategoryAppService } from 'src/modules/category/client/category.client.service';
import { CategoryEntity } from 'src/modules/category/entities/category.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([DiscountEntity, SupplierEntity, CategoryEntity]),
  ],
  controllers: [DiscountSupplierController],
  providers: [
    DiscountSupplierService,
    SupplierService,
    CategoryAppService,
    JwtService,
  ],
})
export class DiscountSupplierModule {}
