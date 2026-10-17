import { Link, useParams } from "@tanstack/react-router";
import { HTTPError } from "ky";
import { useEffect, useState } from "react";
import { getMovieDetail } from "../../api/movies/get-movie-detail";
import type { TmdbMovieDetail } from "../../api/movies/models";
import { useBookmarkStore } from "../../stores/bookmark-store";
import { getTmdbBackdropUrl, getTmdbPosterUrl } from "../../utils/tmdb-image";

interface MovieDetailResult {
  movieId: string;
  data: TmdbMovieDetail | null;
  error: "not-found" | "request" | null;
}

export function MovieDetailPage() {
  const { movieId } = useParams({ from: "/movies/$movieId" });
  const id = Number(movieId);
  const isValidId = /^\d+$/.test(movieId) && Number.isSafeInteger(id) && id > 0;
  const [result, setResult] = useState<MovieDetailResult | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  if (result && result.movieId !== movieId) {
    setResult(null);
  }

  useEffect(() => {
    if (!isValidId) return;

    let isCurrent = true;

    getMovieDetail({ movieId: id })
      .then((data) => {
        if (isCurrent) {
          setResult({ movieId, data, error: null });
        }
      })
      .catch((error: unknown) => {
        if (isCurrent) {
          setResult({
            movieId,
            data: null,
            error:
              error instanceof HTTPError && error.response.status === 404
                ? "not-found"
                : "request",
          });
        }
      });

    return () => {
      isCurrent = false;
    };
  }, [id, isValidId, movieId, retryCount]);

  const movie = result?.movieId === movieId ? result.data : null;
  const error = result?.movieId === movieId ? result.error : null;
  const isLoading = isValidId && !movie && !error;
  const bookmarkedMovieIds = useBookmarkStore((state) => state.bookmarkedMovieIds);
  const toggleBookmark = useBookmarkStore((state) => state.toggleBookmark);
  const isBookmarked = movie ? bookmarkedMovieIds.includes(movie.id) : false;

  if (!movie) {
    return (
      <main className="grid w-full flex-1 content-center justify-items-center gap-4 px-6 py-20">
        <p className="m-0 text-2xl leading-8 font-bold text-[#17191e]">
          <span role={isLoading ? "status" : "alert"}>
            {!isValidId
              ? "잘못된 영화 ID예요. 양의 정수를 입력해 주세요."
              : isLoading
                ? "영화 정보를 불러오는 중이에요."
                : error === "not-found"
                  ? "존재하지 않는 영화예요."
                  : "영화 정보를 불러오지 못했어요."}
          </span>
        </p>
        {error === "request" && (
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
        )}
        <Link className="text-sm leading-5 font-bold text-[#2563eb]" to="/">
          영화 목록으로 돌아가기
        </Link>
      </main>
    );
  }

  const posterUrl = getTmdbPosterUrl(movie.poster_path);
  const backdropUrl = getTmdbBackdropUrl(movie.backdrop_path);

  return (
    <>
      <main className="w-full flex-[1_0_auto]">
        <section className="relative h-[360px] w-full overflow-hidden bg-[#17191e] text-white max-[683px]:h-80 max-[463px]:h-[300px]">
          {backdropUrl ? (
            <img
              className="absolute inset-0 block size-full object-cover object-center"
              src={backdropUrl}
              alt=""
              aria-hidden="true"
            />
          ) : (
            <span className="absolute top-6 right-6 text-sm text-white/60">
              배경 이미지 없음
            </span>
          )}
          <div
            className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,12,16,0.76)_0%,rgba(10,12,16,0.5)_42%,rgba(10,12,16,0.1)_76%)]"
            aria-hidden="true"
          />
          <div className="relative z-10 flex size-full flex-col justify-between px-20 py-6 max-[1199px]:px-10 max-[683px]:px-6 max-[683px]:py-5 max-[463px]:px-4">
            <Link
              className="flex w-fit items-center gap-1 text-[13px] leading-4 font-bold text-inherit no-underline"
              to="/"
            >
              <img className="block size-6 invert" src="/icons/chevron-left.svg" alt="" />
              영화 목록
            </Link>

            <div className="flex w-full max-w-[800px] flex-col gap-2">
              <h1 className="m-0 line-clamp-3 break-words text-[46px] leading-[49.68px] font-bold tracking-[-2.3px] max-[683px]:text-4xl max-[683px]:leading-[42px] max-[683px]:tracking-[-1.2px] max-[463px]:text-[30px] max-[463px]:leading-9 max-[463px]:tracking-[-0.8px]">
                {movie.title}
              </h1>
              <p className="m-0 break-words text-sm leading-[17px] font-normal">
                {movie.original_title}
              </p>
              <div className="flex flex-wrap items-center gap-2 text-[13px] leading-4 font-bold">
                <span>{movie.release_date || "개봉일 미정"}</span>
                <span>
                  {movie.genres.map((genre) => genre.name).join(" · ") || "장르 정보 없음"}
                </span>
                <span>
                  {movie.runtime && movie.runtime > 0
                    ? `${movie.runtime}분`
                    : "상영 시간 정보 없음"}
                </span>
                <span>
                  {movie.vote_count > 0
                    ? `평점 ${movie.vote_average.toFixed(1)} / 10`
                    : "평점 없음"}
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="flex w-full items-start gap-8 px-20 pt-6 pb-40 max-[1199px]:flex-wrap max-[1199px]:px-10 max-[1199px]:pb-[120px] max-[683px]:gap-6 max-[683px]:px-6 max-[683px]:pb-24 max-[463px]:flex-col max-[463px]:px-4 max-[463px]:pb-20">
          <div
            className="block h-[286px] w-[200px] flex-[0_0_200px] overflow-hidden rounded-[10px] bg-[#f6f7f9] shadow-[0_12px_30px_rgba(12,15,20,0.12)] max-[683px]:h-[229px] max-[683px]:w-40 max-[683px]:basis-40 max-[463px]:h-[286px] max-[463px]:w-[200px] max-[463px]:basis-auto max-[463px]:self-center"
          >
            {posterUrl ? (
              <img
                className="block size-full object-cover"
                src={posterUrl}
                alt={`${movie.title} 포스터`}
              />
            ) : (
              <span className="flex size-full items-center justify-center text-sm text-[#606774]">
                이미지 없음
              </span>
            )}
          </div>
          <div className="flex min-w-0 flex-1 flex-col gap-3">
            <h2 className="m-0 text-[21px] leading-[26px] font-bold tracking-[-0.63px] text-[#17191e]">
              {movie.tagline || "줄거리"}
            </h2>
            <p className="m-0 text-sm leading-6 font-normal text-[#606774]">
              {movie.overview || "줄거리 정보가 없어요."}
            </p>
            <button
              className="inline-flex h-[42px] w-fit cursor-pointer items-center justify-center gap-2 rounded-lg border! border-solid! border-white! bg-[#2563eb] px-4 text-[14px]! leading-[17px]! font-extrabold! whitespace-nowrap text-white"
              type="button"
              aria-label={`${movie.title} ${isBookmarked ? "북마크 해제" : "북마크 추가"}`}
              aria-pressed={isBookmarked}
              onClick={() => toggleBookmark(movie.id)}
            >
              <img
                className="block size-4 invert"
                src={isBookmarked ? "/icons/bookmark.svg" : "/icons/bookmark-outline.svg"}
                alt=""
              />
              즐겨찾기
            </button>
          </div>

          <aside className="flex w-[360px] flex-[0_0_360px] flex-col items-start gap-2 border-l border-[#e3e6eb] pt-0 pr-0 pb-[41px] pl-[30px] max-[1199px]:w-full max-[1199px]:basis-full max-[1199px]:border-t max-[1199px]:border-l-0 max-[1199px]:px-0 max-[1199px]:pt-6 max-[1199px]:pb-0">
            <h2 className="m-0 w-full text-[21px] leading-[26px] font-bold tracking-[-0.63px] text-[#17191e]">
              내 평점
            </h2>
            <p className="m-0 w-full text-xs leading-[14px] font-normal text-[#969da8]">
              별점은 필수, 후기는 선택이에요.
            </p>
            <div className="flex w-full items-start gap-1" aria-label="영화 별점">
              {[1, 2, 3, 4, 5].map((score) => (
                <span
                  className="grid size-[38px] flex-[0_0_38px] place-items-center rounded-lg border border-[#e3e6eb] bg-white"
                  key={score}
                  aria-label={`${score}점`}
                >
                  <img className="block size-6" src="/icons/star-outline.svg" alt="" />
                </span>
              ))}
            </div>
            <textarea
              className="h-[102px] w-full resize-none rounded-lg border border-[#e3e6eb] bg-white px-3 pt-4 pb-[18px] font-[inherit] text-[13px] leading-[19.5px] font-normal text-[#17191e] outline-none placeholder:text-[#969da8] placeholder:opacity-100"
              aria-label="영화 후기"
              placeholder="영화를 보고 느낀 점을 남겨보세요."
              readOnly
            />
            <button
              className="inline-flex h-[42px] w-full items-center justify-center rounded-lg border! border-solid! border-white! bg-[#17191e] px-4 text-sm leading-[17px] font-extrabold text-white opacity-100"
              type="button"
              disabled
            >
              평점 저장
            </button>
          </aside>
        </section>
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
