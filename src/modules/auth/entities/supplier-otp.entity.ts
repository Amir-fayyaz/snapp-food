import { Base } from 'src/common/abstracts/baseEntity';
import { EntityName } from 'src/common/enums/entityName.enum';
import { BeforeInsert, Column, Entity } from 'typeorm';

@Entity(EntityName.SupplierOtp)
export class SupplierOtpEntity extends Base {
  @Column({ type: 'varchar', nullable: false })
  mobile: string;

  @Column({ type: 'varchar', nullable: false })
  otpCode: string;

  @Column({ type: 'timestamp', nullable: false })
  expiredAt: Date;

  @BeforeInsert()
  setExpire() {
    this.expiredAt = new Date(Date.now() + 2 * 60 * 1000); // 2 min
  }
}
