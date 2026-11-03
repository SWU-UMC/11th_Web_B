import { tmdbClient } from "../tmdb-client";
import type { TmdbMovieListResponse } from "../models";

interface SearchMoviesRequest {
  query: string;
  page?: number;
}

type SearchMoviesResponse = TmdbMovieListResponse;

function getSearchMovies({ query, page = 1 }: SearchMoviesRequest) {
  return tmdbClient
    .get("search/movie", {
      searchParams: {
        query,
        language: "ko-KR",
        include_adult: false,
        page,
      },
    })
    .json<SearchMoviesResponse>();
}

export {
  getSearchMovies,
  type SearchMoviesRequest,
  type SearchMoviesResponse,
};