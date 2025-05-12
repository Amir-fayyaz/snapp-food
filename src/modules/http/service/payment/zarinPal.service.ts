import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ZarinPalSercice {
  constructor(private readonly httpService: HttpService) {}

  //public methods
  public async sendPaymentRequest(data: unknown) {
    const { ZARINPAL_REQUEST_URL } = process.env;
    this.httpService.post(ZARINPAL_REQUEST_URL, data, {});
  }

  public async sendVerifyRequest(data: unknown) {
    const { ZARINPAL_VERIFY_URL } = process.env;
    this.httpService.post(ZARINPAL_VERIFY_URL, data, {});
  }
}
