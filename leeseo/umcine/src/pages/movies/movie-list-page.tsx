import { useState, useEffect } from "react";
import MovieGrid from "../../components/movies/movie-grid";
import { getMovies } from "../../api/movies/get-movies";
import type { TmdbMovie } from "../../api/models";

const MovieListPage = () => {

    const [movies, setMovies] = useState<TmdbMovie[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        let ignore = false;
        async function loadMovies() {
            setIsLoading(true);
            setErrorMessage(null);

            try {
            const response = await getMovies({ page: 1 });
            if (!ignore) setMovies(response.results);
            } catch {
            if (!ignore) setErrorMessage("영화 목록을 불러오지 못했어요.");
            } finally {
            if (!ignore) setIsLoading(false);
            }
        }

        loadMovies();

        return () => {
            ignore = true;
        };
    }, []);
    

    if (isLoading) {
        return <div>영화 목록을 불러오는 중이에요.</div>;
    }

    if (errorMessage) {
        return <div>{errorMessage}</div>;
    }

    if (movies.length === 0) {
        return <div>조건에 맞는 결과가 없어요.</div>;
    }

    return <MovieGrid movies={movies} />;
}
export default MovieListPage;