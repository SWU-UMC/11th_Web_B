import MovieCard from "./movie-card";
import { movies } from "../types/movies";
import "../App.css";
import "../style/texts.css"

const MovieGrid = () => {

    return (
        <>
            <div className="container">
                <div id="movieListTitleGrid">
                <div id="movieListTitleText">영화 목록</div>
                </div>
                <div id="movieGrid">
                    {movies.map((movie) => (
                        <MovieCard movie={movie}/>
                    ))}
                </div>
            </div>
        </>
    )
}

export default MovieGrid;