import type { MovieCardMovie } from "../../types/movie-card";
import { getTmdbPosterUrl } from "../../utils/tmdb-image";
import type { TmdbMovieListItem } from "./models";

export function toMovieCardMovie(movie: TmdbMovieListItem): MovieCardMovie {
  return {
    id: movie.id,
    title: movie.title,
    posterUrl: getTmdbPosterUrl(movie.poster_path),
    rating: movie.vote_average,
    releaseDate: movie.release_date,
  };
}
