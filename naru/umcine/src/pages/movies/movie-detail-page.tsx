import { Link, useParams } from "@tanstack/react-router";
import { movies } from "../../data/movies";

export function MovieDetailPage() {
  const { movieId } = useParams({ from: "/movies/$movieId" });
  const movie = movies.find(({ id }) => id === Number(movieId));

  if (!movie) {
    return (
      <main className="movie-detail-not-found">
        <p>영화를 찾을 수 없어요.</p>
        <Link to="/">영화 목록으로 돌아가기</Link>
      </main>
    );
  }

  return (
    <>
      <main className="movie-detail-page">
        <section className="movie-detail-hero">
          <img
            className="movie-detail-hero__backdrop"
            src={movie.backdropPath}
            alt=""
            aria-hidden="true"
          />
          <div className="movie-detail-hero__overlay">
            <Link className="movie-detail-hero__back-link" to="/">
              <img src="/icons/chevron-left.svg" alt="" />
              영화 목록
            </Link>

            <div className="movie-detail-hero__content">
              <h1>{movie.title}</h1>
              <p className="movie-detail-hero__original-title">{movie.originalTitle}</p>
              <div className="movie-detail-hero__meta">
                <span>{movie.releaseDate}</span>
                <span>{movie.genres.join(" · ")}</span>
                <span>{movie.runtime}</span>
              </div>
            </div>
          </div>
        </section>

        <section className="movie-detail-content">
          <img
            className="movie-detail-content__poster"
            src={movie.posterPath}
            alt={`${movie.title} 포스터`}
          />
          <div className="movie-detail-content__synopsis">
            <h2>{movie.tagline}</h2>
            <p>{movie.overview}</p>
          </div>

          <aside className="movie-rating-panel">
            <h2>내 평점</h2>
            <p>별점은 필수, 후기는 선택이에요.</p>
            <div className="movie-rating-panel__stars" aria-label="영화 별점">
              {[1, 2, 3, 4, 5].map((score) => (
                <span className="movie-rating-panel__star" key={score} aria-label={`${score}점`}>
                  <img src="/icons/star-outline.svg" alt="" />
                </span>
              ))}
            </div>
            <textarea
              className="movie-rating-panel__review"
              aria-label="영화 후기"
              placeholder="영화를 보고 느낀 점을 남겨보세요."
              readOnly
            />
            <button className="movie-rating-panel__save" type="button" disabled>
              평점 저장
            </button>
          </aside>
        </section>
      </main>

      <footer className="site-footer">
        <img className="site-footer__logo" src="/images/logos/tmdb-logo.svg" alt="TMDB" />
        <p>
          This product uses the TMDB API but is not endorsed or certified by{" "}
          <a href="https://www.themoviedb.org/?language=ko" target="_blank" rel="noreferrer">
            TMDB
          </a>
          .
        </p>
      </footer>
    </>
  );
}
