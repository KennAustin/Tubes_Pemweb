import { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import ReviewForm from '../components/ReviewForm';

function Reviews() {
  const { reviews, savedSongs, deleteReview, setReviews } = useAppContext();
  const [editingReviewId, setEditingReviewId] = useState(null);

  // Cari review yang user edit
  const editingReview = reviews.find(r => r.id === editingReviewId);

  // Fungsi update review di context setelah edit
  const handleUpdateReview = (updatedReview) => {
    setReviews(prev => prev.map(r => r.id === updatedReview.id ? updatedReview : r));
    setEditingReviewId(null);
  };

  return (
    <div className="container">
      <h2 className="mt-4 mb-3">Ulasan Lagu</h2>

      {reviews.length === 0 && <p>Belum ada ulasan.</p>}

      {reviews.map(review => {
        const song = savedSongs.find(s => s.id === review.songId);

        if (editingReviewId === review.id) {
          // Tampilkan form edit
          return (
            <ReviewForm
              key={review.id}
              initialData={review}
              onCancel={() => setEditingReviewId(null)}
              onSave={handleUpdateReview}
            />
          );
        }

        return (
          <div key={review.id} className="mb-3 p-3 border rounded">
            <h5>{song ? `${song.name} - ${song.artist}` : review.songName}</h5>
            <p><strong>Rating:</strong> {review.rating} / 5</p>
            <p><strong>Komentar:</strong> {review.comment}</p>

            <button className="btn btn-sm btn-warning me-2" onClick={() => setEditingReviewId(review.id)}>
              Edit
            </button>
            <button className="btn btn-sm btn-danger" onClick={() => deleteReview(review.id)}>
              Hapus
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default Reviews;
