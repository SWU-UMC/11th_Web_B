import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect, useState, type SubmitEvent } from "react";
import { movies } from "../data/movies";

const SearchPage = () => {
  const { query } = useSearch({ from: "/search" });
  const navigate = useNavigate({ from: "/search" });
  const [searchText, setSearchText] = useState(query ?? "");

  useEffect(() => {
    setSearchText(query ?? "");
  }, [query]);

  const normalizedQuery = query?.trim().toLowerCase() ?? "";

  const searchResults = normalizedQuery
    ? movies.filter(
        (movie) =>
          movie.title.toLowerCase().includes(normalizedQuery) ||
          movie.originalTitle.toLowerCase().includes(normalizedQuery),
      )
    : [];

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextQuery = searchText.trim();

    navigate({
      search: nextQuery ? { query: nextQuery } : {},
    });
  }

  return (
    <div
      className={`px-[80px] ${
        normalizedQuery ? "pt-[80px]" : "pt-[160px]"
      }`}
    >
      {/* 검색 제목 + 검색창 */}
      <div className="mx-auto flex max-w-[1280px] flex-col items-center">
        <div
          className={`font-bold text-[#1A1D24] ${
            normalizedQuery
              ? "mb-[32px] text-[32px] leading-[42px]"
              : "mb-[40px] text-[40px] leading-[52px]"
          }`}
        >
          {normalizedQuery
            ? "영화 검색"
            : "어떤 영화를 찾고 있나요?"}
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex w-full max-w-[720px] gap-[12px]"
        >
          <input
            aria-label="검색어"
            placeholder="예: 스파이더맨"
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
            className="h-[48px] flex-1 rounded-[8px] border border-[#D9DDE5] bg-white px-[16px] text-[16px] leading-[24px] text-[#1A1D24] outline-none placeholder:text-[#9CA3AF] focus:border-[#1A1D24]"
          />

          <button
            type="submit"
            className="h-[48px] rounded-[8px] bg-[#1A1D24] px-[24px] text-[16px] font-medium leading-[24px] text-white transition-opacity hover:opacity-80"
          >
            {normalizedQuery ? "다시 검색" : "검색"}
          </button>
        </form>

        {!normalizedQuery && (
          <p className="mt-[16px] text-[14px] leading-[20px] text-[#606774]">
            검색어를 입력해 주세요.
          </p>
        )}
      </div>

      {/* 검색 결과 */}
      {normalizedQuery && (
        <div className="mx-auto mt-[80px] max-w-[1280px]">
          {/* 검색 결과 제목 + 개수 */}
          <div className="mb-[24px] flex items-end justify-between">
            <h2 className="text-[24px] font-bold leading-[32px] text-[#1A1D24]">
              ‘{query}’ 검색 결과
            </h2>

            <span className="text-[14px] leading-[20px] text-[#606774]">
              영화 {searchResults.length}편 | 페이지 1
            </span>
          </div>

          {searchResults.length === 0 ? (
            <p className="py-[80px] text-center text-[16px] leading-[24px] text-[#606774]">
              검색 결과가 없어요.
            </p>
          ) : (
            <ul className="flex flex-col">
              {searchResults.map((movie) => (
                <li
                  key={movie.id}
                  className="border-b border-[#E5E7EB] py-[24px] first:pt-0"
                >
                  <Link
                    to="/movies/$movieId"
                    params={{ movieId: String(movie.id) }}
                    className="flex gap-[24px]"
                  >
                    <img
                      src={movie.posterPath}
                      alt={`${movie.title} 포스터`}
                      className="h-[180px] w-[120px] shrink-0 rounded-[8px] object-cover"
                    />

                    <div className="flex min-w-0 flex-1 flex-col">
                      <h3 className="mb-[8px] text-[20px] font-bold leading-[28px] text-[#1A1D24]">
                        {movie.title}
                      </h3>

                      <p className="mb-[12px] text-[14px] leading-[20px] text-[#606774]">
                        {movie.originalTitle}　{movie.releaseDate}
                      </p>

                      <p className="line-clamp-3 text-[14px] leading-[22px] text-[#606774]">
                        {movie.overview}
                      </p>

                      <span className="mt-auto pt-[16px] text-[14px] font-medium leading-[20px] text-[#3B82F6]">
                        상세 보기 →
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchPage;