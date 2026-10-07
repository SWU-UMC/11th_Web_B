import { useEffect, useState } from "react";
import MovieGrid from "../../components/movies/movie-grid";
import Pagination from "../../components/movies/pagination";
import { movies as initialMovies } from "../../data/movies";
import { readBookmarkIds, saveBookmarkIds } from "../../utils/bookmark-storage";

export function MovieListPage() {
  const [bookmarkIds, setBookmarkIds] = useState<number[]>(() => readBookmarkIds());
  const movies = initialMovies.map((movie) => ({
    ...movie,
    isBookmarked: bookmarkIds.includes(movie.id),
  }));

  useEffect(() => {
    saveBookmarkIds(bookmarkIds);
  }, [bookmarkIds]);

  function handleToggleBookmark(movieId: number) {
    setBookmarkIds((currentBookmarkIds) =>
      currentBookmarkIds.includes(movieId)
        ? currentBookmarkIds.filter((currentMovieId) => currentMovieId !== movieId)
        : [...currentBookmarkIds, movieId],
    );
  }

  return (
    <>
      <main
        className="flex w-full flex-[1_0_auto] flex-col items-start gap-5 px-20 py-6 max-[1199px]:flex-1 max-[1199px]:px-[clamp(24px,calc((100%_-_636px)_/_2),80px)] max-[1199px]:pb-10 max-[683px]:gap-[18px] max-[683px]:px-[clamp(24px,calc((100%_-_416px)_/_2),80px)] max-[683px]:pt-5 max-[683px]:pb-8 max-[463px]:px-[clamp(16px,calc((100%_-_200px)_/_2),80px)] max-[463px]:pb-7"
        id="movies"
      >
        <h1 className="m-0 text-[38px] leading-11 font-bold tracking-[-1.71px] text-[#17191e] max-[1199px]:w-full max-[683px]:text-[34px] max-[683px]:leading-10 max-[683px]:tracking-[-1.2px] max-[463px]:text-[30px] max-[463px]:leading-[38px] max-[463px]:tracking-[-0.8px]">
          영화 목록
        </h1>
        <MovieGrid movies={movies} onToggleBookmark={handleToggleBookmark} />
        <Pagination />
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
