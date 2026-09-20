import MovieCard from "./movie-card";
import { movies } from "../types/movies";

const MovieGrid = () => {

    return (
        <>
            <div id="movieGrid">
                {movies.map((movie) => (
                    <MovieCard movie={movie}/>
                ))}
            </div>
        </>
    )
}

export default MovieGrid;