import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { CategoryAppService } from './category.client.service';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Pagination } from 'src/common/decorators/pagination.decorator';
import { PaginationDto } from 'src/common/dto/pagination.dto';

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
  @Pagination()
  @ApiOperation({ summary: 'For get all categories' })
  async getSubCategories(@Query() Queries: PaginationDto) {
    return await this.CategoryService.getCategories(Queries);
  }
}
