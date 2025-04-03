import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from 'dotenv';

config();

const { DB_PORT, DB_NAME, DB_PASSWORD, DB_USERNAME, DB_HOST } = process.env;
export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: DB_HOST,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
  entities: [],
  port: Number(DB_PORT),
  synchronize: true,
};
