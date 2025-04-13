import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPhoneNumber, IsString, Length } from 'class-validator';

export class SignInDto {
  @IsPhoneNumber('IR')
  @IsNotEmpty()
  @ApiProperty()
  mobile: string;

  @IsString()
  @Length(5, 5)
  @ApiProperty({ example: '43193' })
  otpCode: string;
}
