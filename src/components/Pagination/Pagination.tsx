import React, { ReactElement } from 'react';
import Button from '../Button/Button';
import './Pagination.css';

interface PropsPagination {
  total: number;
  current: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

const DIVISOR_FOR_HALF = 2;

const Pagination = ({
  total,
  current,
  pageSize,
  onPageChange,
}: PropsPagination): ReactElement => {
  const totalPages = Math.ceil(total / pageSize);
  const maxPageNumbersToShow = 3;
  const pages = [];
  const halfMaxVisible = Math.floor(maxPageNumbersToShow / DIVISOR_FOR_HALF);

  let startPage = Math.max(1, current - halfMaxVisible);
  let endPage = Math.min(totalPages, current + halfMaxVisible);

  if (current <= halfMaxVisible) {
    endPage = Math.min(maxPageNumbersToShow, totalPages);
  }
  if (current + halfMaxVisible) {
    startPage = Math.max(1, totalPages - maxPageNumbersToShow + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className="pagination">
      {current > 1 && (
        <Button
          type="button"
          className="pagination-button"
          onClick={(): void => onPageChange(1)}
        >
          First
        </Button>
      )}
      {current > 1 && (
        <Button
          type="button"
          className="pagination-button"
          onClick={(): void => onPageChange(current - 1)}
        >
          Prev
        </Button>
      )}
      {pages.map((page) => (
        <Button
          type="button"
          className="pagination-button"
          key={page}
          onClick={(): void => onPageChange(page)}
        >
          {page}
        </Button>
      ))}
      {current < totalPages && (
        <Button
          type="button"
          className="pagination-button"
          onClick={(): void => onPageChange(current + 1)}
        >
          Next
        </Button>
      )}
      {current < totalPages && (
        <Button
          type="button"
          className="pagination-button"
          onClick={(): void => onPageChange(totalPages)}
        >
          Last
        </Button>
      )}
    </div>
  );
};

export default Pagination;
