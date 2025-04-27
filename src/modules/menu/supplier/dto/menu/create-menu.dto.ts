import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, IsString, Length } from 'class-validator';

export class CreateMenuDto {
  @ApiProperty()
  @IsString()
  @Length(3, 50)
  name: string;

  @ApiProperty()
  image: Express.Multer.File;

  @ApiProperty({ example: 19.5 })
  @IsNumber()
  price: number;

  @ApiProperty({ maximum: 100, minimum: 0, example: 10 })
  @IsNumber()
  discount: number;

  @ApiProperty()
  @IsString()
  @Length(3, 150)
  description: string;

  @ApiProperty({ minimum: 0, maximum: 5, example: 2, default: 0 })
  @IsNumber()
  score: number;

  @ApiProperty()
  @IsInt()
  type_id: number;
}
