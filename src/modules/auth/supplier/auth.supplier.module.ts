import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupplierEntity } from 'src/modules/supplier/entities/supplier.entity';
import { AuthSupplierController } from './auth.supplier.controller';
import { AuthSupplierService } from './auth.supplier.service';
import { SupplierService } from 'src/modules/supplier/supplier.service';
import { CategoryAppService } from 'src/modules/category/client/category.client.service';
import { CategoryEntity } from 'src/modules/category/entities/category.entity';
import { SupplierOtpEntity } from '../entities/supplier-otp.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SupplierEntity,
      CategoryEntity,
      SupplierOtpEntity,
    ]),
  ],
  controllers: [AuthSupplierController],
  providers: [AuthSupplierService, SupplierService, CategoryAppService],
})
export class AuthSupplierModule {}
