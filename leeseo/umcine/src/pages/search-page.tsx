import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect, useState, type SubmitEvent } from "react";
import { movies } from "../data/movies";
import "../style/texts.css";
import "../style/buttons.css";
import "../App.css"

const SearchPage = () => {
  const { query } = useSearch({ from: "/search" });
  const navigate = useNavigate({ from: "/search" });
  const [searchText, setSearchText] = useState(query ?? "");

  useEffect(() => {
    setSearchText(query ?? "");
  }, [query]);

  const normalizedQuery = query?.trim().toLowerCase() ?? "";
  const searchResults = normalizedQuery
    ? movies.filter(
        (movie) =>
          movie.title.toLowerCase().includes(normalizedQuery) ||
          movie.originalTitle.toLowerCase().includes(normalizedQuery),
      )
    : [];

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextQuery = searchText.trim();
    navigate({
      search: nextQuery ? { query: nextQuery } : {},
    });
  }

  return (
    <div
      id="serachPageGrid"
      className={normalizedQuery ? "hasResults" : "noResults"}
    >
      {/* 검색 제목 + 검색창 */}
      <div id="searchGrid">
        <div id="searchTitle">
          {normalizedQuery ? "영화 검색" : "어떤 영화를 찾고 있나요?"}
        </div>

        <form id="searchForm" onSubmit={handleSubmit}>
          <input
            id="searchInput"
            aria-label="검색어"
            placeholder="예: 스파이더맨"
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
          />

          <button id="searchButton" type="submit">
            {normalizedQuery ? "다시 검색" : "검색"}
          </button>
        </form>
        {!normalizedQuery && (
          <p id="searchGuide">검색어를 입력해 주세요.</p>
        )}
      </div>

      {/* 검색어가 있을 때만 검색 결과 표시 */}
      {normalizedQuery && (
        <div id="searchResults">
          {/* 검색 결과 제목 + 개수 */}
          <div id="searchResultHeader">
            <h2>‘{query}’ 검색 결과</h2>
            <span>영화 {searchResults.length}편 | 페이지 1</span>
          </div>

          {searchResults.length === 0 ? (
            <p>검색 결과가 없어요.</p>
          ) : (
            <ul id="searchResultGrid">
              {searchResults.map((movie) => (
                <li className="searchResultCard" key={movie.id}>
                  <Link
                    to="/movies/$movieId"
                    params={{ movieId: String(movie.id) }}
                    className="searchResultLink"
                  >
                    <img
                      className="searchResultPoster"
                      src={movie.posterPath}
                      alt={`${movie.title} 포스터`}
                    />

                    <div className="searchResultInfo">
                      <h3>{movie.title}</h3>

                      <p className="searchResultMeta">
                        {movie.originalTitle}　{movie.releaseDate}
                      </p>

                      <p className="searchResultOverview">
                        {movie.overview}
                      </p>

                      <span className="searchDetailLink">
                        상세 보기 →
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
export default SearchPage;