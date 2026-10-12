import { env } from "../../config/env";
import type { TmdbMovieListResponse } from "./models";

export async function getMoviesWithFetch(page = 1): Promise<TmdbMovieListResponse> {
  const url = new URL("/3/movie/popular", env.tmdbApiBaseUrl);

  url.searchParams.set("language", "ko-KR");
  url.searchParams.set("page", String(page));

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${env.tmdbAccessToken}`,
      accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(
      `TMDB 영화 목록 요청에 실패했어요. (${response.status} ${response.statusText})`,
    );
  }

  return response.json() as Promise<TmdbMovieListResponse>;
}
