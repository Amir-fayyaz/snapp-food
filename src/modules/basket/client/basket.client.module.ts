import { Module } from '@nestjs/common';
import { BasketAppController } from './basket.client.controller';
import { BasketAppService } from './basket.client.service';
import { MenuAppService } from 'src/modules/menu/client/services/menu.client.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BasketEntity } from '../entities/basket.entity';
import { MenuEntity } from 'src/modules/menu/entities/menu.entity';
import { JwtService } from '@nestjs/jwt';
import { UserAppService } from 'src/modules/users/client/user.client.service';
import { UserEntity } from 'src/modules/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BasketEntity, MenuEntity, UserEntity])],
  controllers: [BasketAppController],
  providers: [BasketAppService, MenuAppService, JwtService, UserAppService],
})
export class BasketAppModule {}
