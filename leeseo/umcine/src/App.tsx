import { useState } from "react";
import Footer from "./components/footer";
import Header from "./components/header";
import MovieGrid from "./components/movie-grid";
import { movies } from "./types/movies";

export default function App() {

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
      <>
        <Header/>
        <main>
            <MovieGrid 
              movies={movieList}
              onToggleBookmark={handleToggleBookmark}
            />
        </main>
        <Footer/>
      </>
  );
}