import { PaginationType } from '../types/pagination.type';

export function Pagination(data: PaginationType) {
  const { page = 1, take = 10 } = data;

  const skip = (page - 1) * take;

  return {
    skip,
    take,
  };
}
