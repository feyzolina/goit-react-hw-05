import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import styles from './MovieDetailsPage.module.css';
import { Outlet } from 'react-router-dom';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const prevLocation = useRef(location.state?.from || '/movies');

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}?language=en-US&api_key=cb0481eb78ee7ce9d53c2d5bfb69e02e`
        );
        setMovie(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch movie details');
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

 
  return (
    <div className={styles.container}>
      <button className={styles.goBackButton} onClick={() => navigate(prevLocation.current)}>
        Go Back
      </button>

      <div className={styles.movieHeader}>
        <img 
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
          alt={movie.title} 
          className={styles.poster} 
        />
        <div className={styles.movieInfo}>
          <h1 className={styles.title}>
            {movie.title} ({new Date(movie.release_date).getFullYear()})
          </h1>
          <p className={styles.userScore}>
            User Score: {movie.vote_average * 10}%
          </p>
          <p className={styles.overview}>{movie.overview}</p>
          <p className={styles.genres}>
            Genres: {movie.genres.map(genre => genre.name).join(', ')}
          </p>
        </div>
      </div>

      <div className={styles.buttonContainer}>
        <button 
          onClick={() => navigate(`/movies/${movieId}/cast`)} 
          className={location.pathname.endsWith('/cast') ? styles.activeButton : styles.button}
        >
          Cast
        </button>
        <button 
          onClick={() => navigate(`/movies/${movieId}/reviews`)} 
          className={location.pathname.endsWith('/reviews') ? styles.activeButton : styles.button}
        >
          Reviews
        </button>
      </div>

      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
