import { useState, useEffect } from 'react';
import axios from 'axios';
import MovieList from '../../components/MovieList/MovieList';
import { useNavigate } from 'react-router-dom';
import styles from './MoviesPage.module.css';

const MoviesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (searchQuery === '') return;

    const fetchMovies = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1&query=${searchQuery}&api_key=cb0481eb78ee7ce9d53c2d5bfb69e02e`
        );
        setMovies(response.data.results);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch movies');
        setLoading(false);
      }
    };

    fetchMovies();
  }, [searchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== '') {
      setSearchQuery(searchQuery);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.pageHeader}>
        <button className={styles.homeButton} onClick={() => navigate('/')}>Home</button>
        <button className={styles.activeButton}>Movies</button>
      </div>

      <h1>Movies</h1>

      <form onSubmit={handleSearchSubmit} className={styles.searchForm}>
        <input
          type="text"
          placeholder="Search for a movie"
          value={searchQuery}
          onChange={handleSearchChange}
          className={styles.searchInput}
        />
        <button type="submit" className={styles.searchButton}>
          Search
        </button>
      </form>

      {loading && <div className={styles.loading}>Loading...</div>}
      {error && <div className={styles.error}>{error}</div>}

      {searchQuery && movies.length === 0 && !loading && !error && (
        <div className={styles.noResults}>No movies found</div>
      )}

      <div>
        {movies.length > 0 && !loading && (
          <MovieList movies={movies} />
        )}
      </div>
    </div>
  );
};

export default MoviesPage;
