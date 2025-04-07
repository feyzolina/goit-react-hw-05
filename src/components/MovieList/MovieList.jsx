import React from 'react';
import { Link } from 'react-router-dom';
import styles from './MovieList.module.css';

const MovieList = ({ movies }) => {
  return (
    <div className={styles.movieList}>
      {movies.map((movie) => (
        <div key={movie.id} className={styles.movieListItem}>
          <Link to={`/movies/${movie.id}`} state={{ from: 'movies' }}>
            {movie.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className={styles.moviePoster}
              />
            ) : (
              <div>No Image Available</div>
            )}
            <h3 className={styles.movieTitle}>{movie.title}</h3>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
