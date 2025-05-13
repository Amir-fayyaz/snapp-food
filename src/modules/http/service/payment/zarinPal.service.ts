import { HttpService } from '@nestjs/axios';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { catchError, lastValueFrom, map } from 'rxjs';
import { SendRequestDto } from '../../dto/sendRequest.dto';

@Injectable()
export class ZarinPalService {
  constructor(private readonly httpService: HttpService) {}

  //public methods
  public async sendPaymentRequest(userData: SendRequestDto) {
    const { amount, description } = userData;
    const options = {
      merchant_id: process.env.ZARINPAL_MERCHANT_ID,
      amount: amount * 10,
      description: description ?? '',
      metadata: {
        email: 'example@gmail.com',
        mobile: '',
      },
      callback_url: 'http://localhost:3000/payment/verify',
    };
    const { ZARINPAL_REQUEST_URL, ZARINPAL_GATEWAY_URL } = process.env;

    const result = await lastValueFrom(
      this.httpService
        .post(ZARINPAL_REQUEST_URL, options, {})
        .pipe(map((res) => res.data))
        .pipe(
          catchError((error) => {
            console.log(error.message);
            throw new InternalServerErrorException(error.message);
          }),
        ),
    );

    const { authority, code } = result;

    if (code === 100 && authority) {
      return {
        authority,
        code,
        gatewayUrl: `${ZARINPAL_GATEWAY_URL}/${authority}`,
      };
    }

    throw new BadRequestException('Connection faild , please try later');
  }

  public async sendVerifyRequest(data: unknown) {
    const { ZARINPAL_VERIFY_URL } = process.env;
    this.httpService.post(ZARINPAL_VERIFY_URL, data, {});
  }
}
