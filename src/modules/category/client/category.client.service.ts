import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from '../entities/category.entity';
import { Repository } from 'typeorm';

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
  //For exports
}
