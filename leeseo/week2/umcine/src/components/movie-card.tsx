import { useState } from "react";
import type { Movie } from "../types/movie";
import { FaRegBookmark } from "react-icons/fa6";
import "../App.css";
import "../style/buttons.css"
import "../style/texts.css"
import "../style/images.css"

interface MovieCardProps {
    movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
    const [selected, setSeleted] = useState(false);

    const handleBookmark = () => {
        setSeleted(!selected);
    }

    return (
        <>
            <div id="movieCardGrid">
                <div id="posterBoomarkGrid">
                    <img id="posterImage" src={movie.posterPath}/>
                    <button 
                        id="bookmarkButton" 
                        className={selected ? "selected" : ""}
                        onClick={handleBookmark}
                    >
                        <FaRegBookmark size={14} color= {selected ? "#17191E" : "#FFFFFF"}/>
                    </button>    
                </div>
                <div id="movieTitleText" className="movieCardTextGrid">{movie.title}</div>
                <div id="releaseDateText" className="movieCardTextGrid">{movie.releaseDate}</div>
            </div>
        </>
    )
}

export default MovieCard;