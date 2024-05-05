interface PaginationParams<T> {
  items: T[];
  pageNumber: number;
  pageSize: number;
}

const pagination = <T>({
  items,
  pageNumber,
  pageSize,
}: PaginationParams<T>): T[] => {
  const startIndex = (pageNumber - 1) * pageSize;
  return items.slice(startIndex, startIndex + pageSize);
};

export default pagination;
