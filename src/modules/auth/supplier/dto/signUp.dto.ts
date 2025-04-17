import { ApiProperty } from '@nestjs/swagger';
import { IsPhoneNumber } from 'class-validator';

export class SignUpDto {
  @IsPhoneNumber('IR')
  @ApiProperty({ example: '09921810208' })
  mobile: string;
}
