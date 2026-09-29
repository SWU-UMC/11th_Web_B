import { useState } from "react";
import { Link, useParams } from "@tanstack/react-router";
import { useMovies } from "../../contexts/movie-provider";
import "../../style/images.css";
import "../../style/texts.css";
import "../../App.css";
import "../../style/movie-detail.css";
import { IoIosArrowBack } from "react-icons/io";
import { FaRegBookmark, FaBookmark, FaStar } from "react-icons/fa6";

const MovieDetailPage = () => {
  const { movieId } = useParams({
    from: "/movies/$movieId",
  });

  const { movieList, handleToggleBookmark } = useMovies();

  const movie = movieList.find(
    (item) => item.id === Number(movieId)
  );

  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const handleSaveReview = () => {
    if (rating === 0) {
      alert("별점을 선택해주세요.");
      return;
    }

    if (!review.trim()) {
      alert("한 줄 평을 입력해주세요.");
      return;
    }

    alert("평점이 저장되었습니다.");
  };

  if (!movie) {
    return <main>영화를 찾을 수 없어요.</main>;
  }

  return (
    <main id="movieDetailPage">
      {/* 기존 상단 배경 영역 */}
      <div id="backdropGrid">
        <img
          id="detailBackdrop"
          src={movie.backdropPath}
          alt=""
          aria-hidden="true"
        />

        <Link to="/" id="movieBack">
          <IoIosArrowBack size={24} />
          영화 목록
        </Link>

        <div className="backdrop-info">
          <h1>{movie.title}</h1>
          <p className="original-title">
            {movie.originalTitle}
          </p>

          <div className="meta-info">
            <span>{movie.releaseDate}</span>
            <span>{movie.genres.join(" · ")}</span>
            <span>{movie.runtime}</span>
          </div>
        </div>
      </div>

      {/* 하단 상세 정보 영역 */}
      <section className="detail-content">
        {/* 왼쪽: 포스터 */}
        <div className="detail-poster-container">
          <img
            id="detailPoster"
            src={movie.posterPath}
            alt={`${movie.title} 포스터`}
          />
        </div>

        {/* 가운데: 영화 소개 */}
        <div className="detail-description">
          {movie.tagline && (
            <h2>{movie.tagline}</h2>
          )}

          <p className="detail-overview">
            {movie.overview}
          </p>

          <button
            id="bookmarkButton2"
            className={
              movie.isBookmarked ? "selected" : ""
            }
            onClick={() =>
              handleToggleBookmark(movie.id)
            }
          >
            {movie.isBookmarked ? (
              <FaBookmark size={14} color="#FFFFFF" />
            ) : (
              <FaRegBookmark size={14} color="#FFFFFF" />
            )}
            즐겨찾기
          </button>
        </div>

        {/* 오른쪽: 평점 및 한 줄 평 */}
        <div className="rating-section">
          <h2>내 평점</h2>

          <p className="rating-description">
            별점을 입력해주세요.
          </p>

          <div className="rating-stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className={`star-button ${
                  rating >= star ? "active" : ""
                }`}
                onClick={() => setRating(star)}
                aria-label={`${star}점`}
              >
                <FaStar size={18} />
              </button>
            ))}
          </div>

          <textarea
            className="review-input"
            placeholder="영화를 보고 느낀 점을 남겨보세요."
            value={review}
            onChange={(e) =>
              setReview(e.target.value)
            }
          />

          <button
            className="rating-save-button"
            onClick={handleSaveReview}
          >
            평점 저장
          </button>
        </div>
      </section>
    </main>
  );
};

export default MovieDetailPage;