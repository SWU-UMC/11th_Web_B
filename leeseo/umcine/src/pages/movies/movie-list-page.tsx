import MovieGrid from "../../components/movies/movie-grid";
import { useMovies } from "../../contexts/use-movies";

const MovieListPage = () => {

    const { movieList } = useMovies();
    

    return (
        <>
            <MovieGrid 
              movies={movieList}
            />
        </>
    )
}
export default MovieListPage;