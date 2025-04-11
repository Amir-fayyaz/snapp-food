import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class PaginationDto {
  @ApiProperty({ default: 10, required: false })
  @IsOptional({})
  take: number;

  @ApiProperty({ default: 1, required: false })
  @IsOptional()
  page: number;
}
