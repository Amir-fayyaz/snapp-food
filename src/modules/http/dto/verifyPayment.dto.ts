import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class VerifyPaymentDto {
  @ApiProperty()
  @IsString()
  authority: string;

  @ApiProperty()
  @IsNumber()
  amount: number;
}
