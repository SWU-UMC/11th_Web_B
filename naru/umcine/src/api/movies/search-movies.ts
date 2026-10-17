import { tmdbClient } from "../tmdb-client";
import type { TmdbMovieListResponse } from "./models";

export interface SearchMoviesRequest {
  query: string;
  page?: number;
}

export async function searchMovies({
  query,
  page = 1,
}: SearchMoviesRequest): Promise<TmdbMovieListResponse> {
  return tmdbClient
    .get("search/movie", { searchParams: { query, page } })
    .json<TmdbMovieListResponse>();
}
