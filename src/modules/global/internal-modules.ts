import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '../auth/auth.module';
import { CategoryModule } from '../category/category.module';
import { S3Module } from '../s3/s3.module';
import { SupplierModule } from '../supplier/supplier.module';
import { MenuModule } from '../menu/menu.module';
import { DiscountModule } from '../discount/discount.module';
import { BasketModule } from '../basket/basket.module';
import { OrderModule } from '../order/order.module';
import { PaymentModule } from '../payment/payment.module';
import { HttpApiModule } from '../http/http.module';
import { WebSocketModule } from '../chat/socket.module';

export const InternalModules = [
  CategoryModule,
  S3Module,
  AuthModule,
  ConfigModule.forRoot({
    cache: true,
    isGlobal: true,
  }),
  SupplierModule,
  MenuModule,
  DiscountModule,
  BasketModule,
  OrderModule,
  PaymentModule,
  HttpApiModule,
  WebSocketModule,
];
