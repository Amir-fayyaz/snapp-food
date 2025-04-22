import { Base } from 'src/common/abstracts/baseEntity';
import { EntityName } from 'src/common/enums/entityName.enum';
import { SupplierEntity } from 'src/modules/supplier/entities/supplier.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { MenuEntity } from './menu.entity';

@Entity(EntityName.Type)
export class TypeEntity extends Base {
  @Column({ type: 'varchar' })
  title: string;

  @ManyToOne(() => SupplierEntity, (supplier) => supplier.types, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'supplier' })
  supplier: SupplierEntity;

  @OneToMany(() => MenuEntity, (menu) => menu.type)
  menu: MenuEntity[];
}
