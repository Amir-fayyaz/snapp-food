import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class DiscountBasketDto {
  @ApiProperty({ type: String })
  @IsString()
  code: string;
}
