import { Base } from 'src/common/abstracts/baseEntity';
import { MenuEntity } from 'src/modules/menu/entities/menu.entity';
import { SupplierEntity } from 'src/modules/supplier/entities/supplier.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { OrderItemStatus } from '../enums/order.status.enum';
import { OrderEntity } from './order.entitiy';

@Entity('order-item')
export class OrderItemEntity extends Base {
  @ManyToOne(() => MenuEntity, (menu) => menu.orders, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'food' })
  food: MenuEntity;

  @ManyToOne(() => SupplierEntity, (supplier) => supplier.orders, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'supplier' })
  supplier: SupplierEntity;

  @Column({ type: 'int', nullable: false })
  count: number;

  @Column({
    type: 'enum',
    enum: OrderItemStatus,
    default: OrderItemStatus.Pending,
  })
  status: OrderItemStatus;

  @ManyToOne(() => OrderEntity, (order) => order.orderItems, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'order' })
  order: OrderEntity;
}
