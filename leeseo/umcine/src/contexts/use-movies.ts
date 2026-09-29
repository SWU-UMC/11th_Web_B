import { useContext } from "react";
import { MovieContext } from "./movie-context";

export const useMovies = () => {
  const context = useContext(MovieContext);

  if (!context) {
    throw new Error(
      "useMovies는 MovieProvider 안에서 사용해야 합니다."
    );
  }

  return context;
};