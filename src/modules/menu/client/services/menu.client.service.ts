import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { MenuEntity } from '../../entities/menu.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MenuAppService {
  constructor(
    @InjectRepository(MenuEntity)
    private readonly Menu_Repository: Repository<MenuEntity>,
  ) {}

  //For exports
  public async getFoodById(id: number) {
    const food = await this.Menu_Repository.findOneBy({ id });
    if (!food) throw new NotFoundException();

    return food;
  }
}
