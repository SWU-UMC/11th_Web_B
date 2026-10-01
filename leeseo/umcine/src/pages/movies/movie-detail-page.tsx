import { useState } from "react";
import { Link, useParams } from "@tanstack/react-router";
import { useMovies } from "../../contexts/use-movies";
import { IoIosArrowBack } from "react-icons/io";
import {
  FaRegBookmark,
  FaBookmark,
  FaStar,
} from "react-icons/fa6";

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
    <main className="min-h-screen w-full bg-[#f5f6f8]">
      {/* 상단 배경 영역 */}
      <div className="relative flex h-[360px] w-full flex-col justify-between overflow-hidden box-border px-12 py-8 max-md:px-5 max-md:py-6">
        <img
          src={movie.backdropPath}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 z-0 h-full w-full object-cover"
        />

        {/* 뒤로가기 버튼 */}
        <Link
          to="/"
          className="relative z-10 inline-flex w-fit items-center gap-1 font-bold text-[15px] text-white no-underline opacity-90 transition-opacity hover:opacity-100"
        >
          <IoIosArrowBack size={24} />
          영화 목록
        </Link>

        {/* 배경 하단 영화 정보 */}
        <div className="relative z-10 flex flex-col gap-1 bg-transparent">
          <h1 className="m-0 text-[46px] font-bold text-white max-md:text-3xl">
            {movie.title}
          </h1>

          <p className="my-[2px] mb-[6px] text-sm text-white">
            {movie.originalTitle}
          </p>

          <div className="flex items-center gap-2 bg-transparent text-[13px] text-white">
            <span className="text-white">
              {movie.releaseDate}
            </span>

            <span className="text-white">
              {movie.genres.join(" · ")}
            </span>

            <span className="text-white">
              {movie.runtime}
            </span>
          </div>
        </div>
      </div>

      {/* 하단 상세 정보 영역 */}
      <section className="box-border grid min-h-[375px] grid-cols-[200px_minmax(0,1fr)_360px] gap-6 px-[5.5%] py-4 max-[1100px]:grid-cols-[160px_minmax(0,1fr)] max-[1100px]:gap-5 max-[768px]:grid-cols-[110px_minmax(0,1fr)] max-[768px]:gap-4 max-[768px]:px-5 max-[480px]:grid-cols-[90px_minmax(0,1fr)] max-[480px]:gap-3 max-[480px]:px-4">
        {/* 왼쪽: 포스터 */}
        <div className="h-[286px] w-[200px] max-[1100px]:w-full max-[768px]:h-auto max-[768px]:w-full">
          <img
            src={movie.posterPath}
            alt={`${movie.title} 포스터`}
            className="h-[286px] w-[200px] rounded-[10px] object-cover shadow-[0_4px_12px_rgba(0,0,0,0.12)] max-[1100px]:w-full max-[768px]:h-auto max-[768px]:aspect-[200/286]"
          />
        </div>

        {/* 가운데: 영화 소개 */}
        <div className="min-w-0 pr-6 max-[1100px]:pr-0">
          {movie.tagline && (
            <h2 className="mb-3 mt-0 text-[21px] font-bold text-[#17181c] max-[480px]:text-sm">
              {movie.tagline}
            </h2>
          )}

          <p className="mb-4 mt-0 break-keep text-sm leading-[1.8] text-[#606774] max-[480px]:text-xs">
            {movie.overview}
          </p>

          {/* 즐겨찾기 버튼 */}
          <button
            className={`mt-3 inline-flex h-9 w-fit min-w-[100px] shrink-0 items-center justify-center gap-2 rounded-[5px] border-0 px-[14px] py-2 text-[13px] font-semibold text-white cursor-pointer ${
              movie.isBookmarked
                ? "bg-[#2563eb]"
                : "bg-[#2563eb]"
            }`}
            onClick={() =>
              handleToggleBookmark(movie.id)
            }
          >
            {movie.isBookmarked ? (
              <FaBookmark
                size={14}
                color="#FFFFFF"
              />
            ) : (
              <FaRegBookmark
                size={14}
                color="#FFFFFF"
              />
            )}

            즐겨찾기
          </button>
        </div>

        {/* 오른쪽: 평점 및 한 줄 평 */}
        <div className="box-border flex h-[294px] w-[360px] flex-col items-stretch gap-2 border-l border-[#e5e7eb] pb-[41px] pl-[30px] max-[1100px]:col-span-2 max-[1100px]:mt-4 max-[1100px]:h-auto max-[1100px]:w-full max-[1100px]:border-l-0 max-[1100px]:border-t max-[1100px]:px-0 max-[1100px]:pt-5 max-[1100px]:pb-0">
          <h2 className="mb-2 mt-0 text-base font-bold text-[#17181c]">
            내 평점
          </h2>

          <p className="mb-2 mt-0 text-[11px] text-[#9ca3af]">
            별점을 입력해주세요.
          </p>

          {/* 별점 */}
          <div className="mb-2 flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className={`flex h-[27px] w-[27px] items-center justify-center rounded-md border border-[#e5e7eb] bg-white text-[#6b7280] transition-colors hover:bg-[#fef3c7] ${
                  rating >= star
                    ? "text-[#facc15]"
                    : "text-[#6b7280]"
                }`}
                onClick={() => setRating(star)}
                aria-label={`${star}점`}
              >
                <FaStar size={18} />
              </button>
            ))}
          </div>

          {/* 한 줄 평 입력 */}
          <textarea
            className="box-border h-[75px] w-full resize-y rounded-[7px] border border-[#e5e7eb] bg-white p-3 font-inherit text-xs leading-[1.6] text-[#17191e] outline-none placeholder:text-[#9ca3af] focus:border-[#2563eb]"
            placeholder="영화를 보고 느낀 점을 남겨보세요."
            value={review}
            onChange={(e) =>
              setReview(e.target.value)
            }
          />

          {/* 평점 저장 */}
          <button
            className="mt-[6px] h-[30px] w-full cursor-pointer rounded-md border-0 bg-[#17181c] text-xs font-semibold text-white hover:bg-[#303136]"
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