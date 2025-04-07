import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './MovieReviews.module.css';

const MovieReviews = ({ movieId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMovieReviews = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/reviews?language=en-US&page=1&api_key=cb0481eb78ee7ce9d53c2d5bfb69e02e`
        );
        setReviews(response.data.results);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch reviews');
        setLoading(false);
      }
    };

    fetchMovieReviews();
  }, [movieId]);

  if (loading) return <div>Loading reviews...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className={styles.reviewsContainer}>
      <h2>Reviews</h2>
      {reviews.length === 0 ? (
        <p>No reviews available.</p>
      ) : (
        reviews.map((review) => (
          <div key={review.id} className={styles.reviewCard}>
            <h3 className={styles.author}>{review.author}</h3>
            <p className={styles.content}>{review.content}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default MovieReviews;
