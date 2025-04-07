import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './MovieCast.module.css';

const MovieCast = ({ movieId }) => {
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMovieCast = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US&api_key=cb0481eb78ee7ce9d53c2d5bfb69e02e`
        );
        setCast(response.data.cast);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch cast data');
        setLoading(false);
      }
    };

    fetchMovieCast();
  }, [movieId]);

  if (loading) return <div>Loading cast...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className={styles.castContainer}>
      <h2>Cast</h2>
      <div className={styles.castList}>
        {cast.map((actor) => (
          <div key={actor.cast_id} className={styles.actorCard}>
            <img
              src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
              alt={actor.name}
              className={styles.actorImage}
            />
            <div className={styles.actorInfo}>
              <p className={styles.actorName}>{actor.name}</p>
              <p className={styles.actorCharacter}>{actor.character}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieCast;
