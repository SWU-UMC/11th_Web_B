import { useState } from "react";
import MovieGrid from "../../components/movies/movie-grid";
import Pagination from "../../components/movies/pagination";
import { movies as initialMovies } from "../../data/movies";
import type { Movie } from "../../types/movie";

export function MovieListPage() {
  const [movies, setMovies] = useState<Movie[]>(initialMovies);

  function handleToggleBookmark(movieId: number) {
    setMovies((currentMovies) =>
      currentMovies.map((movie) =>
        movie.id === movieId
          ? { ...movie, isBookmarked: !movie.isBookmarked }
          : movie,
      ),
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
      <footer className="site-footer">
        <img className="site-footer__logo" src="/images/logos/tmdb-logo.svg" alt="TMDB" />
        <p>
          This product uses the TMDB API but is not endorsed or certified by{" "}
          <a href="https://www.themoviedb.org/?language=ko" target="_blank" rel="noreferrer">
            TMDB
          </a>
          .
        </p>
      </footer>
    </>
  );
}
