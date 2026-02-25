import React, { useState, useEffect } from 'react';
import axios from '../../utils/axios';
import './Row.css';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';
// Import a Close icon from Material UI
import CloseIcon from '@mui/icons-material/Close';

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    }, [fetchUrl]);

    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            autoplay: 1,
            origin: window.location.origin,
        },
    };

    const handleClick = (movie) => {
        if (trailerUrl) {
            setTrailerUrl("");
        } else {
            movieTrailer(movie?.title || movie?.name || movie?.original_name || "")
                .then((url) => {
                    const urlParams = new URLSearchParams(new URL(url).search);
                    setTrailerUrl(urlParams.get("v"));
                })
                .catch((error) => console.log("Trailer not found", error));
        }
    };

    return (
        <div className="row">
            <h1>{title}</h1>
            <div className="row__posters">
                {movies?.map((movie) => (
                    ((isLargeRow && movie.poster_path) || (!isLargeRow && movie.backdrop_path)) && (
                        <img
                            key={movie.id}
                            onClick={() => handleClick(movie)}
                            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                            src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                            alt={movie.name}
                        />
                    )
                ))}
            </div>
            
            {/* Logic for the Trailer and Close Button */}
            {trailerUrl && (
                <div className="row__youtubeWrapper">
                    <div className="row__closeButton" onClick={() => setTrailerUrl("")}>
                        <CloseIcon /> <span>Close Trailer</span>
                    </div>
                    <YouTube videoId={trailerUrl} opts={opts} />
                </div>
            )}
        </div>
    );
}

export default Row;