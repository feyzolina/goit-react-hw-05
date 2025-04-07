import { useState, useEffect } from 'react';
import axios from 'axios';
import MovieList from '../../components/MovieList/MovieList'; // MovieList bileşenini import ediyoruz
import styles from './MoviesPage.module.css';

const MoviesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (searchQuery === '') return;  // Eğer arama yapılmamışsa hiç bir şey yapma

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
    setSearchQuery(searchQuery); // Arama sorgusunu günceller
  };

  return (
    <div className={styles.container}>
      <h1>Movies</h1>

      {/* Arama butonunu kaldırıp doğrudan input kutusunu yerleştiriyoruz */}
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

      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}

      {/* Arama yapılmışsa ve sonuç bulunamamışsa "No movies found" mesajını göster */}
      {searchQuery && movies.length === 0 && !loading && !error && (
        <div>No movies found</div>
      )}

      {/* Filmler ve hata durumları */}
      <div>
        {movies.length > 0 && !loading && (
          <MovieList movies={movies} /> // Filmleri listeleyecek olan MovieList bileşeni
        )}
      </div>
    </div>
  );
};

export default MoviesPage;
