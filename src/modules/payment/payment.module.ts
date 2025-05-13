import { Module } from '@nestjs/common';
import { PaymentAppModule } from './client/payment.client.module';

@Module({
  imports: [PaymentAppModule],
  controllers: [],
  providers: [],
})
export class PaymentModule {}
