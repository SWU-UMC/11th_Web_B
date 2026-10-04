import { Link } from "@tanstack/react-router";
import type { Movie } from "../../types/movie";
import { cn } from "../../utils/cn";

interface MovieCardProps {
  movie: Movie;
  onToggleBookmark: (movieId: number) => void;
}

export default function MovieCard({
  movie,
  onToggleBookmark,
}: MovieCardProps) {
  return (
    <article className="flex h-[318px] w-full flex-col items-start gap-1 max-[1199px]:h-auto">
      <div className="relative h-[274px] w-full flex-[0_0_274px] overflow-hidden rounded-[10px] bg-[#f6f7f9] max-[1199px]:h-auto max-[1199px]:flex-none max-[1199px]:aspect-[121/137]">
        <Link
          className="block h-full w-full"
          to="/movies/$movieId"
          params={{ movieId: String(movie.id) }}
        >
          <img
            className="block h-full w-full object-cover object-center"
            src={movie.posterPath}
            alt={`${movie.title} 포스터`}
          />
        </Link>
        <button
          className={cn(
            "absolute top-2.5 right-2.5 grid size-[34px] cursor-pointer place-items-center rounded-lg border! border-solid! p-0",
            movie.isBookmarked
              ? "border-[#2563eb]! bg-[#2563eb]"
              : "border-white! bg-[#17191e]",
          )}
          type="button"
          aria-label={`${movie.title} ${movie.isBookmarked ? "북마크 해제" : "북마크 추가"}`}
          aria-pressed={movie.isBookmarked}
          onClick={() => onToggleBookmark(movie.id)}
        >
          <img
            className="block size-6 invert"
            src={movie.isBookmarked ? "/icons/bookmark.svg" : "/icons/bookmark-outline.svg"}
            alt=""
          />
        </button>
      </div>
      <div className="h-[22px] w-full flex-[0_0_22px] overflow-hidden pt-[5px]">
        <h2 className="m-0 overflow-hidden text-ellipsis whitespace-nowrap text-[14px] leading-[17px] font-extrabold text-[#17191e]">
          <Link
            className="block text-inherit no-underline"
            to="/movies/$movieId"
            params={{ movieId: String(movie.id) }}
          >
            {movie.title}
          </Link>
        </h2>
      </div>
      <div className="h-[14px] w-full flex-[0_0_14px]">
        <p className="m-0 text-xs leading-[14px] font-normal text-[#969da8]">
          {movie.releaseDate}
        </p>
      </div>
    </article>
  );
}
