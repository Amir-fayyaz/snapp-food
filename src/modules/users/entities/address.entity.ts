import { Base } from 'src/common/abstracts/baseEntity';
import { EntityName } from 'src/common/enums/entityName.enum';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity(EntityName.Address)
export class AddressEntity extends Base {
  @Column({ type: 'varchar', nullable: false })
  title: string;

  @Column({ type: 'varchar', nullable: false })
  province: string;

  @Column({ type: 'varchar', nullable: false })
  city: string;

  @Column({ type: 'varchar', nullable: false })
  address: string;

  @Column({ type: 'varchar', nullable: true })
  postal_code: string;

  //relations
  @ManyToOne(() => UserEntity, (user) => user.addressList, { cascade: true })
  @JoinColumn({ name: 'user' })
  user: UserEntity;
}
