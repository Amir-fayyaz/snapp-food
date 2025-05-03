import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DiscountAdminService } from './discount.admin.service';

@Controller('api/v1/admin/discount')
@ApiTags('admin-discount')
export class DiscountAdminController {
  constructor(private readonly DiscountService: DiscountAdminService) {}
}
