import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from 'dotenv';
import { SupplierOtpEntity } from 'src/modules/auth/entities/supplier-otp.entity';
import { OtpEntity } from 'src/modules/auth/entities/user-otp.entity';
import { BasketEntity } from 'src/modules/basket/entities/basket.entity';
import { CategoryEntity } from 'src/modules/category/entities/category.entity';
import { ChatEntity } from 'src/modules/chat/entities/chat.entity';
import { DiscountEntity } from 'src/modules/discount/entites/discount.entity';
import { CommentEntity } from 'src/modules/menu/entities/comment.entity';
import { MenuEntity } from 'src/modules/menu/entities/menu.entity';
import { TypeEntity } from 'src/modules/menu/entities/type.entity';
import { OrderItemEntity } from 'src/modules/order/entities/order-item.entity';
import { OrderEntity } from 'src/modules/order/entities/order.entitiy';
import { PaymentEntity } from 'src/modules/payment/entities/payment.entity';
import { SupplierEntity } from 'src/modules/supplier/entities/supplier.entity';
import { AddressEntity } from 'src/modules/users/entities/address.entity';
import { UserEntity } from 'src/modules/users/entities/user.entity';

config();

const { DB_PORT, DB_NAME, DB_PASSWORD, DB_USERNAME, DB_HOST } = process.env;
export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: DB_HOST,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
  entities: [
    UserEntity,
    AddressEntity,
    CategoryEntity,
    OtpEntity,
    SupplierEntity,
    SupplierOtpEntity,
    TypeEntity,
    MenuEntity,
    CommentEntity,
    DiscountEntity,
    BasketEntity,
    OrderEntity,
    OrderItemEntity,
    PaymentEntity,
    ChatEntity,
  ],
  port: Number(DB_PORT),
  synchronize: true,
};
