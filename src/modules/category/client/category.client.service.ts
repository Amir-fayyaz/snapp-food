import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from '../entities/category.entity';
import { Repository } from 'typeorm';
import { Pagination } from 'src/common/utility/pagination.utilty';
import { PaginationType } from 'src/common/types/pagination.type';

@Injectable()
export class CategoryAppService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly Category_Repository: Repository<CategoryEntity>,
  ) {}

  //public methods
  public async getCategoryById(id: number) {
    const category = await this.Category_Repository.findOne({
      where: { id },
      relations: ['parent', 'children'],
    });

    if (!category)
      throw new NotFoundException('There is no category with this id');

    return category;
  }

  public async getCategories(data: PaginationType) {
    const pagination = Pagination({ page: data.page, take: data.take });

    const categories = await this.Category_Repository.find({
      relations: ['parent'],
      take: pagination.take,
      skip: pagination.skip,
    });

    return {
      page: data.page,
      categories,
      count: categories.length,
    };
  }
  //For exports
}
