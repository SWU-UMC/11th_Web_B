import MovieGrid from "../../components/movies/movie-grid";
import { useMovies } from "../../contexts/use-movies";

const MovieListPage = () => {

    const { movieList, handleToggleBookmark } = useMovies();

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