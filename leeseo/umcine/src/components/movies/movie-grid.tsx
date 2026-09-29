import type { Movie } from "../../types/movie";
import MovieCard from "./movie-card";

interface MovieGridProps {
  movies: Movie[];
  onToggleBookmark: (id: number) => void;
}

const MovieGrid = ({
  movies,
  onToggleBookmark,
}: MovieGridProps) => {
  return (
    <div className="mx-auto box-border w-full max-w-[1440px] px-20 py-6 max-md:px-10 max-[480px]:px-5">
      {/* 영화 목록 제목 */}
      <div className="mx-auto my-5 w-full max-w-[1280px]">
        <div className="font-[Pretendard] text-[38px] font-bold leading-[44px] tracking-[-1.71px] text-[#17191E]">
          영화 목록
        </div>
      </div>

      {/* 영화 카드 목록 */}
      <div className="mx-auto grid w-full max-w-[1280px] grid-cols-[repeat(5,241.6px)] gap-5 max-[1300px]:grid-cols-[repeat(4,241.6px)] max-[1000px]:grid-cols-[repeat(3,241.6px)] max-[768px]:grid-cols-[repeat(2,241.6px)] max-[480px]:grid-cols-[241.6px]">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onToggleBookmark={onToggleBookmark}
          />
        ))}
      </div>
    </div>
  );
};

export default MovieGrid;