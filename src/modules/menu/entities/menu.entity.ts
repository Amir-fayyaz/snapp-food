import { Base } from 'src/common/abstracts/baseEntity';
import { EntityName } from 'src/common/enums/entityName.enum';
import { SupplierEntity } from 'src/modules/supplier/entities/supplier.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { TypeEntity } from './type.entity';
import { CommentEntity } from './comment.entity';
import { BasketEntity } from 'src/modules/basket/entities/basket.entity';

@Entity(EntityName.Menu)
export class MenuEntity extends Base {
  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar' })
  image: string;

  @Column({ type: 'boolean', default: true })
  is_active: Boolean;

  @Column({ type: 'double', nullable: false })
  price: number;

  @Column({ type: 'smallint', nullable: true })
  discount: number;

  @Column({ type: 'varchar', nullable: false })
  description: string;

  @Column({ type: 'double' })
  score: number;

  //relations
  @ManyToOne(() => SupplierEntity, (supplier) => supplier.menu, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'supplier' })
  supplier: SupplierEntity;

  @ManyToOne(() => TypeEntity, (type) => type.menu)
  @JoinColumn({ name: 'type' })
  type: TypeEntity;

  @OneToMany(() => CommentEntity, (comment) => comment.food)
  comments: CommentEntity[];

  @OneToMany(() => BasketEntity, (basket) => basket.food)
  baskets: BasketEntity[];
}
