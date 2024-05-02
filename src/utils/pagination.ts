import { PropsCar } from '../types/interfaces';

interface PaginationParams {
  items: PropsCar[];
  pageNumber: number;
  pageSize: number;
}

const pagination = ({
  items,
  pageNumber,
  pageSize,
}: PaginationParams): PropsCar[] => {
  const startIndex = (pageNumber - 1) * pageSize;
  return items.slice(startIndex, startIndex + pageSize);
};

export default pagination;
