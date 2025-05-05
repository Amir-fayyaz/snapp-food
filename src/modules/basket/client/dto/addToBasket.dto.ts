import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class AddToBasketDto {
  @ApiProperty({ example: 3 })
  @IsNumber()
  foodId: number;
}
