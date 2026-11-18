import { Link } from "@tanstack/react-router";
import Pagination from "../../components/movies/pagination";
import { useMeQuery } from "../../hooks/use-me-query";
import { useAuthStore } from "../../stores/auth-store";

const SAMPLE_FAVORITES = [
  { title: "스파이더맨: 브랜드 뉴 데이", date: "2026.07.29", poster: "/images/profile/spider-man.png" },
  { title: "오디세이", date: "2026.08.05", poster: "/images/profile/odyssey.png" },
  { title: "미니언즈 & 몬스터즈", date: "2026.07.15", poster: "/images/profile/minions.png" },
];

export function ProfilePage() {
  const accessToken = useAuthStore((state) => state.accessToken);
  const meQuery = useMeQuery();
  const profile = accessToken ? meQuery.data : undefined;

  if (!accessToken) {
    return <main className="px-6 py-10"><p role="alert">로그인이 필요해요.</p></main>;
  }
  if (!profile) {
    return (
      <main className="px-6 py-10">
        {meQuery.isError ? <><p role="alert">내 정보를 불러오지 못했어요.</p><button type="button" disabled={meQuery.isFetching} onClick={() => void meQuery.refetch()}>다시 시도</button></> : <p role="status">내 정보를 불러오는 중이에요.</p>}
      </main>
    );
  }

  return (
    <>
      <main className="flex w-full flex-1 flex-col gap-7 px-20 py-6 max-[1199px]:px-10 max-[683px]:px-6 max-[463px]:px-4">
        <div className="flex items-center justify-between gap-4">
          <h1 className="m-0 text-[31px] leading-[37px] font-bold tracking-[-1.24px]">내 정보</h1>
          <Link className="inline-flex h-[42px] shrink-0 items-center justify-center rounded-lg border border-white bg-[#2563eb] px-4 text-sm font-extrabold text-white no-underline" to="/mypage/edit">정보 수정</Link>
        </div>

        <section className="flex flex-col gap-4 border-y border-[#e3e6eb] py-3" aria-labelledby="profile-info-title">
          <h2 className="m-0 text-[17px] leading-5 font-bold" id="profile-info-title">기본 정보</h2>
          <div className="flex items-center gap-7 max-[463px]:items-start">
            <span className="grid size-[82px] shrink-0 place-items-center overflow-hidden rounded-full bg-[#e3e6eb]">
              <img className="block" src="/icons/profile-person.svg" alt="기본 프로필" />
            </span>
            <dl className="m-0 flex w-full max-w-[760px] gap-7 max-[683px]:flex-col max-[683px]:gap-4">
              <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                <dt className="text-[11px] leading-[13px] text-[#969da8]">닉네임</dt>
                <dd className="m-0 break-words text-sm leading-[17px] font-bold">{profile.nickname}</dd>
              </div>
              <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                <dt className="text-[11px] leading-[13px] text-[#969da8]">이메일</dt>
                <dd className="m-0 break-all text-sm leading-[17px] font-bold">{profile.email}</dd>
              </div>
            </dl>
          </div>
        </section>

        <section className="flex flex-col gap-4" aria-labelledby="profile-favorites-title">
          <h2 className="m-0 text-[17px] leading-5 font-bold" id="profile-favorites-title">내 즐겨찾기</h2>
          <div className="grid grid-cols-5 gap-x-[18px] gap-y-5 pb-5 max-[1199px]:grid-cols-3 max-[683px]:grid-cols-2 max-[463px]:grid-cols-1">
            {SAMPLE_FAVORITES.map((movie) => (
              <article className="flex min-w-0 flex-col gap-1" key={movie.title}>
                <img className="h-[274px] w-full rounded-[10px] object-cover max-[1199px]:h-auto max-[1199px]:aspect-[121/137]" src={movie.poster} alt={`${movie.title} 포스터`} />
                <h3 className="m-0 truncate pt-[5px] text-sm leading-[17px] font-extrabold">{movie.title}</h3>
                <p className="m-0 text-xs leading-[14px] text-[#969da8]">{movie.date}</p>
              </article>
            ))}
          </div>
          <div className="[&>nav]:mt-0">
            <Pagination currentPage={1} totalPages={1} onPageChange={() => {}} />
          </div>
        </section>
      </main>
      <footer className="flex min-h-[57px] items-center justify-end gap-2 border-t border-[#e3e6eb] bg-white px-20 py-4 text-xs leading-[14px] text-[#606774] max-[1199px]:px-10 max-[683px]:px-6 max-[463px]:px-4">
        <img className="block size-6 shrink-0" src="/images/logos/tmdb-logo.svg" alt="TMDB" />
        <p className="m-0">This product uses the TMDB API but is not endorsed or certified by <a className="text-inherit underline" href="https://www.themoviedb.org/?language=ko" target="_blank" rel="noreferrer">TMDB</a>.</p>
      </footer>
    </>
  );
}
