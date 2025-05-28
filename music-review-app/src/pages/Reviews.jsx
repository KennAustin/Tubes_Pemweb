import { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import ReviewForm from '../components/ReviewForm';

function Reviews() {
  const { reviews, savedSongs, deleteReview, setReviews } = useAppContext();
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdateReview = async (updatedReview) => {
    setIsUpdating(true);
    try {
      const res = await fetch(`http://localhost:6543/api/reviews/${updatedReview.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          rating: updatedReview.rating,
          comment: updatedReview.comment
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Gagal update review');

      if (data.status === 'success') {
        setReviews(prev => prev.map(r =>
          r.id === updatedReview.id ? { ...r, ...data.review } : r
        ));
        setEditingReviewId(null);
        alert('Review berhasil diperbarui!');
      }
    } catch (err) {
      console.error('Error update review:', err);
      alert(`Gagal update review: ${err.message}`);
    } finally {
      setIsUpdating(false);
    }
  };

  const getSongInfo = (review) => {
    const song = savedSongs.find(s => s.id === review.song_id);
    return {
      name: song?.name || review.song_name,
      artist: song?.artist_name || review.artist_name,
      image: song?.album_image || review.album_image_url || 'https://via.placeholder.com/100'
    };
  };

  return (
    <div className="py-5" style={{
      backgroundImage: 'url("background_search.jpg")',
      backgroundSize: 'cover',
      minHeight: '100vh'
    }}>
      <div className="container bg-white bg-opacity-75 rounded shadow p-4">
        <h2 className="mb-4 fw-bold">Ulasan Lagu</h2>

        {reviews.length === 0 && <p className="text-muted">Belum ada ulasan.</p>}

        {reviews.map(review => {
          const { name, artist, image } = getSongInfo(review);
          const isEditing = editingReviewId === review.id;

          if (isEditing) {
            return (
              <div key={review.id} className="bg-light rounded shadow-sm mb-4 p-4">
                <div className="row mb-3 align-items-center">
                  <div className="col-md-2 text-center">
                    <img
                      src={image}
                      alt={name}
                      className="img-fluid rounded"
                      style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                      onError={(e) => e.target.src = 'https://via.placeholder.com/100'}
                    />
                  </div>
                  <div className="col-md-10">
                    <h4>{name} - {artist}</h4>
                  </div>
                </div>

                <ReviewForm
                  initialData={review}
                  onCancel={() => setEditingReviewId(null)}
                  onSave={handleUpdateReview}
                  isSubmitting={isUpdating}
                />
              </div>
            );
          }

          return (
            <div key={review.id} className="row align-items-center bg-light rounded shadow-sm mb-4 p-3">
              <div className="col-md-2 text-center">
                <img
                  src={image}
                  alt={name}
                  className="img-fluid rounded"
                  style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                  onError={(e) => e.target.src = 'https://via.placeholder.com/100'}
                />
              </div>
              <div className="col-md-8">
                <h5>{name} - {artist}</h5>
                <div className="d-flex align-items-center mb-1">
                  <span className="me-2">Rating:</span>
                  {[...Array(5)].map((_, i) => (
                    <span 
                      key={i}
                      style={{ 
                        color: i < review.rating ? '#ffc107' : '#e4e5e9',
                        fontSize: '1.2rem'
                      }}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <p className="mb-0">{review.comment}</p>
              </div>
              <div className="col-md-2 text-end">
                <div className="d-flex justify-content-end gap-2">
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => {
                      if (window.confirm('Hapus review ini?')) {
                        deleteReview(review.id);
                      }
                    }}
                    disabled={isUpdating}
                  >
                    Hapus
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Reviews;