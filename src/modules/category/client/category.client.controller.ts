import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { CategoryAppService } from './category.client.service';

@Controller('api/v1/client/category')
export class CategoryAppController {
  constructor(private readonly CategoryService: CategoryAppService) {}

  @Get(':id')
  async getCategoryById(@Param('id', ParseIntPipe) category_id: number) {
    return await this.CategoryService.getCategoryById(category_id);
  }
}
