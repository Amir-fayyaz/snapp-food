import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DiscountEntity } from '../entites/discount.entity';
import { Repository } from 'typeorm';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { SupplierService } from 'src/modules/supplier/supplier.service';

@Injectable()
export class DiscountSupplierService {
  constructor(
    @InjectRepository(DiscountEntity)
    private readonly discount_Repository: Repository<DiscountEntity>,
    private readonly SupplierService: SupplierService,
  ) {}

  //private methods
  private generateCode(
    randomLength: number = 10,
    separator: string = '-',
  ): string {
    const today = new Date();
    const datePart = [
      today.getFullYear(),
      String(today.getMonth() + 1).padStart(2, '0'),
      String(today.getDate()).padStart(2, '0'),
    ].join('');

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let randomPart = '';
    for (let i = 0; i < randomLength; i++) {
      randomPart += chars[Math.floor(Math.random() * chars.length)];
    }

    // Combine date and random part
    return `${datePart}${separator}${randomPart}`;
  }

  private changeDayToDate(day: number): number {
    const expiresAt = new Date();
    return expiresAt.setDate(expiresAt.getDate() + day);
  }

  //public methods
  public async getDiscountsForSupplier(supplier_id: number) {
    return await this.discount_Repository.find({
      where: { supplier: { id: supplier_id } },
    });
  }

  public async createDiscount(data: CreateDiscountDto, supplierId: number) {
    const { amount, expireIn, food_range, limit, percent } = data;

    if (!amount && !percent)
      throw new BadRequestException(
        'Amount or percent must be have an value !',
      );

    if (amount) {
      if (food_range - amount < 0)
        throw new BadRequestException('Food range must be bigger than amount');
    }

    const supplier = await this.SupplierService.findSupplierById(supplierId);
    const code = this.generateCode();

    if (amount) {
      if (limit) {
        const newDiscount = this.discount_Repository.create({
          code,
          amount,
          expireIn: new Date(this.changeDayToDate(expireIn)),
          food_range,
          limit,
          supplier,
        });

        return await this.discount_Repository.save(newDiscount);
      } else {
        const newDiscount = this.discount_Repository.create({
          code,
          amount,
          expireIn: new Date(this.changeDayToDate(expireIn)),
          food_range,
          supplier,
        });

        return await this.discount_Repository.save(newDiscount);
      }
    } else {
      if (limit) {
        const newDiscount = this.discount_Repository.create({
          code,
          percent,
          expireIn: new Date(this.changeDayToDate(expireIn)),
          food_range,
          limit,
          supplier,
        });

        return await this.discount_Repository.save(newDiscount);
      } else {
        const newDiscount = this.discount_Repository.create({
          code,
          amount,
          expireIn: new Date(this.changeDayToDate(expireIn)),
          food_range,
          supplier,
        });

        return await this.discount_Repository.save(newDiscount);
      }
    }
  }

  public async deleteDiscount(code: string, supplierId: number) {
    const deleteResult = await this.discount_Repository.delete({
      code,
      supplier: { id: supplierId },
    });

    if (deleteResult.affected === 0)
      throw new NotFoundException(
        'no discount-coupon with this code for you !',
      );

    return { success: true };
  }

  // for exports
}
