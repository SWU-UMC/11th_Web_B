import { useState, type ReactNode } from "react";
import { movies } from "../data/movies";
import { MovieContext } from "./movie-context";

interface MovieProviderProps {
  children: ReactNode;
}

export const MovieProvider = ({
  children,
}: MovieProviderProps) => {
  const [movieList, setMovieList] = useState(movies);

  const handleToggleBookmark = (id: number) => {
    setMovieList((prevMovies) =>
      prevMovies.map((movie) =>
        movie.id === id
          ? { ...movie, isBookmarked: !movie.isBookmarked }
          : movie
      )
    );
  };

  return (
    <MovieContext.Provider
      value={{ movieList, handleToggleBookmark }}
    >
      {children}
    </MovieContext.Provider>
  );
};