import { Module } from '@nestjs/common';
import { BasketAppModule } from './client/basket.client.module';

@Module({
  imports: [BasketAppModule],
  controllers: [],
  providers: [],
})
export class BasketModule {}
