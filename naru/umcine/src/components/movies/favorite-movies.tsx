import { useQuery } from "@tanstack/react-query";
import { movieDetailQueryOptions } from "../../api/movies/query-options";
import { useFavoritesQuery } from "../../hooks/use-favorites";
import { getTmdbPosterUrl } from "../../utils/tmdb-image";
import MovieCard from "./movie-card";

function FavoriteMovie({ movieId }: { movieId: number }) {
  const query = useQuery(movieDetailQueryOptions(movieId));
  if (!query.data) {
    return query.isError ? (
      <div><p role="alert">영화 정보를 불러오지 못했어요. (ID: {movieId})</p><button type="button" disabled={query.isFetching} onClick={() => void query.refetch()}>다시 시도</button></div>
    ) : <p role="status">영화 정보를 불러오는 중이에요.</p>;
  }
  const movie = query.data;
  return <MovieCard movie={{ id: movie.id, title: movie.title, posterUrl: getTmdbPosterUrl(movie.poster_path), releaseDate: movie.release_date, rating: movie.vote_average }} />;
}

export function FavoriteMovies() {
  const query = useFavoritesQuery();
  if (query.isError) {
    return <div><p role="alert">즐겨찾기를 불러오지 못했어요.</p><button type="button" disabled={query.isFetching} onClick={() => void query.refetch()}>다시 시도</button></div>;
  }
  if (!query.data) return <p role="status">즐겨찾기를 불러오는 중이에요.</p>;
  if (query.data.length === 0) return <p>즐겨찾기한 영화가 없어요.</p>;

  return (
    <div className="grid grid-cols-5 gap-x-[18px] gap-y-5 pb-5 max-[1199px]:grid-cols-3 max-[683px]:grid-cols-2 max-[463px]:grid-cols-1">
      {query.data.map((favorite) => <FavoriteMovie key={favorite.favoriteId} movieId={favorite.movieId} />)}
    </div>
  );
}
