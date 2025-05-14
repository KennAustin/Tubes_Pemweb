import React, { useContext, useState } from 'react';
import { SongContext } from '../context/AppContext';
import Button from './ui/Button';
import '../styles/components/ReviewList.css';

const ReviewList = ({ songId }) => {
  const { reviews, deleteReview } = useContext(SongContext);
  const [editingId, setEditingId] = useState(null);

  const songReviews = reviews.filter(review => review.songId === songId);

  if (songReviews.length === 0) {
    return <p className="no-reviews">Belum ada ulasan untuk lagu ini.</p>;
  }

  return (
    <div className="review-list">
      {songReviews.map(review => (
        <div key={review.id} className="review-item">
          {editingId === review.id ? (
            <ReviewForm
              songId={songId}
              initialData={review}
              onCancel={() => setEditingId(null)}
            />
          ) : (
            <>
              <div className="review-header">
                <div className="review-rating">
                  <span className="rating-value">{review.rating}</span>/5
                </div>
                <div className="review-date">
                  {new Date(review.date).toLocaleDateString()}
                </div>
              </div>
              <p className="review-comment">{review.comment}</p>
              <div className="review-actions">
                <Button
                  variant="warning"
                  onClick={() => setEditingId(review.id)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  onClick={() => deleteReview(review.id)}
                >
                  Hapus
                </Button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default ReviewList;