import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styles from './MovieReviews.module.css';

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!movieId) {
      setError('Movie ID is missing');
      setLoading(false);
      return;
    }

    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/reviews?language=en-US&api_key=cb0481eb78ee7ce9d53c2d5bfb69e02e`
        );
        setReviews(response.data.results);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch reviews');
        setLoading(false);
        console.error(err);
      }
    };

    fetchReviews();
  }, [movieId]);

  if (loading) return <div className={styles.loader}>Loading...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.container}>
      <h3>Reviews</h3>
      {reviews.length === 0 ? (
        <p className={styles.noReviews}>No reviews available</p>
      ) : (
        <ul className={styles.reviewList}>
          {reviews.map((review) => (
            <li key={review.id} className={styles.reviewItem}>
              <div className={styles.authorInfo}>
                <img
                  src={
                    review.author_details.avatar_path
                      ? `https://www.gravatar.com/avatar/${review.author_details.avatar_path.substr(1)}`
                      : 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'
                  }
                  alt={review.author}
                />
                <span className={styles.authorName}>{review.author}</span>
              </div>
              <h4>Review:</h4>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MovieReviews;
