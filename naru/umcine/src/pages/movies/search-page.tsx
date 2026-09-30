import { useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect, useState, type SubmitEvent } from "react";
import { movies } from "../../data/movies";

export function SearchPage() {
  const { query } = useSearch({ from: "/search" });
  const navigate = useNavigate({ from: "/search" });
  const [searchInput, setSearchInput] = useState(query ?? "");

  useEffect(() => {
    let isCurrent = true;

    queueMicrotask(() => {
      if (isCurrent) {
        setSearchInput(query ?? "");
      }
    });

    return () => {
      isCurrent = false;
    };
  }, [query]);

  const displayQuery = query?.trim() ?? "";
  const normalizedQuery = displayQuery.toLowerCase();
  const searchResults = normalizedQuery
    ? movies.filter(
        (movie) =>
          movie.title.toLowerCase().includes(normalizedQuery) ||
          movie.originalTitle.toLowerCase().includes(normalizedQuery),
      )
    : [];

  function updateSearch(queryValue: string) {
    const trimmedQuery = queryValue.trim();

    void navigate({
      to: "/search",
      search: trimmedQuery ? { query: trimmedQuery } : {},
    });
  }

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    updateSearch(searchInput);
  }

  function handleClear() {
    setSearchInput("");
    updateSearch("");
  }

  if (!displayQuery) {
    return (
      <main className="search-empty-page">
        <div className="search-empty-page__inner">
          <h1>어떤 영화를 찾고 있나요?</h1>
          <SearchForm
            value={searchInput}
            onChange={setSearchInput}
            onSubmit={handleSubmit}
            variant="empty"
          />
        </div>
      </main>
    );
  }

  return (
    <>
      <main className="search-results-page">
        <div className="search-results-head">
          <h1>영화 검색</h1>
          <SearchForm
            value={searchInput}
            onChange={setSearchInput}
            onSubmit={handleSubmit}
            onClear={handleClear}
            variant="results"
          />
        </div>

        <div className="search-results-toolbar">
          <h2>‘{displayQuery}’ 검색 결과</h2>
          <span>영화 {searchResults.length}편 · 1페이지</span>
        </div>

        {searchResults.length > 0 ? (
          <div className="search-results-list">
            {searchResults.map((movie) => (
              <article className="search-result-card" key={movie.id}>
                <img
                  className="search-result-card__poster"
                  src={movie.posterPath}
                  alt={`${movie.title} 포스터`}
                />
                <div className="search-result-card__content">
                  <h3>{movie.title}</h3>
                  <div className="search-result-card__meta">
                    <span>{movie.originalTitle}</span>
                    <span>{movie.releaseDate}</span>
                  </div>
                  <p>{movie.overview}</p>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="search-results-empty">검색 결과가 없어요.</p>
        )}
      </main>

      <footer className="site-footer">
        <img className="site-footer__logo" src="/images/logos/tmdb-logo.svg" alt="TMDB" />
        <p>
          This product uses the TMDB API but is not endorsed or certified by{" "}
          <a href="https://www.themoviedb.org/?language=ko" target="_blank" rel="noreferrer">
            TMDB
          </a>
          .
        </p>
      </footer>
    </>
  );
}

interface SearchFormProps {
  value: string;
  variant: "empty" | "results";
  onChange: (value: string) => void;
  onSubmit: (event: SubmitEvent<HTMLFormElement>) => void;
  onClear?: () => void;
}

function SearchForm({ value, variant, onChange, onSubmit, onClear }: SearchFormProps) {
  const isResultsForm = variant === "results";

  return (
    <form className={`movie-search-form movie-search-form--${variant}`} onSubmit={onSubmit}>
      <img className="movie-search-form__icon" src="/icons/search.svg" alt="" />
      <input
        aria-label="영화 제목"
        autoFocus={!isResultsForm}
        placeholder="예: 스파이더맨"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
      {isResultsForm && value && onClear ? (
        <button
          className="movie-search-form__clear"
          type="button"
          aria-label="검색어 지우기"
          onClick={onClear}
        >
          <img src="/icons/close.svg" alt="" />
        </button>
      ) : null}
      <button className="movie-search-form__submit" type="submit">
        {isResultsForm ? "다시 검색" : "검색"}
      </button>
    </form>
  );
}
