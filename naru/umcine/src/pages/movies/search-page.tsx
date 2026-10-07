import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect, useState, type SubmitEvent } from "react";
import { movies } from "../../data/movies";
import { useBookmarkStore } from "../../stores/bookmark-store";
import { cn } from "../../utils/cn";

export function SearchPage() {
  const { query } = useSearch({ from: "/search" });
  const navigate = useNavigate({ from: "/search" });
  const [searchInput, setSearchInput] = useState(query ?? "");
  const bookmarkedMovieIds = useBookmarkStore((state) => state.bookmarkedMovieIds);
  const toggleBookmark = useBookmarkStore((state) => state.toggleBookmark);

  useEffect(() => {
    let isCurrent = true;

    queueMicrotask(() => {
      if (isCurrent) {
        setSearchInput(query ?? "");
      }
    });

    return () => {
      isCurrent = false;
    };
  }, [query]);

  const displayQuery = query?.trim() ?? "";
  const normalizedQuery = displayQuery.toLowerCase();
  const searchResults = normalizedQuery
    ? movies.filter(
        (movie) =>
          movie.title.toLowerCase().includes(normalizedQuery) ||
          movie.originalTitle.toLowerCase().includes(normalizedQuery),
      )
    : [];

  function updateSearch(queryValue: string) {
    const trimmedQuery = queryValue.trim();

    void navigate({
      to: "/search",
      search: trimmedQuery ? { query: trimmedQuery } : {},
    });
  }

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    updateSearch(searchInput);
  }

  function handleClear() {
    setSearchInput("");
    updateSearch("");
  }

  if (!displayQuery) {
    return (
      <main className="flex min-h-[calc(100vh-91px)] w-full flex-1 items-center justify-center px-[clamp(16px,5vw,72px)] py-[clamp(80px,12vw,140px)] max-[683px]:min-h-[calc(100vh-75px)]">
        <div className="flex w-full max-w-[720px] -translate-y-20 flex-col items-center gap-7 max-[683px]:-translate-y-6 max-[463px]:-translate-y-4 max-[463px]:gap-6">
          <h1 className="m-0 whitespace-nowrap text-[40px] leading-[48px] font-bold tracking-[-2px] text-[#17191e] max-[683px]:text-[32px] max-[683px]:leading-[38px] max-[683px]:tracking-[-1.1px] max-[463px]:whitespace-normal max-[463px]:text-center max-[463px]:text-[27px] max-[463px]:leading-[34px] max-[463px]:tracking-[-0.8px]">
            어떤 영화를 찾고 있나요?
          </h1>
          <SearchForm
            value={searchInput}
            onChange={setSearchInput}
            onSubmit={handleSubmit}
            variant="empty"
          />
        </div>
      </main>
    );
  }

  return (
    <>
      <main className="w-full flex-[1_0_auto] px-20 py-6 max-[1199px]:px-10 max-[683px]:px-6 max-[683px]:pt-5 max-[683px]:pb-8 max-[463px]:px-4">
        <div className="flex w-full flex-col gap-[17px]">
          <h1 className="m-0 text-[38px] leading-11 font-bold tracking-[-1.71px] text-[#17191e] max-[683px]:text-[34px] max-[683px]:leading-10 max-[683px]:tracking-[-1.2px]">
            영화 검색
          </h1>
          <SearchForm
            value={searchInput}
            onChange={setSearchInput}
            onSubmit={handleSubmit}
            onClear={handleClear}
            variant="results"
          />
        </div>

        <div className="flex h-[54px] w-full items-center justify-between border-y border-[#e3e6eb]">
          <h2 className="m-0 min-w-0 text-lg leading-[21px] font-bold text-[#17191e] max-[463px]:overflow-hidden max-[463px]:text-ellipsis max-[463px]:whitespace-nowrap">
            ‘{displayQuery}’ 검색 결과
          </h2>
          <span className="text-xs leading-[14px] font-normal text-[#969da8] max-[463px]:hidden">
            영화 {searchResults.length}편 · 1페이지
          </span>
        </div>

        {searchResults.length > 0 ? (
          <div className="grid grid-cols-2 gap-x-10 max-[1199px]:grid-cols-1">
            {searchResults.map((movie) => {
              const isBookmarked = bookmarkedMovieIds.includes(movie.id);

              return (
                <article
                  className="flex h-60 w-full items-start gap-[18px] border-b border-[#e3e6eb] py-5 max-[463px]:h-auto max-[463px]:min-h-[190px] max-[463px]:gap-3.5"
                  key={movie.id}
                >
                  <div className="relative h-[190px] w-[126px] flex-[0_0_126px] overflow-hidden rounded-[10px] bg-[#f6f7f9] max-[463px]:h-[151px] max-[463px]:w-[100px] max-[463px]:basis-[100px]">
                    <img
                      className="block size-full object-cover"
                      src={movie.posterPath}
                      alt={`${movie.title} 포스터`}
                    />
                    <button
                      className={cn(
                        "absolute top-2.5 right-2.5 grid size-[34px] cursor-pointer place-items-center rounded-lg border! border-solid! p-0",
                        isBookmarked
                          ? "border-[#2563eb]! bg-[#2563eb]"
                          : "border-white! bg-[#17191e]",
                      )}
                      type="button"
                      aria-label={`${movie.title} ${isBookmarked ? "북마크 해제" : "북마크 추가"}`}
                      aria-pressed={isBookmarked}
                      onClick={() => toggleBookmark(movie.id)}
                    >
                      <img
                        className="block size-6 invert"
                        src={
                          isBookmarked
                            ? "/icons/bookmark.svg"
                            : "/icons/bookmark-outline.svg"
                        }
                        alt=""
                      />
                    </button>
                  </div>
                  <div className="flex h-full min-w-0 flex-1 flex-col items-start gap-2 pt-1">
                    <h3 className="m-0 w-full text-lg leading-[24.3px] font-bold text-[#17191e]">
                      {movie.title}
                    </h3>
                    <div className="flex w-full items-center gap-2 text-xs leading-[14px] font-normal text-[#969da8] max-[463px]:flex-wrap">
                      <span>{movie.originalTitle}</span>
                      <span>{movie.releaseDate}</span>
                    </div>
                    <p className="m-0 line-clamp-3 w-full text-[12.5px] leading-[20.25px] font-normal text-[#606774]">
                      {movie.overview}
                    </p>
                    <Link
                      className="mt-auto flex items-center gap-1 text-xs leading-[14px] font-extrabold text-[#2563eb] no-underline"
                      to="/movies/$movieId"
                      params={{ movieId: String(movie.id) }}
                    >
                      상세 보기
                      <img className="block size-4" src="/icons/arrow-right.svg" alt="" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <p className="m-0 border-b border-[#e3e6eb] px-0 py-20 text-center text-lg leading-6 font-bold text-[#606774]">
            검색 결과가 없어요.
          </p>
        )}
      </main>

      <footer className="flex h-[57px] w-full flex-[0_0_auto] items-center justify-end gap-2 border-t border-[#e3e6eb] bg-white px-20 py-4 text-xs leading-[14px] font-normal text-[#606774] max-[1199px]:h-auto max-[1199px]:min-h-[57px] max-[1199px]:px-10 max-[683px]:px-6 max-[463px]:items-start max-[463px]:px-4 max-[463px]:py-3.5">
        <img className="block size-6" src="/images/logos/tmdb-logo.svg" alt="TMDB" />
        <p className="m-0 whitespace-nowrap max-[463px]:whitespace-normal">
          This product uses the TMDB API but is not endorsed or certified by{" "}
          <a
            className="text-inherit underline [text-underline-position:from-font]"
            href="https://www.themoviedb.org/?language=ko"
            target="_blank"
            rel="noreferrer"
          >
            TMDB
          </a>
          .
        </p>
      </footer>
    </>
  );
}

interface SearchFormProps {
  value: string;
  variant: "empty" | "results";
  onChange: (value: string) => void;
  onSubmit: (event: SubmitEvent<HTMLFormElement>) => void;
  onClear?: () => void;
}

function SearchForm({ value, variant, onChange, onSubmit, onClear }: SearchFormProps) {
  const isResultsForm = variant === "results";

  return (
    <form
      className={cn(
        "flex w-full items-center bg-white",
        isResultsForm
          ? "h-[54px] gap-[18px] rounded-[9px] border border-[#e3e6eb] pr-[10px] pl-[15px] max-[463px]:gap-[10px] max-[463px]:pl-3"
          : "h-16 gap-[14px] rounded-xl border-2 border-[#17191e] pr-[17px] pl-[21px] shadow-[0_12px_17px_rgba(17,19,24,0.08)] max-[463px]:h-[58px] max-[463px]:gap-[10px] max-[463px]:pr-[10px] max-[463px]:pl-[14px]",
      )}
      onSubmit={onSubmit}
    >
      <img className="block size-6 flex-[0_0_24px]" src="/icons/search.svg" alt="" />
      <input
        className={cn(
          "h-full min-w-0 flex-1 border-0 bg-transparent px-0.5 font-[inherit] text-[#17191e] outline-none placeholder:text-[#969da8] placeholder:opacity-100",
          isResultsForm
            ? "text-sm leading-[17px] font-bold"
            : "text-[17px] leading-5 font-normal max-[463px]:text-[15px]",
        )}
        aria-label="영화 제목"
        autoFocus={!isResultsForm}
        placeholder="예: 스파이더맨"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
      {isResultsForm && value && onClear ? (
        <button
          className="block size-6 flex-[0_0_24px] cursor-pointer bg-transparent p-0"
          type="button"
          aria-label="검색어 지우기"
          onClick={onClear}
        >
          <img className="block size-6" src="/icons/close.svg" alt="" />
        </button>
      ) : null}
      <button
        className="h-[42px] flex-none cursor-pointer whitespace-nowrap rounded-lg border! border-solid! border-[#17191e]! bg-[#17191e] px-4 text-sm leading-[17px] font-extrabold text-white"
        type="submit"
      >
        {isResultsForm ? "다시 검색" : "검색"}
      </button>
    </form>
  );
}
