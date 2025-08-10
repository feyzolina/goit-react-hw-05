import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useParams, useNavigate, useLocation, Outlet, NavLink } from 'react-router-dom';
import styles from './MovieDetailsPage.module.css';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const prevLocation = useRef(location.state || { from: '/movies' });

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}?language=en-US&api_key=cb0481eb78ee7ce9d53c2d5bfb69e02e`
        );
        setMovie(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  const goBack = () => {
    navigate(prevLocation.current.from);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className={styles.container}>
      <button className={styles.goBackButton} onClick={goBack}>
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
        <NavLink
          to={`/movies/${movieId}/cast`}
          state={prevLocation.current}
          className={({ isActive }) =>
            isActive ? styles.activeButton : styles.button
          }
        >
          Cast
        </NavLink>
        <NavLink
          to={`/movies/${movieId}/reviews`}
          state={prevLocation.current}
          className={({ isActive }) =>
            isActive ? styles.activeButton : styles.button
          }
        >
          Reviews
        </NavLink>
      </div>

      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
