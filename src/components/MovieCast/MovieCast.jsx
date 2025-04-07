import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styles from './MovieCast.module.css';

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!movieId) {
      setError('Movie ID is missing');
      setLoading(false);
      return;
    }

    const fetchCast = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US&api_key=cb0481eb78ee7ce9d53c2d5bfb69e02e`
        );
        setCast(response.data.cast);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch cast');
        setLoading(false);
        console.error(err);
      }
    };

    fetchCast();
  }, [movieId]);

  if (loading) return <div className={styles.loader}>Loading...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.container}>
      <h3>Cast</h3>
      {cast.length === 0 ? (
        <p>No cast available</p>
      ) : (
        <ul className={styles.castList}>
          {cast.map((actor) => (
            <li key={actor.cast_id} className={styles.castItem}>
              <img
                src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                alt={actor.name}
                className={styles.actorImage}
              />
              <p>{actor.name} as {actor.character}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MovieCast;
