import "../App.css";
import "../style/buttons.css"
import "../style/texts.css"
import movie from "../../public/icons/movie.svg"
import { IoMdSearch } from "react-icons/io";

const Header = () => {
    return (
        <>
            <div className="headerGrid">
                <div id="headerLeft">
                    <img src={movie}/>
                    <div id="logoText">UMCine</div>
                    <button className="textButton">영화</button>
                    <button className="textButton">검색</button>
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