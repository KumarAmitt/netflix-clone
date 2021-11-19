import React, {useEffect, useState} from 'react';
import axios from '../api/axios';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';

import './Row.css';

const base_url = 'https://image.tmdb.org/t/p/original';

const Row = ({title, fetchURL, isLargeRow}) => {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState('');

  useEffect(() => {
    const fetchData = async() => {
      const request = await axios.get(fetchURL);
      setMovies(request.data.results);
    }
    fetchData();

  }, [fetchURL])

  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      autoplay: 1
    }
  }

  console.log(movies)

  const handleClick = (movie) => {
    if(trailerUrl) {
      setTrailerUrl('')
    }else {
      movieTrailer(movie?.name || '')
          .then(url => {
            const urlParams = new URLSearchParams(new URL(url).search);
            setTrailerUrl(urlParams.get('v'));
          })
          .catch(error => console.log(error))
    }
  }


  return (
      <div className="row">
        <h2>{title}</h2>
        <div className="row__posters">
          {
            movies.map(movie => (
                <img
                    key={movie.id}
                    src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                    alt={movie.title}
                    className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                    onClick={() => handleClick(movie)}
                />
            ))
          }
        </div>
        {
          trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />
        }
      </div>
  );
};

export default Row;