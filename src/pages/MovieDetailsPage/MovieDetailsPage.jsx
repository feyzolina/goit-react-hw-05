import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './MovieDetailsPage.module.css';
import MovieCast from '../../components/MovieCast/MovieCast';
import MovieReviews from '../../components/MovieReviews/MovieReviews';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState(null);

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

  useEffect(() => {
    const currentPath = window.location.pathname.split('/').pop();
    setActiveTab(currentPath);
  }, [movieId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

 const handleTabSwitch = (tab) => {
    setActiveTab(tab); 
    navigate(`/movies/${movieId}/${tab}`);
  };

  return (
    <div className={styles.container}>
      <button className={styles.goBackButton} onClick={() => navigate(-1)}>
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
          onClick={() => handleTabSwitch('cast')} 
          className={activeTab === 'cast' ? styles.activeButton : styles.button}
        >
          Cast
        </button>
        <button 
          onClick={() => handleTabSwitch('reviews')} 
          className={activeTab === 'reviews' ? styles.activeButton : styles.button}
        >
          Reviews
        </button>
      </div>
      {activeTab === 'cast' && <MovieCast movieId={movieId} />}
      {activeTab === 'reviews' && <MovieReviews movieId={movieId} />}
    </div>
  );
};

export default MovieDetailsPage;
