import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { CategoryAppService } from './category.client.service';
import { PaginationType } from 'src/common/types/pagination.type';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

@Controller('api/v1/client/category')
@ApiTags('client-category')
@ApiBearerAuth()
export class CategoryAppController {
  constructor(private readonly CategoryService: CategoryAppService) {}

  @Get(':id')
  @ApiHeader({ name: 'authorization' })
  @ApiOperation({ summary: 'For get all categories with pagination' })
  @ApiParam({ name: 'id', description: 'category-id' })
  async getCategoryById(@Param('id', ParseIntPipe) category_id: number) {
    return await this.CategoryService.getCategoryById(category_id);
  }

  @Get()
  @ApiHeader({ name: 'authorization' })
  @ApiOperation({ summary: 'For get all categories' })
  @ApiQuery({
    name: 'page',
    type: Number,
  })
  @ApiQuery({
    name: 'take',
    type: Number,
  })
  async getSubCategories(@Query() Queries: PaginationType) {
    return await this.CategoryService.getCategories(Queries);
  }
}
