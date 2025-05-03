import { Base } from 'src/common/abstracts/baseEntity';
import { EntityName } from 'src/common/enums/entityName.enum';
import { SupplierEntity } from 'src/modules/supplier/entities/supplier.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BasketEntity } from './basket.entity';

@Entity(EntityName.Discount)
export class DiscountEntity extends Base {
  @Column({ type: 'varchar' })
  code: string;

  @Column({ type: 'double', nullable: true })
  amount: number;

  @Column({ type: 'double', nullable: true })
  percent: number;

  @Column({ type: 'timestamp', nullable: true })
  expireIn: Date;

  @Column({ type: 'int', nullable: true })
  limit: number;

  @Column({ type: 'int', default: 0 })
  usage: number;

  @Column({ default: true, type: 'boolean' })
  active: Boolean;

  //relations

  @ManyToOne(() => SupplierEntity, (supplier) => supplier.discounts)
  @JoinColumn({ name: 'supplier' })
  supplier: SupplierEntity;

  @OneToMany(() => BasketEntity, (basket) => basket.discount)
  baskets: BasketEntity[];
}
