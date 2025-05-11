import { Base } from 'src/common/abstracts/baseEntity';
import { EntityName } from 'src/common/enums/entityName.enum';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { OrderStatus } from '../enums/order.status.enum';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { AddressEntity } from 'src/modules/users/entities/address.entity';
import { OrderItemEntity } from './order-item.entity';

@Entity(EntityName.Order)
export class OrderEntity extends Base {
  @Column({ type: 'double', nullable: false })
  paymentAmount: number;

  @Column({ type: 'double', nullable: false })
  discountAmount: number;

  @Column({ type: 'double', nullable: false })
  totalAmount: number;

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.Pending })
  status: OrderStatus;

  @Column({ type: 'text', nullable: true })
  description: string;

  @ManyToOne(() => UserEntity, (user) => user.orders, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user' })
  user: UserEntity;

  @ManyToOne(() => AddressEntity, (address) => address.orders, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'address' })
  address: AddressEntity;

  @OneToMany(() => OrderItemEntity, (orderItem) => orderItem.order)
  orderItems: OrderItemEntity[];
}
