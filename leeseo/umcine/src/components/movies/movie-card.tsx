import type { Movie } from "../../types/movie";
import { Link } from "@tanstack/react-router";
import { BookmarkButton } from "../bookmark-button";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({
  movie
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
        <BookmarkButton 
          movieId={movie.id}
          hasText={false}
        />
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