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
import { MenuSupplierController } from './controllers/menu.supplier.controller';
import { MenuSupplierService } from './services/menu.supplier.service';
import { MenuEntity } from '../entities/menu.entity';
import { S3Service } from 'src/modules/s3/s3.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TypeEntity,
      SupplierEntity,
      CategoryEntity,
      MenuEntity,
    ]),
  ],
  controllers: [MenuTypeSupplierController, MenuSupplierController],
  providers: [
    MenuSupplierService,
    MenuTypeSupplierService,
    SupplierService,
    CategoryAppService,
    JwtService,
    S3Service,
  ],
})
export class MenuSupplierModule {}
