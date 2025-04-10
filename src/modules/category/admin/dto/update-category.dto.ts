import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsBooleanString,
  IsOptional,
} from 'class-validator';

export class UpdateCategoryDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @IsString()
  @ApiProperty()
  slug: string;

  @IsBooleanString()
  @ApiProperty({ required: true })
  show: Boolean;

  @IsOptional()
  @ApiProperty({ description: 'Its not required', required: false })
  parent_id: number;

  @IsOptional()
  image: Express.Multer.File;
}
