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
          <a className="main-navigation__link main-navigation__link--active" href="#movies">영화</a>
          <a className="main-navigation__link" href="#search">검색</a>
          <a className="main-navigation__link" href="#my-info">내 정보</a>
        </nav>
      </div>
      <div className="header-actions">
        <button className="search-button" type="button" aria-label="영화 검색">
          <img src="/icons/search.svg" alt="" />
        </button>
        <button className="login-button" type="button">로그인</button>
      </div>
    </header>
  );
}
