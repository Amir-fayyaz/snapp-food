import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { MenuTypeSupplierService } from '../services/menu-type.supplier.service';
import { CreateMenuTypeDto } from '../dto/menu-type/create-menuType.dto';
import { SupplierAuth } from 'src/common/decorators/auth.decorator';
import { getUser } from 'src/common/decorators/getusers.decorator';
import { SupplierEntity } from 'src/modules/supplier/entities/supplier.entity';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Role } from 'src/common/decorators/role.decorator';
import { UpdateMenuTypeDto } from '../dto/menu-type/update-menuType.dto';
import { ISupplier } from 'src/common/types/request-user.types';
import { Pagination } from 'src/common/decorators/pagination.decorator';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('api/v1/supplier/menu-type')
@ApiTags('supplier menu-type')
@SupplierAuth()
export class MenuTypeSupplierController {
  constructor(private readonly MenuTypeService: MenuTypeSupplierService) {}

  @Post()
  @ApiOperation({ summary: 'For create new Menu-type' })
  @ApiBody({ type: CreateMenuTypeDto })
  @Role(['supplier'])
  async createMenuType(
    @Body() data: CreateMenuTypeDto,
    @getUser('supplier') supplier: ISupplier,
  ) {
    console.log(supplier);
    return await this.MenuTypeService.createMenuType(
      data,
      supplier.supplier_id,
    );
  }

  @Put(':id')
  @ApiOperation({ summary: 'For update menu-type by id' })
  @ApiBody({ type: UpdateMenuTypeDto })
  @Role(['supplier'])
  async updateMenuType(
    @Body() data: UpdateMenuTypeDto,
    @Param('id', ParseIntPipe) id: number,
    @getUser() supplier: ISupplier,
  ) {
    return await this.MenuTypeService.updateMenuType(
      data,
      id,
      supplier.supplier_id,
    );
  }

  @Pagination()
  @Role(['supplier'])
  @Get()
  async getMenuTypes(
    @Query() PaginationDto: PaginationDto,
    @getUser() supplier: ISupplier,
  ) {
    return await this.MenuTypeService.getMenuTypes(
      PaginationDto,
      supplier.supplier_id,
    );
  }
}
