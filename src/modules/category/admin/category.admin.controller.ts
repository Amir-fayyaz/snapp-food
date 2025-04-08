import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiHeader,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CategoryAdminService } from './category.admin.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('api/v1/admin/category')
@ApiTags('admin-category')
@ApiBearerAuth()
@UseGuards()
export class CategoryAdminController {
  constructor(private readonly CategoryService: CategoryAdminService) {}

  @Post()
  @ApiOperation({
    summary: 'For create new category',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'داده‌های محصول و تصویر',
    type: 'multipart/form-data',
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        slug: { type: 'string' },
        show: { type: 'boolean' },
        parent_id: { type: 'number', example: 2 },
        image: {
          type: 'string',
          format: 'binary',
        },
      },
      required: ['title', 'slug', 'image', 'show'],
    },
  })
  @ApiHeader({
    name: 'authorization',
  })
  @UseInterceptors(FileInterceptor('image'))
  async createCategory(
    @Body() data: CreateCategoryDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    console.log(data, image.originalname);
    return await this.CategoryService.createCategory(data, image);
  }
}
