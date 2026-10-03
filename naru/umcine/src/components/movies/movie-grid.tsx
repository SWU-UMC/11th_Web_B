import type { Movie } from "../../types/movie";
import MovieCard from "./movie-card";

interface MovieGridProps {
  movies: Movie[];
  onToggleBookmark: (movieId: number) => void;
}

export default function MovieGrid({ movies, onToggleBookmark }: MovieGridProps) {
  return (
    <div className="grid h-[657px] w-full min-w-0 flex-[0_0_657px] auto-rows-[319px] grid-cols-[repeat(5,minmax(0,1fr))] content-start gap-x-[18px] gap-y-5 max-[1199px]:h-auto max-[1199px]:flex-none max-[1199px]:auto-rows-auto max-[1199px]:grid-cols-[repeat(3,minmax(200px,1fr))] max-[1199px]:justify-center max-[1199px]:gap-y-6 max-[683px]:grid-cols-[repeat(2,minmax(200px,1fr))] max-[683px]:gap-x-4 max-[683px]:gap-y-5 max-[463px]:grid-cols-[minmax(200px,1fr)]">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} onToggleBookmark={onToggleBookmark} />
      ))}
    </div>
  );
}
