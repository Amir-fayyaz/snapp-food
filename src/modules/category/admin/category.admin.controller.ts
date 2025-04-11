import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
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
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CategoryAdminService } from './category.admin.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('api/v1/admin/category')
@ApiTags('admin-category')
@ApiBearerAuth()
@UseGuards()
@ApiHeader({
  name: 'authorization',
})
export class CategoryAdminController {
  constructor(private readonly CategoryService: CategoryAdminService) {}

  //POST
  @Post()
  @ApiOperation({
    summary: 'For create new category',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'product & image data',
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
  @UseInterceptors(FileInterceptor('image'))
  async createCategory(
    @Body() data: CreateCategoryDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return await this.CategoryService.createCategory(data, image);
  }

  //PUT
  @Put(':id')
  @ApiOperation({ summary: 'For update category ' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  @ApiBody({
    description: 'product & image data',
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
          nullable: true,
        },
      },
      required: ['title', 'slug', 'show'],
    },
  })
  async updateCategory(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateCategoryDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return await this.CategoryService.updateCategory(id, data, image);
  }

  //GET
  @Get(':slug')
  @ApiOperation({ summary: 'For recive category with slug' })
  @ApiParam({ name: 'slug', type: String })
  async getCategoryBySlug(@Param('slug') slug: string) {
    return await this.CategoryService.getCategoryBySlug(slug);
  }

  @Delete(':slug')
  @ApiOperation({ summary: 'For delete category by slug' })
  @ApiParam({ name: 'slug', type: String })
  async deleteCategoryBySlug(@Param('slug') slug: string) {
    return await this.CategoryService.deleteCategoryBySlug(slug);
  }
}
