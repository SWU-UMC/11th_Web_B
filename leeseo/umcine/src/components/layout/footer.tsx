import tmdbLogo from "../../../public/images/logos/tmdb-logo.svg";

const Footer = () => {
  return (
    <div className="box-border flex h-[57px] w-full shrink-0 items-center justify-end border border-[#E3E6EB] bg-white px-20 py-4 max-md:px-5">
      <div className="flex items-center justify-end gap-[10px] bg-white">
        <img
          src={tmdbLogo}
          alt="TMDB"
          className="h-6 w-6"
        />

        <div className="h-[14px] font-['Pretendard_Variable'] text-xs font-normal leading-none tracking-normal text-[#606774]">
          This product uses the TMDB API but is not endorsed or certified by{" "}
          <a
            href="https://www.themoviedb.org/"
            className="text-[#606774]"
          >
            TMDB
          </a>
          .
        </div>
      </div>
    </div>
  );
};

export default Footer;