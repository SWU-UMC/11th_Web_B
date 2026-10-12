import { tmdbClient } from "../tmdb-client";
import type { TmdbMovieListResponse } from "./models";

export interface GetMoviesRequest {
  page?: number;
}

export async function getMovies({
  page = 1,
}: GetMoviesRequest = {}): Promise<TmdbMovieListResponse> {
  return tmdbClient
    .get("movie/popular", { searchParams: { page } })
    .json<TmdbMovieListResponse>();
}
