import { authApi } from "./auth-api";

export interface Rating {
  ratingId: number;
  movieId: number;
  score: number;
  comment: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface RatingInput {
  score: number;
  comment: string | null;
}

interface RatingResponse<T> {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T;
}

export async function getMovieRating(memberId: number, movieId: number): Promise<Rating | null> {
  const size = 100;
  for (let page = 0; ; page += 1) {
    const ratings = await authApi.get(`members/${memberId}/ratings`, {
      searchParams: { page, size },
    }).json<Rating[]>();
    const rating = ratings.find((item) => item.movieId === movieId);
    if (rating) return rating;
    if (ratings.length < size) return null;
  }
}

export async function createRating(movieId: number, input: RatingInput) {
  const response = await authApi.post("ratings", { json: { movieId, ...input } })
    .json<RatingResponse<Rating>>();
  return response.result;
}

export async function updateRating(ratingId: number, input: RatingInput) {
  const response = await authApi.patch(`ratings/${ratingId}`, { json: input })
    .json<RatingResponse<Rating>>();
  return response.result;
}

export async function deleteRating(ratingId: number) {
  await authApi.delete(`ratings/${ratingId}`).json<RatingResponse<null>>();
  return null;
}
