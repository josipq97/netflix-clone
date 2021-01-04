import React, {useEffect, useState} from 'react';
import YouTube from 'react-youtube';
import axios from './axios';
import "./Row.css";
import getTrailerURL from "./ytTrailer";

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");
    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            autoplay: 1,
        }
    }
    const handleClick = (movie) => {
        if(trailerUrl) {
            setTrailerUrl("");
        } else {
            getTrailerURL(movie)
            .then(videos => setTrailerUrl(videos.items[0].id.videoId));
        }
    }
    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl); 
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    }, [fetchUrl]);

    return(
        <div className="row">
            <h2>{title}</h2>
            
            <div className="row__posters">
                {movies.map(movie => (
                    <img
                        key={movie.id} 
                        onClick={() => handleClick(movie.name ? movie.name : movie.title)}
                        className={`row__poster ${isLargeRow && "row__posterLarge"}`} 
                        src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} 
                        alt={movie.name} 
                    />
                ))}
            </div>
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts}/>}
        </div>
    )
}

export default Row;

// 2:44