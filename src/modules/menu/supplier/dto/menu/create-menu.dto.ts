import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNumber,
  IsNumberString,
  IsString,
  Length,
} from 'class-validator';

export class CreateMenuDto {
  @ApiProperty()
  @IsString()
  @Length(3, 50)
  name: string;

  @ApiProperty()
  image: Express.Multer.File;

  @ApiProperty({ example: 19.5 })
  @IsNumberString()
  price: number;

  @ApiProperty({ maximum: 100, minimum: 0, example: 10 })
  @IsNumberString()
  discount: number;

  @ApiProperty()
  @IsString()
  @Length(3, 150)
  description: string;

  @ApiProperty({ minimum: 0, maximum: 5, example: 2, default: 0 })
  @IsNumberString()
  score: number;

  @ApiProperty()
  @IsNumberString()
  type_id: number;
}
