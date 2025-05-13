import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { OrderEntity } from '../entities/order.entitiy';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class OrderAppService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly Order_Repository: Repository<OrderEntity>,
  ) {}
}
