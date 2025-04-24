import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeEntity } from '../entities/type.entity';
import { MenuTypeSupplierController } from './controllers/menu-type.supplier.controller';
import { MenuTypeSupplierService } from './services/menu-type.supplier.service';
import { SupplierService } from 'src/modules/supplier/supplier.service';
import { SupplierEntity } from 'src/modules/supplier/entities/supplier.entity';
import { CategoryAppService } from 'src/modules/category/client/category.client.service';
import { CategoryEntity } from 'src/modules/category/entities/category.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([TypeEntity, SupplierEntity, CategoryEntity]),
  ],
  controllers: [MenuTypeSupplierController],
  providers: [
    MenuTypeSupplierService,
    SupplierService,
    CategoryAppService,
    JwtService,
  ],
})
export class MenuSupplierModule {}
