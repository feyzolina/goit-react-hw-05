import { useState, useEffect } from 'react';
import axios from 'axios';
import MovieList from '../../components/MovieList/MovieList';
import styles from './HomePage.module.css';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const response = await axios.get(
          'https://api.themoviedb.org/3/trending/movie/day?language=en-US&api_key=cb0481eb78ee7ce9d53c2d5bfb69e02e'
        );
        setMovies(response.data.results);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch trending movies');
        setLoading(false);
      }
    };

    fetchTrendingMovies();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className={styles.container}>
      <div className={styles.navigation}>
        <Link to="/" className={styles.navButton}>Home</Link>
        <Link to="/movies" className={styles.navButton}>Movies</Link>
      </div>
      
      <h1 className={styles.title}>Trending Today</h1>
      <div className={styles.movieList}>
        {movies.map(movie => (
          <div key={movie.id} className={styles.movieItem}>
            <Link to={`/movies/${movie.id}`} className={styles.movieLink}>
              <h3>{movie.title}</h3>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
