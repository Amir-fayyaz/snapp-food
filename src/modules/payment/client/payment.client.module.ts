import { Module } from '@nestjs/common';
import { PaymentAppController } from './payment.client.controller';
import { PaymentAppService } from './payment.client.service';
import { AuthAppModule } from 'src/modules/auth/client/auth.client.module';
import { UserAppService } from 'src/modules/users/client/user.client.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { BasketAppService } from 'src/modules/basket/client/basket.client.service';
import { BasketEntity } from 'src/modules/basket/entities/basket.entity';
import { MenuEntity } from 'src/modules/menu/entities/menu.entity';
import { MenuAppService } from 'src/modules/menu/client/services/menu.client.service';
import { DiscountEntity } from 'src/modules/discount/entites/discount.entity';
import { DiscountAppService } from 'src/modules/discount/client/discount.client.service';
import { ZarinPalService } from 'src/modules/http/service/payment/zarinPal.service';
import { HttpService } from '@nestjs/axios';
import { HttpApiModule } from 'src/modules/http/http.module';

@Module({
  imports: [
    AuthAppModule,
    TypeOrmModule.forFeature([
      UserEntity,
      BasketEntity,
      MenuEntity,
      DiscountEntity,
      HttpApiModule,
    ]),
  ],
  controllers: [PaymentAppController],
  providers: [
    PaymentAppService,
    UserAppService,
    JwtService,
    BasketAppService,
    MenuAppService,
    DiscountAppService,
  ],
})
export class PaymentAppModule {}
