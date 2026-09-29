import { IoMdSearch } from "react-icons/io";
import { Link } from "@tanstack/react-router";

const Header = () => {
  return (
    <header className="h-[91px] px-[80px] py-6 flex items-center justify-between">
      <div className="flex items-center gap-[24px]">
        {/* 로고 */}
        <Link to="/" className="flex items-center gap-[8px] mr-[16px]">
          <img
            src="/icons/movie.svg"
            alt="UMCine"
            className="w-[32px] h-[32px]"
          />
          <div className="text-[24px] font-bold leading-[29px] text-[#1A1D24]">
            UMCine
          </div>
        </Link>

        {/* 메뉴 */}
        <Link
          to="/"
          className="text-[16px] font-medium leading-[24px] text-[#1A1D24]"
        >
          영화
        </Link>

        <Link
          to="/search"
          className="text-[16px] font-medium leading-[24px] text-[#1A1D24]"
        >
          검색
        </Link>

        <button
          type="button"
          className="text-[16px] font-medium leading-[24px] text-[#1A1D24]"
        >
          내 정보
        </button>
      </div>

      {/* 오른쪽 */}
      <div className="flex items-center gap-[16px]">
        <button
          type="button"
          className="flex w-[40px] h-[40px] items-center justify-center"
        >
          <IoMdSearch size={24} color="#606774" />
        </button>

        <button
          type="button"
          className="h-[40px] px-[20px] rounded-[8px] bg-[#3B82F6] text-[16px] font-medium leading-[24px] text-white"
        >
          마이페이지
        </button>
      </div>
    </header>
  );
};

export default Header;