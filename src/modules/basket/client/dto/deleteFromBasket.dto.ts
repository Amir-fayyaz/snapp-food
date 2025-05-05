import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class DeleteFromBasketDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  foodId: number;
}
