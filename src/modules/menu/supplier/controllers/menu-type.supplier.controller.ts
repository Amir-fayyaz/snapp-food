import { Body, Controller, Post } from '@nestjs/common';
import { MenuTypeSupplierService } from '../services/menu-type.supplier.service';
import { CreateMenuTypeDto } from '../dto/menu-type/create-menuType.dto';
import { SupplierAuth } from 'src/common/decorators/auth.decorator';
import { getUser } from 'src/common/decorators/getusers.decorator';
import { SupplierEntity } from 'src/modules/supplier/entities/supplier.entity';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('api/v1/supplier/menu-type')
@ApiTags('supplier menu-type')
@SupplierAuth()
export class MenuTypeSupplierController {
  constructor(private readonly MenuTypeService: MenuTypeSupplierService) {}

  @Post()
  @ApiOperation({ summary: 'For create new Menu-type' })
  @ApiBody({ type: CreateMenuTypeDto })
  async createMenuType(
    @Body() data: CreateMenuTypeDto,
    @getUser('supplier') supplier: SupplierEntity,
  ) {
    return await this.MenuTypeService.createMenuType(data, supplier.id);
  }
}
