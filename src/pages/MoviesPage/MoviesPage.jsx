import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import MovieList from '../../components/MovieList/MovieList';
import styles from './MoviesPage.module.css';

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('query') || '';

  const [inputValue, setInputValue] = useState(searchQuery);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

 
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const query = inputValue.trim();
      if (query) {
        setSearchParams({ query });
      } else {
        setSearchParams({});
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [inputValue, setSearchParams]);

 
  useEffect(() => {
    if (!searchQuery) {
      setMovies([]);
      return;
    }

    const fetchMovies = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1&query=${searchQuery}&api_key=cb0481eb78ee7ce9d53c2d5bfb69e02e`
        );
        setMovies(response.data.results);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [searchQuery]);


  const handleSearchClick = () => {
    const trimmed = inputValue.trim();
    if (trimmed) {
      setSearchParams({ query: trimmed });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className={styles.container}>
      <h1>Movies</h1>

      <form className={styles.searchForm} onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Search for a movie"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className={styles.searchInput}
        />
        <button
          type="button"
          className={styles.searchButton}
          onClick={handleSearchClick}
        >
          Search
        </button>
      </form>

      {loading && <div className={styles.loading}>Loading...</div>}
      {error && <div className={styles.error}>{error}</div>}

      {!loading && !error && searchQuery && movies.length === 0 && (
        <div className={styles.noResults}>No movies found</div>
      )}

      {!loading && !error && movies.length > 0 && (
        <MovieList movies={movies} />
      )}
    </div>
  );
};

export default MoviesPage;
