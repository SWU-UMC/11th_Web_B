import { authApi } from "./auth-api";

export interface Favorite {
  favoriteId: number;
  movieId: number;
  createdAt: string;
}

interface FavoriteResponse<T> {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T;
}

export async function getFavorites() {
  const response = await authApi.get("favorites").json<FavoriteResponse<Favorite[]>>();
  return response.result;
}

export async function getFavoriteStatus(movieId: number) {
  const response = await authApi.get(`favorites/${movieId}`)
    .json<FavoriteResponse<{ isFavorite: boolean }>>();
  return response.result;
}

export function addFavorite(movieId: number) {
  return authApi.post("favorites", { json: { movieId } }).json<FavoriteResponse<Favorite>>();
}

export function deleteFavorite(movieId: number) {
  return authApi.delete(`favorites/${movieId}`).json<FavoriteResponse<null>>();
}
