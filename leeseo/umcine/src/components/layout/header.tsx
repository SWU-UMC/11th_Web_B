import "../../App.css";
import "../../style/buttons.css"
import "../../style/texts.css"
import "../../style/images.css"
import { IoMdSearch } from "react-icons/io";
import { Link } from "@tanstack/react-router";

const Header = () => {
    return (
        <>
            <div className="headerGrid">
                <div id="headerLeft">
                    <div id="logoGrid">
                        <img id="logoImage" src="/icons/movie.svg" />
                        <div id="logoText">UMCine</div>
                    </div>
                    <Link to="/" className="textButton">영화</Link>
                    <Link to="/search" className="textButton">검색</Link>
                    <button className="textButton">내 정보</button>
                </div>
                <div id="headerRight">
                    <button id="searchImageButton">
                        <IoMdSearch size={24} color="#606774" />
                    </button>
                    <button id="blueButton">마이페이지</button>
                </div>
            </div>
        </>
    )
}

export default Header;