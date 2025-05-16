import { Base } from 'src/common/abstracts/baseEntity';
import { EntityName } from 'src/common/enums/entityName.enum';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { City } from '../enums/city.enum';
import { CategoryEntity } from 'src/modules/category/entities/category.entity';
import { TypeEntity } from 'src/modules/menu/entities/type.entity';
import { MenuEntity } from 'src/modules/menu/entities/menu.entity';
import { DiscountEntity } from 'src/modules/discount/entites/discount.entity';
import { OrderItemEntity } from 'src/modules/order/entities/order-item.entity';
import { ChatEntity } from 'src/modules/chat/entities/chat.entity';

@Entity(EntityName.Supplier)
export class SupplierEntity extends Base {
  @Column({ type: 'varchar', nullable: false })
  manager_firstname: string;

  @Column({ type: 'varchar', nullable: false })
  manager_lastname: string;

  @Column({ type: 'varchar', nullable: false })
  store_name: string;

  @Column({ type: 'varchar', nullable: false })
  manager_mobile: string;

  @Column({ type: 'enum', enum: City })
  city: City;

  @Column({ type: 'varchar', nullable: false })
  invite_code: string;

  //relations

  @ManyToOne(() => CategoryEntity, (category) => category.suppliers, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'category' })
  category: CategoryEntity;

  @ManyToOne(() => SupplierEntity, (supplier) => supplier.subsets)
  @JoinColumn({ name: 'agent' })
  agent: SupplierEntity;

  @OneToMany(() => SupplierEntity, (supplier) => supplier.agent)
  subsets: SupplierEntity[];

  @OneToMany(() => TypeEntity, (type) => type.supplier)
  types: TypeEntity[];

  @OneToMany(() => MenuEntity, (menu) => menu.supplier)
  menu: MenuEntity[];

  @OneToMany(() => DiscountEntity, (discount) => discount.supplier)
  discounts: DiscountEntity[];

  @OneToMany(() => OrderItemEntity, (orderItem) => orderItem.supplier)
  orders: OrderItemEntity[];

  @OneToMany(() => ChatEntity, (chat) => chat.supplier)
  messages: ChatEntity[];
}
