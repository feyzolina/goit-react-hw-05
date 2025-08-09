import { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import styles from './HomePage.module.css';

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
        setError(err);
        setLoading(false);
      }
    };

    fetchTrendingMovies();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Trending Today</h1>
      <div className={styles.movieList}>
        {movies.map(movie => (
          <div key={movie.id} className={styles.movieItem}>
            <NavLink
              to={`/movies/${movie.id}`}
              className={({ isActive }) =>
                isActive
                  ? `${styles.movieLink} ${styles.active}`
                  : styles.movieLink
              }
            >
              <h3>{movie.title}</h3>
            </NavLink>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;

