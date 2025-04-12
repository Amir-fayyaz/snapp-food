import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class SignUpDto {
  @IsPhoneNumber('IR')
  @IsNotEmpty()
  @ApiProperty({ example: '09921810208' })
  mobile: string;
}
