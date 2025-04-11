import { Base } from 'src/common/abstracts/baseEntity';
import { EntityName } from 'src/common/enums/entityName.enum';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity(EntityName.Category)
export class CategoryEntity extends Base {
  @Column({ type: 'varchar', nullable: false })
  title: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  slug: string;

  @Column({ type: 'boolean' })
  show: Boolean;

  @Column({ type: 'varchar', default: null })
  image: string;

  @Column({ nullable: true, type: 'varchar' })
  imageKey: string;

  //relations
  @ManyToOne(() => CategoryEntity, (category) => category.children, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'parant' })
  parent: CategoryEntity;

  @OneToMany(() => CategoryEntity, (category) => category.parent)
  children: CategoryEntity[];
}
