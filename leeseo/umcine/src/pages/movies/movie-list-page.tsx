import { useState } from "react";
import { movies } from "../../data/movies";
import MovieGrid from "../../components/movies/movie-grid";

const MovieListPage = () => {

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
            <MovieGrid 
              movies={movieList}
              onToggleBookmark={handleToggleBookmark}
            />
        </>
    )
}
export default MovieListPage;