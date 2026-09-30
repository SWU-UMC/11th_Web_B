import { Link } from "@tanstack/react-router";

export default function Header() {
  return (
    <header className="site-header">
      <div className="header-brand-row">
        <div className="brand">
          <span className="brand__mark" aria-hidden="true">
            <img src="/icons/movie.svg" alt="" />
          </span>
          <span className="brand__name">UMCine</span>
        </div>
        <nav className="main-navigation" aria-label="주요 메뉴">
          <Link
            className="main-navigation__link"
            activeProps={{ className: "main-navigation__link--active" }}
            activeOptions={{ exact: true }}
            to="/"
          >
            영화
          </Link>
          <Link
            className="main-navigation__link"
            activeProps={{ className: "main-navigation__link--active" }}
            to="/search"
          >
            검색
          </Link>
          <span className="main-navigation__link">내 정보</span>
        </nav>
      </div>
      <div className="header-actions">
        <Link className="search-button" to="/search" aria-label="영화 검색">
          <img src="/icons/search.svg" alt="" />
        </Link>
        <button className="login-button" type="button">로그인</button>
      </div>
    </header>
  );
}
