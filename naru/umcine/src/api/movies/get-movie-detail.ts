import { tmdbClient } from "../tmdb-client";
import type { TmdbMovieDetail } from "./models";

export interface GetMovieDetailRequest {
  movieId: number;
}

export async function getMovieDetail({
  movieId,
}: GetMovieDetailRequest): Promise<TmdbMovieDetail> {
  return tmdbClient.get(`movie/${movieId}`).json<TmdbMovieDetail>();
}
