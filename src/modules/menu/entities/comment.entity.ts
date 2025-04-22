import { Base } from 'src/common/abstracts/baseEntity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { MenuEntity } from './menu.entity';
import { UserEntity } from 'src/modules/users/entities/user.entity';

@Entity()
export class CommentEntity extends Base {
  @Column({ type: 'varchar', nullable: false })
  comment: string;

  @ManyToOne(() => MenuEntity, (menu) => menu.comments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'food' })
  food: MenuEntity;

  @ManyToOne(() => UserEntity, (user) => user.comments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user' })
  user: UserEntity;
}
