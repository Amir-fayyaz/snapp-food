import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsBooleanString,
  IsNotEmpty,
  IsOptional,
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

  @IsBooleanString()
  @ApiProperty({ required: true })
  show: Boolean;

  @IsOptional()
  @ApiProperty({ description: 'Its not required', required: false })
  parent_id: number;
}
