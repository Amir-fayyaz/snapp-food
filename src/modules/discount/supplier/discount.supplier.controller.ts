import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { DiscountSupplierService } from './discount.supplier.service';
import { SupplierAuth } from 'src/common/decorators/auth.decorator';
import { Role } from 'src/common/decorators/role.decorator';
import { getUser } from 'src/common/decorators/getusers.decorator';
import { ISupplier } from 'src/common/types/request-user.types';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { CreateDiscountDto } from './dto/create-discount.dto';

@Controller('api/v1/supplier/discount')
@SupplierAuth()
@ApiTags('supplier-discount')
export class DiscountSupplierController {
  constructor(private readonly discountService: DiscountSupplierService) {}

  //GET
  @Get()
  @ApiOperation({ summary: 'For get discounts of special discount' })
  @Role(['supplier'])
  async getSupplierDiscounts(@getUser() supplier: ISupplier) {
    return await this.discountService.getDiscountsForSupplier(
      supplier.supplier_id,
    );
  }

  //POST
  @Post()
  @ApiOperation({ summary: 'For create discount by supplier' })
  @ApiBody({ type: CreateDiscountDto })
  async createDiscount(
    @Body() data: CreateDiscountDto,
    @getUser() supplier: ISupplier,
  ) {
    return await this.discountService.createDiscount(
      data,
      supplier.supplier_id,
    );
  }

  //DELETE
  @Delete(':code')
  @ApiOperation({ summary: 'For delete discount-coupon by code' })
  @ApiParam({
    name: 'code',
    type: String,
    description: 'code of discount-coupon',
  })
  async deleteDiscount(
    @Param('code') code: string,
    @getUser() supplier: ISupplier,
  ) {
    return await this.discountService.deleteDiscount(
      code,
      supplier.supplier_id,
    );
  }
}
