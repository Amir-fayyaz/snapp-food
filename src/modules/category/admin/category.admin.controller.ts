import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiHeader,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CategoryAdminService } from './category.admin.service';
import { CreateCategoryDto } from './dto/create-category.dto';

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
  @ApiBody({ type: CreateCategoryDto })
  @ApiHeader({
    name: 'authorization',
  })
  async createCategory(@Body() data: CreateCategoryDto) {
    return await this.CategoryService.createCategory(data);
  }
}
