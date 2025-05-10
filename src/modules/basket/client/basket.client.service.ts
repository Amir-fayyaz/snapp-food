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
import { DiscountBasketDto } from './dto/discount.dto';

@Injectable()
export class BasketAppService {
  constructor(
    @InjectRepository(BasketEntity)
    private readonly Basket_Repository: Repository<BasketEntity>,
    private readonly MenuService: MenuAppService,
    private readonly UserService: UserAppService,
    private readonly DiscountService: DiscountAppService,
    private readonly userService: UserAppService,
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

  public async getBasketForUser(userId: number) {
    const BasketItem = await this.Basket_Repository.find({
      where: { user: { id: userId } },
      relations: { discount: true, food: { supplier: true } },
    });
  }

  //Discounts
  public async addDiscountToBasket(data: DiscountBasketDto, userId: number) {
    const { code } = data;
    const discount = await this.DiscountService.findDiscountByCode(code);
    const user = await this.UserService.getUserById(userId);

    if (discount.supplier?.id) {
      const discountOfSupplier = await this.Basket_Repository.findOne({
        relations: { discount: true },
        where: { discount: { supplier: { id: discount.supplier.id } } },
      });

      if (discountOfSupplier)
        throw new BadRequestException(
          'You can not use discount-coupon again !',
        );
      const userBasket = await this.Basket_Repository.findOne({
        relations: { food: true },
        where: {
          food: {
            supplier: {
              id: discount.supplier.id,
            },
          },
        },
      });

      if (!userBasket) throw new BadRequestException('Invalid discount-code');
    }

    await this.Basket_Repository.insert({
      discount,
      user,
    });

    return {
      message: 'You used your discount-coupon successfully',
    };
  }
}
