export function getTmdbPosterUrl(posterPath: string | null): string {
  return posterPath ? `https://image.tmdb.org/t/p/w500${posterPath}` : "";
}

export function getTmdbBackdropUrl(backdropPath: string | null): string {
  return backdropPath ? `https://image.tmdb.org/t/p/w1280${backdropPath}` : "";
}
