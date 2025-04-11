import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from 'dotenv';
import { OtpEntity } from 'src/modules/auth/entities/otp.entity';
import { CategoryEntity } from 'src/modules/category/entities/category.entity';
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
  entities: [UserEntity, AddressEntity, CategoryEntity, OtpEntity],
  port: Number(DB_PORT),
  synchronize: true,
};
