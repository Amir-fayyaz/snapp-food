import { Base } from 'src/common/abstracts/baseEntity';
import { EntityName } from 'src/common/enums/entityName.enum';
import { Column, Entity, OneToMany } from 'typeorm';
import { AddressEntity } from './address.entity';
import { CommentEntity } from 'src/modules/menu/entities/comment.entity';
import { BasketEntity } from 'src/modules/basket/entities/basket.entity';
import { OrderEntity } from 'src/modules/order/entities/order.entitiy';

@Entity(EntityName.User)
export class UserEntity extends Base {
  @Column({ type: 'varchar', nullable: true })
  first_name: string;

  @Column({ type: 'varchar', nullable: true })
  last_name: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  mobile: string;

  @Column({ type: 'varchar', nullable: true, unique: true })
  email: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  invite_code: string;

  @Column({ type: 'int', default: 0 })
  score: number;

  @Column({ type: 'int', nullable: true })
  agent_id: number;

  //relations
  @OneToMany(() => AddressEntity, (address) => address.user)
  addressList: AddressEntity[];

  @OneToMany(() => CommentEntity, (comment) => comment.user)
  comments: CommentEntity[];

  @OneToMany(() => BasketEntity, (basket) => basket.user)
  baskets: BasketEntity[];

  @OneToMany(() => OrderEntity, (order) => order.user)
  orders: OrderEntity[];
}
