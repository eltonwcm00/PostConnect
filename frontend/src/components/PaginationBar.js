import React from "react";
import { Pagination } from "react-bootstrap";

const PaginationBar = ({ currentPage, setCurrentPage, itemsPerPage, count }) => {
  const totalPages = Math.ceil(count / itemsPerPage);
  const pageItems = [];

  for (let number = 1; number <= totalPages; number++) {
    pageItems.push(
      <Pagination.Item
        key={number}
        active={number === currentPage}
        onClick={() => setCurrentPage(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  return (
    <div className="d-flex justify-content-center">
      <Pagination>
        <Pagination.Prev
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="nxt-prev-btn"
        />
        {pageItems}
        <Pagination.Next
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="nxt-prev-btn"
        />
      </Pagination>
    </div>
  );
};

export default PaginationBar;
