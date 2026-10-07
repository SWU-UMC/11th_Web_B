import { Link, useParams } from "@tanstack/react-router";
import { movies } from "../../data/movies";

export function MovieDetailPage() {
  const { movieId } = useParams({ from: "/movies/$movieId" });
  const movie = movies.find(({ id }) => id === Number(movieId));

  if (!movie) {
    return (
      <main className="grid w-full flex-1 content-center justify-items-center gap-4 px-6 py-20">
        <p className="m-0 text-2xl leading-8 font-bold text-[#17191e]">
          영화를 찾을 수 없어요.
        </p>
        <Link className="text-sm leading-5 font-bold text-[#2563eb]" to="/">
          영화 목록으로 돌아가기
        </Link>
      </main>
    );
  }

  return (
    <>
      <main className="w-full flex-[1_0_auto]">
        <section className="relative h-[360px] w-full overflow-hidden bg-[#17191e] text-white max-[683px]:h-80 max-[463px]:h-[300px]">
          <img
            className="absolute inset-0 block size-full object-cover object-center"
            src={movie.backdropPath}
            alt=""
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,12,16,0.76)_0%,rgba(10,12,16,0.5)_42%,rgba(10,12,16,0.1)_76%)]"
            aria-hidden="true"
          />
          <div className="relative z-10 flex size-full flex-col justify-between px-20 py-6 max-[1199px]:px-10 max-[683px]:px-6 max-[683px]:py-5 max-[463px]:px-4">
            <Link
              className="flex w-fit items-center gap-1 text-[13px] leading-4 font-bold text-inherit no-underline"
              to="/"
            >
              <img className="block size-6 invert" src="/icons/chevron-left.svg" alt="" />
              영화 목록
            </Link>

            <div className="flex w-full max-w-[800px] flex-col gap-2">
              <h1 className="m-0 text-[46px] leading-[49.68px] font-bold tracking-[-2.3px] max-[683px]:text-4xl max-[683px]:leading-[42px] max-[683px]:tracking-[-1.2px] max-[463px]:text-[30px] max-[463px]:leading-9 max-[463px]:tracking-[-0.8px]">
                {movie.title}
              </h1>
              <p className="m-0 text-sm leading-[17px] font-normal">{movie.originalTitle}</p>
              <div className="flex items-center gap-2 text-[13px] leading-4 font-bold max-[683px]:flex-wrap">
                <span>{movie.releaseDate}</span>
                <span>{movie.genres.join(" · ")}</span>
                <span>{movie.runtime}</span>
              </div>
            </div>
          </div>
        </section>

        <section className="flex w-full items-start gap-8 px-20 pt-6 pb-40 max-[1199px]:flex-wrap max-[1199px]:px-10 max-[1199px]:pb-[120px] max-[683px]:gap-6 max-[683px]:px-6 max-[683px]:pb-24 max-[463px]:flex-col max-[463px]:px-4 max-[463px]:pb-20">
          <img
            className="block h-[286px] w-[200px] flex-[0_0_200px] overflow-hidden rounded-[10px] bg-[#f6f7f9] object-cover shadow-[0_12px_30px_rgba(12,15,20,0.12)] max-[683px]:h-[229px] max-[683px]:w-40 max-[683px]:basis-40 max-[463px]:h-[286px] max-[463px]:w-[200px] max-[463px]:basis-auto max-[463px]:self-center"
            src={movie.posterPath}
            alt={`${movie.title} 포스터`}
          />
          <div className="flex min-w-0 flex-1 flex-col gap-3">
            <h2 className="m-0 text-[21px] leading-[26px] font-bold tracking-[-0.63px] text-[#17191e]">
              {movie.tagline}
            </h2>
            <p className="m-0 text-sm leading-6 font-normal text-[#606774]">{movie.overview}</p>
            <button
              className="inline-flex h-[42px] w-fit cursor-pointer items-center justify-center gap-2 rounded-lg border! border-solid! border-white! bg-[#2563eb] px-4 text-[14px]! leading-[17px]! font-extrabold! whitespace-nowrap text-white"
              type="button"
            >
              <img
                className="block size-4 invert"
                src="/icons/bookmark-outline.svg"
                alt=""
              />
              즐겨찾기
            </button>
          </div>

          <aside className="flex w-[360px] flex-[0_0_360px] flex-col items-start gap-2 border-l border-[#e3e6eb] pt-0 pr-0 pb-[41px] pl-[30px] max-[1199px]:w-full max-[1199px]:basis-full max-[1199px]:border-t max-[1199px]:border-l-0 max-[1199px]:px-0 max-[1199px]:pt-6 max-[1199px]:pb-0">
            <h2 className="m-0 w-full text-[21px] leading-[26px] font-bold tracking-[-0.63px] text-[#17191e]">
              내 평점
            </h2>
            <p className="m-0 w-full text-xs leading-[14px] font-normal text-[#969da8]">
              별점은 필수, 후기는 선택이에요.
            </p>
            <div className="flex w-full items-start gap-1" aria-label="영화 별점">
              {[1, 2, 3, 4, 5].map((score) => (
                <span
                  className="grid size-[38px] flex-[0_0_38px] place-items-center rounded-lg border border-[#e3e6eb] bg-white"
                  key={score}
                  aria-label={`${score}점`}
                >
                  <img className="block size-6" src="/icons/star-outline.svg" alt="" />
                </span>
              ))}
            </div>
            <textarea
              className="h-[102px] w-full resize-none rounded-lg border border-[#e3e6eb] bg-white px-3 pt-4 pb-[18px] font-[inherit] text-[13px] leading-[19.5px] font-normal text-[#17191e] outline-none placeholder:text-[#969da8] placeholder:opacity-100"
              aria-label="영화 후기"
              placeholder="영화를 보고 느낀 점을 남겨보세요."
              readOnly
            />
            <button
              className="inline-flex h-[42px] w-full items-center justify-center rounded-lg border! border-solid! border-white! bg-[#17191e] px-4 text-sm leading-[17px] font-extrabold text-white opacity-100"
              type="button"
              disabled
            >
              평점 저장
            </button>
          </aside>
        </section>
      </main>

      <footer className="flex h-[57px] w-full flex-[0_0_auto] items-center justify-end gap-2 border-t border-[#e3e6eb] bg-white px-20 py-4 text-xs leading-[14px] font-normal text-[#606774] max-[1199px]:h-auto max-[1199px]:min-h-[57px] max-[1199px]:px-10 max-[683px]:px-6 max-[463px]:items-start max-[463px]:px-4 max-[463px]:py-3.5">
        <img className="block size-6" src="/images/logos/tmdb-logo.svg" alt="TMDB" />
        <p className="m-0 whitespace-nowrap max-[463px]:whitespace-normal">
          This product uses the TMDB API but is not endorsed or certified by{" "}
          <a
            className="text-inherit underline [text-underline-position:from-font]"
            href="https://www.themoviedb.org/?language=ko"
            target="_blank"
            rel="noreferrer"
          >
            TMDB
          </a>
          .
        </p>
      </footer>
    </>
  );
}
