import { cn } from "../../utils/cn";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const startPage = Math.max(1, Math.min(currentPage - 2, totalPages - 4));
  const pages = Array.from(
    { length: Math.min(5, totalPages) },
    (_, index) => startPage + index,
  );

  function showPreviousPage() {
    onPageChange(Math.max(1, currentPage - 1));
  }

  function showNextPage() {
    onPageChange(Math.min(totalPages, currentPage + 1));
  }

  return (
    <nav
      className="mt-9 flex h-9 w-full flex-[0_0_36px] items-center justify-center gap-3"
      aria-label="영화 목록 페이지"
    >
      <button
        className="grid size-6 cursor-pointer place-items-center bg-transparent p-0"
        type="button"
        aria-label="이전 페이지"
        disabled={currentPage === 1}
        onClick={showPreviousPage}
      >
        <img className="block size-6" src="/icons/chevron-left.svg" alt="" />
      </button>

      <div className="flex items-center gap-1">
        {pages.map((page) => {
          const isCurrentPage = page === currentPage;

          return (
            <button
              className={cn(
                "grid size-9 cursor-pointer place-items-center rounded-[7px] p-0 text-[13px] leading-4 font-bold",
                isCurrentPage
                  ? "bg-[#17191e] text-white"
                  : "bg-transparent text-[#606774]",
              )}
              type="button"
              key={page}
              aria-current={isCurrentPage ? "page" : undefined}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          );
        })}
      </div>

      <button
        className="grid size-6 cursor-pointer place-items-center bg-transparent p-0"
        type="button"
        aria-label="다음 페이지"
        disabled={currentPage === totalPages}
        onClick={showNextPage}
      >
        <img className="block size-6" src="/icons/chevron-right.svg" alt="" />
      </button>
    </nav>
  );
}
