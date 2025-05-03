import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DiscountEntity } from '../entites/discount.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DiscountSupplierService {
  constructor(
    @InjectRepository(DiscountEntity)
    private readonly discount_Repository: Repository<DiscountEntity>,
  ) {}

  //private methods

  //public methods
  public async getDiscountsForSupplier(supplier_id: number) {
    return await this.discount_Repository.find({
      where: { supplier: { id: supplier_id } },
    });
  }

  // for exports
}
