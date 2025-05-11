import { Base } from 'src/common/abstracts/baseEntity';
import { OrderEntity } from 'src/modules/order/entities/order.entitiy';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class PaymentEntity extends Base {
  @Column({ type: 'boolean', nullable: false, default: false })
  status: Boolean;

  @Column({ type: 'double', nullable: false })
  amount: number;

  @Column({ type: 'double', nullable: false })
  invioce_number: number;

  @ManyToOne(() => UserEntity, (user) => user.payments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user' })
  user: UserEntity;

  @ManyToOne(() => OrderEntity, (order) => order.payments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'order' })
  order: OrderEntity;
}
