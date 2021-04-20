import React, { FC } from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

type TProps = {
  page: number;
  totalPages: number;
  url: string;
}

const Paginate: FC<TProps> = ({ page: currentPage, totalPages, url: rootUrl }) => {

  const url = (page: number) => {
    return `${rootUrl}?page=${page}`;
  };

  const pages = () => {
    let start = 0;
    let end = totalPages < 5 ? totalPages : 5;
    let pages = [];

    if (currentPage > 3 && totalPages > 5) {
      start = ((totalPages - 3) < currentPage) ? totalPages - 5 : currentPage - 3;
    }

    if (totalPages > 5) {
      end = start + 5;
    }

    for (let i = start; i < end; i++) {
      pages.push(i + 1);
    }


    return pages;
  };

  return (
    <Pagination className="d-flex justify-content-center" aria-label="Page navigation">
      <PaginationItem disabled={currentPage === 1}>
        <PaginationLink first href={url(1)} />
      </PaginationItem>
      <PaginationItem disabled={currentPage === 1}>
        <PaginationLink previous href={url(currentPage - 1)} />
      </PaginationItem>
      {pages().map((page) => (
        <PaginationItem key={page} active={currentPage === page}>
          <PaginationLink href={url(page)} >{ page }</PaginationLink>
        </PaginationItem>
      ))}
      <PaginationItem disabled={currentPage === totalPages}>
        <PaginationLink next href={url(currentPage + 1)} />
      </PaginationItem>
      <PaginationItem disabled={currentPage === totalPages}>
        <PaginationLink last href={url(totalPages)} />
      </PaginationItem>
    </Pagination>
  );
};

export default Paginate;
