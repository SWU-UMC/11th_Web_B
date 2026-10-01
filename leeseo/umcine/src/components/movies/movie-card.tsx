import type { Movie } from "../../types/movie";
import { FaRegBookmark, FaBookmark } from "react-icons/fa6";
import { Link } from "@tanstack/react-router";

interface MovieCardProps {
  movie: Movie;
  onToggleBookmark: (id: number) => void;
}

const MovieCard = ({
  movie,
  onToggleBookmark,
}: MovieCardProps) => {
  return (
    <div className="flex h-[318px] w-[241.6px] flex-col gap-1">
      {/* 포스터 + 즐겨찾기 버튼 */}
      <div className="relative h-[274px] w-[241.6px]">
        <Link
          to="/movies/$movieId"
          params={{ movieId: String(movie.id) }}
        >
          <img
            src={movie.posterPath}
            alt={`${movie.title} 포스터`}
            className="h-[274px] w-[241.6px] rounded-[10px]"
          />
        </Link>

        {/* 즐겨찾기 버튼 */}
        <button
          className={`absolute right-2 top-2 flex h-[34px] w-[34px] items-center justify-center rounded-lg border border-white ${
            movie.isBookmarked
              ? "border-0 bg-[#2563EB]"
              : "bg-[#17191E]"
          }`}
          onClick={() => onToggleBookmark(movie.id)}
          aria-label={
            movie.isBookmarked
              ? "즐겨찾기 해제"
              : "즐겨찾기 추가"
          }
        >
          {movie.isBookmarked ? (
            <FaBookmark size={14} color="#FFFFFF" />
          ) : (
            <FaRegBookmark size={14} color="#FFFFFF" />
          )}
        </button>
      </div>

      {/* 영화 제목 */}
      <div className="flex items-center justify-start font-[Pretendard] text-sm font-extrabold leading-none tracking-normal text-[#17191E]">
        {movie.title}
      </div>

      {/* 개봉일 */}
      <div className="flex items-center justify-start font-[Pretendard] text-xs font-normal leading-none tracking-normal text-[#969DA8]">
        {movie.releaseDate}
      </div>
    </div>
  );
};

export default MovieCard;