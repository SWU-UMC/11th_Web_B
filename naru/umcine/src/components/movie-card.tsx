export interface Movie {
  id: number;
  title: string;
  releaseDate: string;
  isBookmarked: boolean;
}

interface MovieCardProps {
  movie: Movie;
  onToggleBookmark: (movieId: number) => void;
}

export default function MovieCard({
  movie,
  onToggleBookmark,
}: MovieCardProps) {
  return (
    <article>
      <h2>{movie.title}</h2>
      <p>{movie.releaseDate}</p>

      <button
        aria-pressed={movie.isBookmarked}
        onClick={() => onToggleBookmark(movie.id)}
      >
        {movie.isBookmarked ? "북마크 해제" : "북마크 추가"}
      </button>
    </article>
  );
}