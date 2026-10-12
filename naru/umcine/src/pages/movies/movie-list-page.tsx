import { useEffect, useState } from "react";
import { getMovies } from "../../api/movies/get-movies";
import type { TmdbMovieListResponse } from "../../api/movies/models";
import MovieGrid from "../../components/movies/movie-grid";
import Pagination from "../../components/movies/pagination";
import { getTmdbPosterUrl } from "../../utils/tmdb-image";

interface MovieListResult {
  page: number;
  data: TmdbMovieListResponse | null;
  error: string | null;
}

export function MovieListPage() {
  const [page, setPage] = useState(1);
  const [result, setResult] = useState<MovieListResult | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    let isCurrent = true;

    getMovies({ page })
      .then((data) => {
        if (isCurrent) {
          setResult({ page, data, error: null });
        }
      })
      .catch(() => {
        if (isCurrent) {
          setResult({ page, data: null, error: "영화 목록을 불러오지 못했어요." });
        }
      });

    return () => {
      isCurrent = false;
    };
  }, [page, retryCount]);

  const isLoading = result?.page !== page;
  const data = !isLoading ? result?.data : null;
  const error = !isLoading ? result?.error : null;
  const totalPages = Math.min(data?.total_pages ?? 0, 500);
  const movies =
    data?.results.map((movie) => ({
      id: movie.id,
      title: movie.title,
      releaseDate: movie.release_date,
      posterPath: getTmdbPosterUrl(movie.poster_path),
    })) ?? [];

  return (
    <>
      <main
        className="flex w-full flex-[1_0_auto] flex-col items-start gap-5 px-20 py-6 max-[1199px]:flex-1 max-[1199px]:px-[clamp(24px,calc((100%_-_636px)_/_2),80px)] max-[1199px]:pb-10 max-[683px]:gap-[18px] max-[683px]:px-[clamp(24px,calc((100%_-_416px)_/_2),80px)] max-[683px]:pt-5 max-[683px]:pb-8 max-[463px]:px-[clamp(16px,calc((100%_-_200px)_/_2),80px)] max-[463px]:pb-7"
        id="movies"
      >
        <h1 className="m-0 text-[38px] leading-11 font-bold tracking-[-1.71px] text-[#17191e] max-[1199px]:w-full max-[683px]:text-[34px] max-[683px]:leading-10 max-[683px]:tracking-[-1.2px] max-[463px]:text-[30px] max-[463px]:leading-[38px] max-[463px]:tracking-[-0.8px]">
          영화 목록
        </h1>
        {isLoading ? (
          <p className="w-full py-20 text-center text-[#606774]" role="status">
            영화 목록을 불러오는 중이에요.
          </p>
        ) : error ? (
          <div className="flex w-full flex-col items-center gap-4 py-20">
            <p className="m-0 text-[#606774]" role="alert">
              {error}
            </p>
            <button
              className="cursor-pointer rounded-lg bg-[#17191e] px-4 py-2 text-sm font-bold text-white"
              type="button"
              onClick={() => {
                setResult(null);
                setRetryCount((count) => count + 1);
              }}
            >
              다시 시도
            </button>
          </div>
        ) : movies.length === 0 ? (
          <p className="w-full py-20 text-center text-[#606774]" role="status">
            표시할 영화가 없어요.
          </p>
        ) : (
          <MovieGrid movies={movies} />
        )}
        {totalPages > 0 && (
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
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
