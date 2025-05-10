import { Body, Controller, Delete, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BasketAppService } from './basket.client.service';
import { UserAuth } from 'src/common/decorators/auth.decorator';
import { AddToBasketDto } from './dto/addToBasket.dto';
import { getUser } from 'src/common/decorators/getusers.decorator';
import { IUser } from 'src/common/types/request-user.types';
import { Role } from 'src/common/decorators/role.decorator';
import { DeleteFromBasketDto } from './dto/deleteFromBasket.dto';
import { DiscountBasketDto } from './dto/discount.dto';

@Controller('api/v1/client/basket')
@ApiTags('client-basket')
@UserAuth()
export class BasketAppController {
  constructor(private readonly BasketService: BasketAppService) {}

  //POST
  @Post()
  @Role(['user'])
  @ApiOperation({ summary: 'For add or increase a food to basket' })
  @ApiBody({ type: AddToBasketDto })
  async addToBasket(@Body() data: AddToBasketDto, @getUser() user: IUser) {
    return await this.BasketService.addToBasket(data, user.user_id);
  }

  //DELETE
  @Delete()
  @Role(['user'])
  @ApiOperation({ summary: 'Delete or decrease a food from basket' })
  @ApiBody({ type: DeleteFromBasketDto })
  async deleteFromBasket(
    @Body() data: DeleteFromBasketDto,
    @getUser() user: IUser,
  ) {
    return await this.BasketService.removeFromBasket(data, user.user_id);
  }

  //POST
  @Post('discount')
  @Role(['user'])
  @ApiOperation({ summary: 'For add discount-coupon to basket' })
  @ApiBody({ type: DiscountBasketDto })
  async addDiscountToBasket(
    @Body() data: DiscountBasketDto,
    @getUser() user: IUser,
  ) {
    return await this.BasketService.addDiscountToBasket(data, user.user_id);
  }
}
