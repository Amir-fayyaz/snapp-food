import { Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserAuth } from 'src/common/decorators/auth.decorator';
import { PaymentAppService } from './payment.client.service';
import { getUser } from 'src/common/decorators/getusers.decorator';
import { IUser } from 'src/common/types/request-user.types';
import { Role } from 'src/common/decorators/role.decorator';

@Controller('api/v1/client/payment')
@ApiTags('client-payment')
@UserAuth()
export class PaymentAppController {
  constructor(private readonly PaymentService: PaymentAppService) {}

  @Post()
  @Role(['user'])
  async getGatewayUrl(@getUser() user: IUser) {
    return await this.PaymentService.getGatewayUrl(user.user_id);
  }
}
