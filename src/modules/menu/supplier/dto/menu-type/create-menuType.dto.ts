import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class CreateMenuTypeDto {
  @ApiProperty({ example: 'random menu-type' })
  @IsString()
  @Length(3, 50)
  title: string;
}
