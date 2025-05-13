import { Injectable } from '@nestjs/common';
import { BasketAppService } from 'src/modules/basket/client/basket.client.service';
import { ZarinPalService } from 'src/modules/http/service/payment/zarinPal.service';

@Injectable()
export class PaymentAppService {
  constructor(
    private readonly BasketService: BasketAppService,
    private readonly ZarinPalService: ZarinPalService,
  ) {}

  // public methods
  public async getGatewayUrl(userId: number) {
    const basket = await this.BasketService.getBasket(userId);

    return await this.ZarinPalService.sendPaymentRequest({
      amount: basket.totalAmount - basket.totalDiscountAmount,
      description: '',
    });
  }
}
