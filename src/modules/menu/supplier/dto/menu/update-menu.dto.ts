import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsOptional, IsString } from 'class-validator';

export class UpdateFoodDto {
  @ApiProperty({ example: 'name 1' })
  @IsString()
  name: string;

  @ApiProperty({ type: 'string', format: 'binary', required: false })
  @IsOptional()
  image: Express.Multer.File;

  @ApiProperty({ type: 'number', example: 14.5 })
  @IsNumberString()
  price: number;

  @ApiProperty({ type: 'number', example: 5, default: 0 })
  @IsNumberString()
  discount: number;

  @ApiProperty({ type: 'string', example: 'random description' })
  @IsString()
  description: string;

  @ApiProperty({ type: 'number', maximum: 5, minimum: 0, example: 3 })
  @IsNumberString()
  score: number;

  @ApiProperty({ type: 'number', example: 2, required: false })
  @IsOptional()
  type_id: number;
}
