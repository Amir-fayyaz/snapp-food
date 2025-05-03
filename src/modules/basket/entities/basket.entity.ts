import { Base } from 'src/common/abstracts/baseEntity';
import { EntityName } from 'src/common/enums/entityName.enum';
import { MenuEntity } from 'src/modules/menu/entities/menu.entity';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { DiscountEntity } from './discount.entity';
import { BasketDiscountType } from '../enums/basket-discount.type';

@Entity(EntityName.Basket)
export class BasketEntity extends Base {
  @Column({ type: 'int', nullable: false })
  count: number;

  @Column({ type: 'enum', enum: BasketDiscountType, nullable: true })
  type: BasketDiscountType;

  // relations to menu & user & discount
  @ManyToOne(() => MenuEntity, (menu) => menu.baskets, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'food' })
  food: MenuEntity;

  @ManyToOne(() => UserEntity, (user) => user.baskets, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user' })
  user: UserEntity;

  @ManyToOne(() => DiscountEntity, (discount) => discount.baskets, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'discount' })
  discount: DiscountEntity;
}
