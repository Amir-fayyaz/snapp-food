import { Base } from 'src/common/abstracts/baseEntity';
import { EntityName } from 'src/common/enums/entityName.enum';
import { SupplierEntity } from 'src/modules/supplier/entities/supplier.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { TypeEntity } from './type.entity';

@Entity(EntityName.Menu)
export class MenuEntity extends Base {
  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar' })
  image: string;

  @Column({ type: 'double', nullable: false })
  price: number;

  @Column({ type: 'smallint', nullable: true })
  discount: number;

  @Column({ type: 'varchar', nullable: false })
  description: string;

  @Column({ type: 'double' })
  score: number;

  //relations
  @ManyToOne(() => SupplierEntity, (supplier) => supplier.menu)
  @JoinColumn({ name: 'supplier' })
  supplier: SupplierEntity;

  @ManyToOne(() => TypeEntity, (type) => type.menu)
  @JoinColumn({ name: 'type' })
  type: TypeEntity;
}
