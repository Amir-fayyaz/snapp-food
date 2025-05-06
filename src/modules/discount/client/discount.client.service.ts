import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DiscountEntity } from '../entites/discount.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DiscountAppService {
  constructor(
    @InjectRepository(DiscountEntity)
    private readonly Discount_Repository: Repository<DiscountEntity>,
  ) {}

  //For exports
  async findDiscountByCode(code: string) {
    const coupon = await this.Discount_Repository.findOneBy({ code });

    if (!coupon)
      throw new NotFoundException('No discount-coupon with this code');

    return coupon;
  }

  async deleteDiscountByCode(code: string) {
    const deleteResult = await this.Discount_Repository.delete({ code });

    if (deleteResult.affected === 0)
      throw new NotFoundException('No discount-coupon with this code');

    return { success: true };
  }
}
