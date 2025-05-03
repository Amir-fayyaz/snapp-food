import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DiscountEntity } from '../entites/discount.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DiscountAdminService {
  constructor(
    @InjectRepository(DiscountEntity)
    private readonly discount_Repository: Repository<DiscountEntity>,
  ) {}
}
