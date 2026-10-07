import { useBookmarkStore } from "../stores/bookmark-store";
import { FaRegBookmark, FaBookmark } from "react-icons/fa6";

interface BookmarkButtonProps {
  movieId: number;
  hasText: boolean;
  className?: string;
}

export function BookmarkButton({ movieId, hasText, className }: BookmarkButtonProps) {
  const isBookmarked = useBookmarkStore((state) =>
    state.bookmarkedMovieIds.includes(movieId),
  );

  const toggleBookmark = useBookmarkStore(
    (state) => state.toggleBookmark,
  );

  return (
    <button
      type="button"
      className={ className ? className : `absolute right-2 top-2 flex h-[34px] w-[34px] items-center justify-center rounded-lg border border-white ${
        isBookmarked
          ? "border-0 bg-[#2563EB]"
          : "bg-[#17191E]"
      }`}
      onClick={() => toggleBookmark(movieId)}
      aria-label={
        isBookmarked
          ? "즐겨찾기 해제"
          : "즐겨찾기 추가"
      }
    >
      {isBookmarked ? (
        <FaBookmark size={14} color="#FFFFFF" />
      ) : (
        <FaRegBookmark size={14} color="#FFFFFF" />
      )}

      {
        hasText ? "즐겨찾기" : null
      }
    </button>
  );
}