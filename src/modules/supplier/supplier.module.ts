import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupplierEntity } from './entities/supplier.entity';
import { SupplierController } from './supplier.controller';
import { SupplierService } from './supplier.service';
import { CategoryAppService } from '../category/client/category.client.service';
import { CategoryEntity } from '../category/entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SupplierEntity, CategoryEntity])],
  controllers: [SupplierController],
  providers: [SupplierService, CategoryAppService],
})
export class SupplierModule {}
