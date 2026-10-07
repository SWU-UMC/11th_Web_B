import { useEffect, useState, type ReactNode } from "react";
import { movies } from "../data/movies";
import { MovieContext } from "./movie-context";
import { readBookmarkIds, saveBookmarkIds } from "../utils/bookmark-storage";


interface MovieProviderProps {
  children: ReactNode;
}

export const MovieProvider = ({ children }: MovieProviderProps) => {
  const [movieList, setMovieList] = useState(() => {
    const bookmarkIds = readBookmarkIds();

    return movies.map((movie) => ({
      ...movie,
      isBookmarked: bookmarkIds.includes(movie.id),
    }));
  });

  const handleToggleBookmark = (id: number) => {
    setMovieList((prevMovies) =>
      prevMovies.map((movie) =>
        movie.id === id
          ? { ...movie, isBookmarked: !movie.isBookmarked }
          : movie
      )
    );
  };

  useEffect(() => {
    const bookmarkIds = movieList
      .filter((movie) => movie.isBookmarked)
      .map((movie) => movie.id);

    saveBookmarkIds(bookmarkIds);
  }, [movieList]);

  return (
    <MovieContext.Provider
      value={{ movieList, handleToggleBookmark }}
    >
      {children}
    </MovieContext.Provider>
  );
};
