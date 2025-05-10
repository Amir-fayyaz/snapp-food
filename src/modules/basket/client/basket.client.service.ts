import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BasketEntity } from '../entities/basket.entity';
import { IsNull, Not, Repository } from 'typeorm';
import { MenuAppService } from 'src/modules/menu/client/services/menu.client.service';
import { AddToBasketDto } from './dto/addToBasket.dto';
import { UserAppService } from 'src/modules/users/client/user.client.service';
import { DeleteFromBasketDto } from './dto/deleteFromBasket.dto';
import { DiscountAppService } from 'src/modules/discount/client/discount.client.service';
import { DiscountBasketDto } from './dto/discount.dto';
import { DiscountEntity } from 'src/modules/discount/entites/discount.entity';

@Injectable()
export class BasketAppService {
  constructor(
    @InjectRepository(BasketEntity)
    private readonly Basket_Repository: Repository<BasketEntity>,
    private readonly MenuService: MenuAppService,
    private readonly UserService: UserAppService,
    private readonly DiscountService: DiscountAppService,
  ) {}

  //private methods
  private async CheckDiscountExpire(discount: DiscountEntity) {
    if (
      discount?.expireIn &&
      discount?.expireIn.getTime() <= new Date().getTime()
    ) {
      throw new BadRequestException('Discount coupon has expired');
    }
  }

  private async CheckDiscountLimit(discount: DiscountEntity) {
    if (discount.limit && discount.limit <= discount.usage)
      throw new BadRequestException('Capacity of this code is full');
  }

  private async ChackDiscountActive(discount: DiscountEntity) {
    if (!discount.active)
      throw new BadRequestException('discount-code is not active');
  }
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

    await this.ChackDiscountActive(discount);
    await this.CheckDiscountExpire(discount);
    await this.CheckDiscountLimit(discount);

    const userDiscountBasket = await this.Basket_Repository.findOneBy({
      discount: { id: discount.id },
      user: { id: userId },
    });

    if (userDiscountBasket) {
      throw new BadRequestException('You already used this discount-coupon');
    }
    if (discount.supplier?.id) {
      const discountOfSupplier = await this.Basket_Repository.findOne({
        relations: { discount: true },
        where: {
          discount: { supplier: { id: discount.supplier.id } },
          user: { id: userId },
        },
      });

      if (discountOfSupplier)
        throw new BadRequestException(
          'You can not use discount-coupon again !',
        );
      const userBasket = await this.Basket_Repository.findOne({
        relations: { food: true },
        where: {
          user: { id: userId },
          food: {
            supplier: {
              id: discount.supplier.id,
            },
          },
        },
      });

      if (!userBasket) throw new BadRequestException('Invalid discount-code');
    } else if (!discount.supplier?.id) {
      const generalDiscount = await this.Basket_Repository.findOne({
        relations: { discount: true },
        where: {
          user: { id: userId },
          discount: {
            id: Not(IsNull()),
            supplier: {
              id: IsNull(),
            },
          },
        },
      });

      if (generalDiscount)
        throw new BadRequestException('already used general discount !');
    }

    await this.Basket_Repository.insert({
      discount,
      user,
    });

    return {
      message: 'You used your discount-coupon successfully',
    };
  }

  public async removeDiscount(data: DiscountBasketDto, userId: number) {
    const { code } = data;
    const discount = await this.DiscountService.findDiscountByCode(code);

    const basketDiscount = await this.Basket_Repository.findOne({
      where: {
        discount: { id: discount.id },
        user: { id: userId },
      },
    });

    if (!basketDiscount) throw new BadRequestException('Invalid discount-code');

    await this.Basket_Repository.remove(basketDiscount);

    return {
      message: 'discount-coupon deleted successfully',
    };
  }

  public async getBasket(userId: number) {
    const BasketItems = await this.Basket_Repository.find({
      relations: {
        discount: true,
        food: {
          supplier: true,
        },
      },
      where: { user: { id: userId } },
    });

    const foods = BasketItems.filter((item) => item?.food?.id);
    const supplierDiscounts = BasketItems.filter(
      (item) => item?.discount?.supplier?.id,
    );
    const genealDiscount = BasketItems.find(
      (item) => item?.discount?.id && !item?.discount?.supplier?.id,
    );

    let totalAmount = 0,
      totalDiscountAmount = 0;
    let foodItems = [];

    for (const item of foods) {
      let discountAmount = 0;
      let discountCode: string = '';
      const { food, count } = item;
      const supplierId = food.supplier?.id;
      let foodPrice = food.price;

      if (food.discount > 0 && food.is_active) {
        discountAmount += foodPrice * (food.discount / 100);
        foodPrice = foodPrice - foodPrice * (food.discount / 100);
      }

      const discountItems = supplierDiscounts.find(
        ({ discount }) => discount.supplier.id === supplierId,
      );

      if (discountItems) {
        const {
          discount: { active, limit, usage, amount, percent, code },
        } = discountItems;

        if (active) {
          if (!limit || (limit && limit > usage)) {
            discountCode = code;

            if (percent && percent > 0) {
              discountAmount += foodPrice * (percent / 100);
              foodPrice = foodPrice - foodPrice * (food.discount / 100);
            } else if (amount && amount > 0) {
              discountAmount += amount;
              foodPrice = amount > foodPrice ? 0 : foodPrice - amount;
            }
          }
        }
      }

      totalAmount += foodPrice * count;
      totalDiscountAmount += discountAmount;
      foodItems.push({
        name: food.name,
        description: food.description,
        count,
        image: food.image,
        price: food.price,
        total_amount: food.price * count,
        discountAmount,
        paymentAmount: food.price * count - discountAmount,
        discountCode,
        supplierName: food?.supplier?.store_name,
        supplierId,
      });
    }

    let genealDetailDicount = {};
    if (genealDiscount?.discount?.active) {
      const { discount } = genealDiscount;

      if (discount?.limit && discount.limit > discount.usage) {
        let discountAmount = 0;

        if (discount?.percent > 0) {
          discountAmount = totalAmount * (discountAmount / 100);
        } else if (discount?.amount) {
          discountAmount = discount.amount;
        }

        totalAmount =
          discountAmount > totalAmount ? 0 : totalAmount - discountAmount;
        totalDiscountAmount += discountAmount;

        genealDetailDicount = {
          code: discount.code,
          percent: discount.percent,
          amount: discount.amount,
          discountAmount,
        };
      }
    }
    return {
      totalAmount,
      totalDiscountAmount,
      foodItems,
      genealDetailDicount,
    };
  }
}
