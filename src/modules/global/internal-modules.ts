import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '../auth/auth.module';
import { CategoryModule } from '../category/category.module';
import { S3Module } from '../s3/s3.module';
import { SupplierModule } from '../supplier/supplier.module';
import { MenuModule } from '../menu/menu.module';

export const InternalModules = [
  CategoryModule,
  S3Module,
  AuthModule,
  ConfigModule.forRoot({
    cache: true,
    isGlobal: true,
  }),
  SupplierModule,
  MenuModule,
];
