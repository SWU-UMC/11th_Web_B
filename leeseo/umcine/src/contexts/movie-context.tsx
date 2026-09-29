import { createContext } from "react";
import type { Movie } from "../types/movie";

interface MovieContextType {
  movieList: Movie[];
  handleToggleBookmark: (id: number) => void;
}

export const MovieContext =
  createContext<MovieContextType | null>(null);