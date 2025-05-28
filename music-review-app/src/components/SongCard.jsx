import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

function SongCard({ song, isEditing = false, existingReview = null, onCancelEdit = () => {} }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const { user, setReviews } = useAppContext();

  // Inisialisasi nilai untuk mode edit
  useEffect(() => {
    if (isEditing && existingReview) {
      setRating(existingReview.rating);
      setComment(existingReview.comment);
    } else {
      setRating(0);
      setComment('');
      setSubmitted(false);
    }
  }, [isEditing, existingReview]);

  const handleRatingClick = (star) => {
    setRating(star);
  };

  const handleSubmitReview = async () => {
    if (!user) {
      alert("Anda harus login terlebih dahulu.");
      return;
    }

    setIsSubmitting(true);
    const userId = user?.user_id || user?.id;

    try {
      let response;
      
      if (isEditing && existingReview) {
        // Mode edit - PUT request
        response = await axios.put(`http://localhost:6543/api/reviews/${existingReview.id}`, {
          rating,
          comment
        });
      } else {
        // Mode baru - POST request
        response = await axios.post('http://localhost:6543/api/reviews', {
          song_id: song.id,
          song_name: song.name,
          artist_name: song.artist_name,
          album_image_url: song.album_image,
          rating,
          comment,
          user_id: userId
        });
      }

      if (response.data.status === 'success') {
        setReviews(prev => {
          if (isEditing) {
            // Update review yang ada
            return prev.map(review => 
              review.id === existingReview.id ? response.data.review : review
            );
          } else {
            // Tambahkan review baru
            return [...prev, response.data.review];
          }
        });
        
        setSubmitted(true);
        alert(`Ulasan berhasil ${isEditing ? 'diperbarui' : 'dikirim'}!`);
        
        if (isEditing) {
          onCancelEdit(); // Keluar dari mode edit
        } else {
          navigate('/reviews');
        }
      }
    } catch (err) {
      console.error("Gagal mengirim ulasan:", err.response?.data || err.message);
      alert(`Gagal ${isEditing ? 'memperbarui' : 'mengirim'} ulasan: ${err.response?.data?.message || err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="card h-100 shadow-sm d-flex flex-column">
      <img
        src={song.album_image || 'https://via.placeholder.com/300'}
        className="card-img-top"
        alt={song.name}
        style={{ objectFit: 'cover', height: '200px' }}
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{song.name}</h5>
        <p className="card-text text-muted">{song.artist_name}</p>

        {/* Rating */}
        <div className="mb-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              style={{
                cursor: 'pointer',
                fontSize: '1.25rem',
                color: rating >= star ? '#ffc107' : '#e4e5e9'
              }}
              onClick={() => handleRatingClick(star)}
            >
              ★
            </span>
          ))}
        </div>

        {/* Komentar */}
        <textarea
          className="form-control mb-2"
          rows="2"
          placeholder="Tulis komentar..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        {/* Action Buttons */}
        <div className="d-flex gap-2">
          {isEditing && (
            <button
              className="btn btn-sm btn-outline-secondary flex-grow-1"
              onClick={onCancelEdit}
              disabled={isSubmitting}
            >
              Batal
            </button>
          )}
          
          <button
            className={`btn btn-sm flex-grow-1 ${isEditing ? 'btn-warning' : 'btn-primary'}`}
            onClick={handleSubmitReview}
            disabled={isSubmitting || submitted || rating === 0 || comment.trim() === ''}
          >
            {isSubmitting 
              ? "Memproses..." 
              : isEditing 
                ? "Perbarui Ulasan" 
                : submitted 
                  ? "Terkirim" 
                  : "Submit Ulasan"}
          </button>
        </div>

        {/* Spotify */}
        <a
          href={song.spotify_url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-sm btn-success mt-2"
        >
          Buka di Spotify
        </a>
      </div>
    </div>
  );
}

export default SongCard;