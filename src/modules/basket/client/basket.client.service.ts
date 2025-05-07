import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BasketEntity } from '../entities/basket.entity';
import { Repository } from 'typeorm';
import { MenuAppService } from 'src/modules/menu/client/services/menu.client.service';
import { AddToBasketDto } from './dto/addToBasket.dto';
import { UserAppService } from 'src/modules/users/client/user.client.service';
import { DeleteFromBasketDto } from './dto/deleteFromBasket.dto';
import { DiscountAppService } from 'src/modules/discount/client/discount.client.service';

@Injectable()
export class BasketAppService {
  constructor(
    @InjectRepository(BasketEntity)
    private readonly Basket_Repository: Repository<BasketEntity>,
    private readonly MenuService: MenuAppService,
    private readonly UserService: UserAppService,
    private readonly DiscountService: DiscountAppService,
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

  public async removeFromBasket(data: DeleteFromBasketDto, userId: number) {
    const BasketItem = await this.Basket_Repository.findOne({
      where: { food: { id: data.foodId }, user: { id: userId } },
    });

    if (BasketItem && BasketItem.count === 1) {
      await this.Basket_Repository.delete({
        food: { id: data.foodId },
        user: { id: userId },
      });

      return { message: 'food reomved from basket !' };
    } else if (BasketItem && BasketItem.count > 1) {
      BasketItem.count -= 1;

      await this.Basket_Repository.save(BasketItem);

      return { success: true };
    }
    throw new NotFoundException();
  }

  public async addDiscountCoupon(code: string, userId: number) {
    const discountCoupon = await this.DiscountService.findDiscountByCode(code);

    const basket = await this.Basket_Repository.find({
      where: { user: { id: userId } },
    });

    basket.forEach((basket) => {
      if (basket.discount)
        throw new BadRequestException('Discount added to basket before !');
    });

    basket[basket.length - 1].discount = discountCoupon;

    await this.Basket_Repository.save(basket);

    return {
      copoun: discountCoupon,
    };
  }
}
