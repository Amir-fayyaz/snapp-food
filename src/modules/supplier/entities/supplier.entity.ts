import { Base } from 'src/common/abstracts/baseEntity';
import { EntityName } from 'src/common/enums/entityName.enum';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { City } from '../enums/city.enum';
import { CategoryEntity } from 'src/modules/category/entities/category.entity';

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
}
