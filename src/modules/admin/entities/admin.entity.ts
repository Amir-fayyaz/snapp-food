import { Base } from 'src/common/abstracts/baseEntity';
import { Column, Entity } from 'typeorm';

@Entity()
export class AdminEntity extends Base {
  @Column({ type: 'varchar', nullable: false })
  email: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;
}
