import { ApiPropertyOptional } from '@nestjs/swagger';

export class PaginationDto {
  @ApiPropertyOptional({ default: 10 })
  take: number;

  @ApiPropertyOptional({ default: 1 })
  page: number;
}
