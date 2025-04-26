import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Length } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({ example: 'great food !' })
  @IsString()
  @Length(1, 100)
  title: string;

  @ApiProperty({ example: 4.2 })
  @IsNumber()
  score: number;

  @ApiProperty({ example: 2 })
  @IsNumber()
  food_id: number;
}
