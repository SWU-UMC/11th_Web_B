import { Link, useRouterState } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { getMe } from "../../api/members/me";
import { useAuthStore } from "../../stores/auth-store";
import { cn } from "../../utils/cn";

const navigationLinkClass =
  "text-center text-[14px]! leading-[17px]! font-bold! no-underline";

export default function Header() {
  const accessToken = useAuthStore((state) => state.accessToken);
  const meQuery = useQuery({
    queryKey: ["members", "me"],
    queryFn: getMe,
    enabled: Boolean(accessToken),
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });
  const isMoviesActive = pathname === "/" || pathname.startsWith("/movies/");
  const isSearchActive = pathname === "/search";
  const isProfileActive = pathname === "/mypage" || pathname.startsWith("/mypage/");

  return (
    <header className="flex h-[91px] w-full shrink-0 items-center justify-between border-b border-[#e3e6eb] bg-white px-20 py-6 max-[1199px]:px-10 max-[683px]:h-auto max-[683px]:min-h-[75px] max-[683px]:px-6 max-[683px]:py-4 max-[463px]:px-4">
      <div className="flex items-center gap-[42px]">
        <div className="flex items-center gap-2.5">
          <span
            className="grid size-8 flex-[0_0_32px] place-items-center rounded-lg border-2 border-[#17191e]"
            aria-hidden="true"
          >
            <img className="block size-6" src="/icons/movie.svg" alt="" />
          </span>
          <span className="text-xl leading-6 font-black tracking-[-0.7px] text-[#17191e]">
            UMCine
          </span>
        </div>
        <nav className="flex items-center gap-[30px] max-[683px]:hidden" aria-label="주요 메뉴">
          <Link
            className={cn(
              navigationLinkClass,
              isMoviesActive
                ? "text-[#17191e] underline [text-underline-position:from-font]"
                : "text-[#606774]",
            )}
            to="/"
            aria-current={isMoviesActive ? "page" : undefined}
          >
            영화
          </Link>
          <Link
            className={cn(
              navigationLinkClass,
              isSearchActive
                ? "text-[#17191e] underline [text-underline-position:from-font]"
                : "text-[#606774]",
            )}
            to="/search"
            aria-current={isSearchActive ? "page" : undefined}
          >
            검색
          </Link>
          <Link
            className={cn(navigationLinkClass, isProfileActive
              ? "text-[#17191e] underline [text-underline-position:from-font]"
              : "text-[#606774]")}
            to="/mypage"
            aria-current={isProfileActive ? "page" : undefined}
          >내 정보</Link>
        </nav>
      </div>
      <div className="flex items-center gap-2.5 max-[463px]:gap-2">
        <Link
          className="grid size-[42px] cursor-pointer place-items-center rounded-lg border border-[#e3e6eb] bg-white p-0"
          to="/search"
          aria-label="영화 검색"
        >
          <img className="block size-6" src="/icons/search.svg" alt="" />
        </Link>
        {!accessToken ? <Link
          className="inline-flex h-[42px] w-[71px] cursor-pointer items-center justify-center rounded-lg border! border-solid! border-white! bg-[#2563eb] px-4 py-0 text-[14px] leading-[17px] font-extrabold whitespace-nowrap text-white no-underline"
          to="/login"
        >
          로그인
        </Link> : meQuery.isLoading ? (
          <span className="h-[42px] w-24 animate-pulse rounded-lg bg-gray-200" role="status" aria-label="내 정보 조회 중" />
        ) : (
          <Link
            className="inline-flex h-[42px] cursor-pointer items-center justify-center rounded-lg bg-[#2563eb] px-4 text-sm font-extrabold whitespace-nowrap text-white no-underline"
            to="/mypage"
          >
            마이페이지
          </Link>
        )}
      </div>
    </header>
  );
}
