import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BasketEntity } from '../entities/basket.entity';
import { Repository } from 'typeorm';
import { MenuAppService } from 'src/modules/menu/client/services/menu.client.service';
import { AddToBasketDto } from './dto/addToBasket.dto';
import { UserAppService } from 'src/modules/users/client/user.client.service';

@Injectable()
export class BasketAppService {
  constructor(
    @InjectRepository(BasketEntity)
    private readonly Basket_Repository: Repository<BasketEntity>,
    private readonly MenuService: MenuAppService,
    private readonly UserService: UserAppService,
  ) {}

  //public methods
  public async addToBasket(data: AddToBasketDto, userId: number) {
    const food = await this.MenuService.getFoodById(data.foodId);

    let BasketItem = await this.Basket_Repository.findOne({
      where: { food: { id: data.foodId }, user: { id: userId } },
    });

    if (BasketItem) {
      BasketItem.count += 1;
    } else {
      const user = await this.UserService.getUserById(userId);
      BasketItem = this.Basket_Repository.create({ food, user, count: 1 });
    }

    return await this.Basket_Repository.save(BasketItem);
  }
}
