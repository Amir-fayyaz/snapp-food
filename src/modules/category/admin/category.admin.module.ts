import { Module } from '@nestjs/common';
import { CategoryAdminController } from './category.admin.controller';
import { CategoryAdminService } from './category.admin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from '../entities/category.entity';
import { S3Service } from 'src/modules/s3/s3.service';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity])],
  controllers: [CategoryAdminController],
  providers: [CategoryAdminService, S3Service],
})
export class CategoryAdminModule {}
