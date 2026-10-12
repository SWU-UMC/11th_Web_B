export function getTmdbPosterUrl(posterPath: string | null): string {
  return posterPath ? `https://image.tmdb.org/t/p/w500${posterPath}` : "";
}
