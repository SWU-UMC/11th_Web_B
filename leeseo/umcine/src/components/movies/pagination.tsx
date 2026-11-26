interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const PAGE_SIZE = 5;

  // 현재 페이지를 기준으로 5개의 페이지 번호 계산
  const startPage = Math.max(
    1,
    Math.min(
      currentPage - Math.floor(PAGE_SIZE / 2),
      totalPages - PAGE_SIZE + 1
    )
  );

  const endPage = Math.min(startPage + PAGE_SIZE - 1, totalPages);

  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index
  );

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2">
      {/* 이전 페이지 */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex h-8 w-8 items-center justify-center text-gray-500 disabled:opacity-30"
      >
        ‹
      </button>

      {/* 페이지 번호 5개 */}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`flex h-8 w-8 items-center justify-center rounded-md text-sm font-medium ${
            currentPage === page
              ? "bg-[#191A20] text-white"
              : "bg-transparent text-gray-600 hover:bg-gray-200"
          }`}
        >
          {page}
        </button>
      ))}

      {/* 다음 페이지 */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex h-8 w-8 items-center justify-center text-gray-500 disabled:opacity-30"
      >
        ›
      </button>
    </div>
  );
};

export default Pagination;