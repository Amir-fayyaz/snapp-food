import { PaginationType } from '../types/pagination.type';

export function Pagination(data: PaginationType) {
  const { page, take } = data;

  const skip = (page - 1) * take;

  return {
    skip,
    take,
  };
}
