import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiscountEntity } from '../entites/discount.entity';
import { DiscountAdminController } from './discount.admin.controller';
import { DiscountAdminService } from './discount.admin.service';

@Module({
  imports: [TypeOrmModule.forFeature([DiscountEntity])],
  controllers: [DiscountAdminController],
  providers: [DiscountAdminService],
})
export class DiscountAdminModule {}
