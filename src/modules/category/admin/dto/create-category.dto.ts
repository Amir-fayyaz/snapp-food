import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsBooleanString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @IsString()
  @ApiProperty()
  slug: string;

  @IsBoolean()
  @ApiProperty()
  show: Boolean;

  @IsOptional()
  @IsInt()
  @IsPositive()
  @ApiProperty({ description: 'Its not required', required: false })
  parent_id: number;
}
