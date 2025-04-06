import { Module } from '@nestjs/common';
import { CategoryAppController } from './category.client.controller';
import { CategoryAppService } from './category.client.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from '../entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity])],
  controllers: [CategoryAppController],
  providers: [CategoryAppService],
})
export class CategoryAppModule {}
