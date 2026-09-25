import "../App.css";
import "../style/texts.css"
import "../style/images.css"
import tmdbLogo from "../../public/images/logos/tmdb-logo.svg";

const Footer = () => {
    return (
        <>
            <div className="footerGrid">
                <div id="tmdbGrid">
                    <img id="tmdbImage" src={tmdbLogo}/>
                    <div id="tmdbText">
                        This product uses the TMDB API but is not endorsed or certified by{" "}
                        <a id="linkText" href="https://www.themoviedb.org/">TMDB</a>
                        .
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer;