import { useState } from "react";

const pages = [1, 2, 3, 4, 5];

export default function Pagination() {
  const [currentPage, setCurrentPage] = useState(1);

  function showPreviousPage() {
    setCurrentPage((page) => Math.max(1, page - 1));
  }

  function showNextPage() {
    setCurrentPage((page) => Math.min(pages.length, page + 1));
  }

  return (
    <nav className="pagination" aria-label="영화 목록 페이지">
      <button
        className="pagination__arrow"
        type="button"
        aria-label="이전 페이지"
        onClick={showPreviousPage}
      >
        <img src="/icons/chevron-left.svg" alt="" />
      </button>

      <div className="pagination__pages">
        {pages.map((page) => {
          const isCurrentPage = page === currentPage;

          return (
            <button
              className={`pagination__page${isCurrentPage ? " pagination__page--active" : ""}`}
              type="button"
              key={page}
              aria-current={isCurrentPage ? "page" : undefined}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          );
        })}
      </div>

      <button
        className="pagination__arrow"
        type="button"
        aria-label="다음 페이지"
        onClick={showNextPage}
      >
        <img src="/icons/chevron-right.svg" alt="" />
      </button>
    </nav>
  );
}
