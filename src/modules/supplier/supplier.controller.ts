import { Controller, Post } from '@nestjs/common';
import { SupplierService } from './supplier.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';

@Controller('api/v1/supplier')
export class SupplierController {
  constructor(private readonly SupplierService: SupplierService) {}

  @Post()
  async createSupplier(data: CreateSupplierDto) {
    return await this.SupplierService.createSupplier(data);
  }
}
