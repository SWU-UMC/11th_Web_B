import { queryOptions } from "@tanstack/react-query";
import { getMovieDetail } from "./get-movie-detail";
import { getMovies } from "./get-movies";
import { searchMovies } from "./search-movies";

export function movieListQueryOptions(page: number) {
  return queryOptions({
    queryKey: ["movies", "list", { page }] as const,
    queryFn: () => getMovies({ page }),
    retry: false,
  });
}

export function movieSearchQueryOptions(normalizedQuery: string) {
  return queryOptions({
    queryKey: ["movies", "search", { query: normalizedQuery }] as const,
    queryFn: () => searchMovies({ query: normalizedQuery }),
    enabled: Boolean(normalizedQuery),
    retry: false,
  });
}

export function movieDetailQueryOptions(movieId: number) {
  return queryOptions({
    queryKey: ["movies", "detail", movieId] as const,
    queryFn: () => getMovieDetail({ movieId }),
    staleTime: 30 * 1000,
    retry: false,
  });
}
