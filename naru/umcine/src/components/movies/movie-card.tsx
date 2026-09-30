import { Link } from "@tanstack/react-router";
import type { Movie } from "../../types/movie";

interface MovieCardProps {
  movie: Movie;
  onToggleBookmark: (movieId: number) => void;
}

export default function MovieCard({
  movie,
  onToggleBookmark,
}: MovieCardProps) {
  return (
    <article className="movie-card">
      <div className="movie-card__poster">
        <Link
          className="movie-card__poster-link"
          to="/movies/$movieId"
          params={{ movieId: String(movie.id) }}
        >
          <img src={movie.posterPath} alt={`${movie.title} 포스터`} />
        </Link>
        <button
          className={`bookmark-button${movie.isBookmarked ? " bookmark-button--active" : ""}`}
          type="button"
          aria-label={`${movie.title} ${movie.isBookmarked ? "북마크 해제" : "북마크 추가"}`}
          aria-pressed={movie.isBookmarked}
          onClick={() => onToggleBookmark(movie.id)}
        >
          <img
            src={movie.isBookmarked ? "/icons/bookmark.svg" : "/icons/bookmark-outline.svg"}
            alt=""
          />
        </button>
      </div>
      <div className="movie-card__title">
        <h2>
          <Link to="/movies/$movieId" params={{ movieId: String(movie.id) }}>
            {movie.title}
          </Link>
        </h2>
      </div>
      <div className="movie-card__meta">
        <p>{movie.releaseDate}</p>
      </div>
    </article>
  );
}
