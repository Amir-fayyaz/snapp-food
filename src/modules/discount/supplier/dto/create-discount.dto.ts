import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class CreateDiscountDto {
  @ApiProperty({ example: 90_000, required: false })
  @IsNumber()
  @IsOptional()
  amount: number;

  @ApiProperty({ minimum: 0, maximum: 100, example: 5, required: false })
  @IsNumber()
  @IsOptional()
  percent: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  expireIn: number;

  @ApiProperty({ required: false, example: 2_000 })
  @IsNumber()
  @IsOptional()
  limit: number;

  @ApiProperty()
  @IsNumber()
  food_range: number;
}
