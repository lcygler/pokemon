import React from "react";
import styles from "./Pagination.module.css";

function Pagination({ totalPages, currentPage, changePage }) {
  const maxPages = 5;

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const pageRange = Math.floor((maxPages - 1) / 2);
  let maxPageNumber = currentPage + pageRange;
  let minPageNumber = currentPage - pageRange;

  if (minPageNumber < 1) {
    minPageNumber = 1;
    maxPageNumber = minPageNumber + (maxPages - 1);
  }

  if (maxPageNumber > totalPages) {
    maxPageNumber = totalPages;
    minPageNumber = totalPages - (maxPages - 1);
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      changePage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      changePage(currentPage - 1);
    }
  };

  return (
    <div className={styles.pagination}>
      <button onClick={() => changePage(1)} className={styles.firstPageButton} title="First">
        &laquo;
      </button>
      <button onClick={handlePrevPage} className={styles.prevPageButton} title="Prev">
        &lsaquo;
      </button>

      {pageNumbers
        .filter((pageNumber) => pageNumber >= minPageNumber && pageNumber <= maxPageNumber)
        .map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => changePage(pageNumber)}
            className={pageNumber === currentPage ? styles.activePageButton : styles.pageButton}
          >
            {pageNumber}
          </button>
        ))}

      <button onClick={handleNextPage} className={styles.nextPageButton} title="Next">
        &rsaquo;
      </button>
      <button onClick={() => changePage(totalPages)} className={styles.lastPageButton} title="Last">
        &raquo;
      </button>
    </div>
  );
}

export default Pagination;
