import { applyDecorators } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';

export function Pagination(page: number = 1, take: number = 10) {
  return applyDecorators(
    ApiQuery({ name: 'page', type: 'integer', default: page, required: false }),
    ApiQuery({ name: 'take', type: 'integer', default: take, required: false }),
  );
}
