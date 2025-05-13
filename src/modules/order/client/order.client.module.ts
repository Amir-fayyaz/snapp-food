import { Module } from '@nestjs/common';
import { OrderAppController } from './order.client.controller';
import { OrderAppService } from './order.client.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from '../entities/order.entitiy';
import { AuthAppModule } from 'src/modules/auth/client/auth.client.module';
import { UserAppService } from 'src/modules/users/client/user.client.service';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity, UserEntity]), AuthAppModule],
  controllers: [OrderAppController],
  providers: [OrderAppService, UserAppService, JwtService],
})
export class OrderAppModule {}
