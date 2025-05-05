import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BasketAppService } from './basket.client.service';
import { UserAuth } from 'src/common/decorators/auth.decorator';
import { AddToBasketDto } from './dto/addToBasket.dto';
import { getUser } from 'src/common/decorators/getusers.decorator';
import { IUser } from 'src/common/types/request-user.types';
import { Role } from 'src/common/decorators/role.decorator';

@Controller('api/v1/client/basket')
@ApiTags('client-basket')
@UserAuth()
export class BasketAppController {
  constructor(private readonly BasketService: BasketAppService) {}

  @Post()
  @Role(['user'])
  @ApiOperation({ summary: 'For add or increase a food to basket' })
  @ApiBody({ type: AddToBasketDto })
  async addToBasket(@Body() data: AddToBasketDto, @getUser() user: IUser) {
    return await this.BasketService.addToBasket(data, user.user_id);
  }
}
