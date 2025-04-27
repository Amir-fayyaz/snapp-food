import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { MenuSupplierService } from '../services/menu.supplier.service';
import { CreateMenuDto } from '../dto/menu/create-menu.dto';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { getUser } from 'src/common/decorators/getusers.decorator';
import { ISupplier } from 'src/common/types/request-user.types';
import { SupplierAuth } from 'src/common/decorators/auth.decorator';

@Controller('api/v1/supplier/menu')
@SupplierAuth()
export class MenuSupplierController {
  constructor(private readonly MenuService: MenuSupplierService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'menu & image data',
    type: 'multipart/form-data',
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        price: { type: 'number' },
        discount: { type: 'number', default: 0 },
        description: { type: 'string' },
        score: { type: 'number', maximum: 5, minimum: 0, default: 0 },
        type_id: { type: 'number', example: 2 },
        image: {
          type: 'string',
          format: 'binary',
        },
      },
      required: ['name', 'price', 'image', 'description', 'type_id'],
    },
  })
  @UseInterceptors(FileInterceptor('image'))
  async createMenu(
    @Body() data: CreateMenuDto,
    @UploadedFile() image: Express.Multer.File,
    @getUser() supplier: ISupplier,
  ) {
    return await this.MenuService.createFood(data, supplier.supplier_id, image);
  }
}
