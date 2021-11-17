import React, {useEffect, useState} from 'react';
import axios from './axios';
import './Row.css';

const base_url = 'https://image.tmdb.org/t/p/original';

const Row = ({title, fetchURL}) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchData = async() => {
      const request = await axios.get(fetchURL);
      setMovies(request.data.results);
    }
    fetchData();

  }, [fetchURL])

  console.log(movies)

  return (
      <div className="row">
        <h2>{title}</h2>
        <div className="row__posters">
          {
            movies.map(movie => (
                <img key={movie.id} src={`${base_url}${movie.poster_path}`} alt={movie.title} className="row__poster" />
            ))
          }
        </div>
      </div>
  );
};

export default Row;