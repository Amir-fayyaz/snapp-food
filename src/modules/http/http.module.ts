import { HttpModule, HttpService } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';
import { ZarinPalService } from './service/payment/zarinPal.service';

@Global()
@Module({
  imports: [
    HttpModule.register({
      maxRedirects: 5,
      timeout: 5000,
    }),
  ],
  providers: [ZarinPalService],
  exports: [ZarinPalService],
})
export class HttpApiModule {}
