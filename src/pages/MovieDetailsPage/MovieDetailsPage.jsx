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
  const [activeSection, setActiveSection] = useState(''); // Aktif olan bölümü kontrol etmek için state

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

  const handleToggleSection = (section) => {
    if (activeSection === section) {
      setActiveSection(''); // Eğer tıklanan bölüm zaten aktifse, onu kaldır
    } else {
      setActiveSection(section); // Yeni bölüm aktif hale getir
    }
  };

  return (
    <div className={styles.container}>
      <button className={styles.goBackButton} onClick={() => navigate(-1)}>
        Go Back
      </button>

      <h1 className={styles.title}>{movie.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className={styles.poster}
      />
      <p className={styles.overview}>{movie.overview}</p>
      <p className={styles.releaseYear}>({movie.release_date.slice(0, 4)})</p>

      <div className={styles.buttonContainer}>
        <button 
          onClick={() => handleToggleSection('cast')} 
          className={styles.button}
        >
          Cast
        </button>
        <button 
          onClick={() => handleToggleSection('reviews')} 
          className={styles.button}
        >
          Reviews
        </button>
      </div>

      {activeSection === 'cast' && <MovieCast movieId={movieId} />}
      {activeSection === 'reviews' && <MovieReviews movieId={movieId} />}
    </div>
  );
};

export default MovieDetailsPage;
