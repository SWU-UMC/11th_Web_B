import type { Movie } from "../types/movie";
import MovieCard from "./movie-card";
import "../App.css";
import "../style/texts.css"

interface MovieGridProps {
    movies: Movie[];
    onToggleBookmark: (id: number) => void;
}

const MovieGrid = ({ movies, onToggleBookmark }: MovieGridProps) => {

    return (
        <>
            <div className="container">
                <div id="movieListTitleGrid">
                <div id="movieListTitleText">영화 목록</div>
                </div>
                <div id="movieGrid">
                    {movies.map((movie) => (
                        <MovieCard 
                            movie={movie}
                            onToggleBookmark={onToggleBookmark}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}

export default MovieGrid;