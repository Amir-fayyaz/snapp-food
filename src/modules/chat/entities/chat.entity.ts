import { Base } from 'src/common/abstracts/baseEntity';
import { EntityName } from 'src/common/enums/entityName.enum';
import { SupplierEntity } from 'src/modules/supplier/entities/supplier.entity';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity(EntityName.Chat)
export class ChatEntity extends Base {
  @Column({ type: 'varchar', nullable: false })
  message: string;

  @Column()
  userId: number;

  @Column()
  supplierId: number;

  @ManyToOne(() => UserEntity, (user) => user.messages)
  user: UserEntity;

  @ManyToOne(() => SupplierEntity, (supplier) => supplier.messages)
  supplier: SupplierEntity;

  @ManyToOne(() => ChatEntity, (chat) => chat.replies)
  @JoinColumn({ name: 'parent' })
  parent: ChatEntity;

  @OneToMany(() => ChatEntity, (chat) => chat.parent)
  replies: ChatEntity[];
}
