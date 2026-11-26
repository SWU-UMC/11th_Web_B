import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import MovieGrid from "../../components/movies/movie-grid";
import { getMovies } from "../../api/movies/get-movies";
import Footer from "../../components/layout/footer";
import Pagination from "../../components/movies/pagination";

export function MovieListPage() {
  const [page, setPage] = useState(1);

  const moviesQuery = useQuery({
    queryKey: ["movies", "list", { page }],
    queryFn: () => getMovies({ page }),
    staleTime: 30 * 1000,
  });

  const movies = moviesQuery.data?.results ?? [];
  const totalPages = moviesQuery.data?.total_pages ?? 0;

  const handlePageChange = (nextPage: number) => {
    setPage(nextPage);
  };

  if (moviesQuery.isPending) {
    return <div>영화 목록을 불러오는 중이에요.</div>;
  }

  if (moviesQuery.isError) {
    return <div>{moviesQuery.error.message}</div>;
  }

  if (movies.length === 0) {
    return <div>조건에 맞는 결과가 없어요.</div>;
  }

  return (
    <>
      <MovieGrid movies={movies} />

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      <Footer />
    </>
  );
}

export default MovieListPage;