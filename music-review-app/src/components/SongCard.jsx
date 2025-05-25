import { useState } from 'react';
import axios from 'axios';

function SongCard({ song }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleRatingClick = (star) => {
    setRating(star);
  };

  const handleSubmitReview = async () => {
    try {
      const response = await axios.post('http://localhost:6543/api/reviews', {
        song_id: song.id,
        rating,
        comment,
      });
      setSubmitted(true);
      alert("Ulasan berhasil dikirim!");
    } catch (err) {
      alert("Gagal mengirim ulasan.");
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

        {/* Submit button */}
        <button
          className="btn btn-sm btn-primary mb-2"
          onClick={handleSubmitReview}
          disabled={submitted || (rating === 0 && comment.trim() === '')}
        >
          {submitted ? "Terkirim" : "Submit Ulasan"}
        </button>

        {/* Spotify */}
        <a
          href={song.spotify_url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-sm btn-success"
        >
          Buka di Spotify
        </a>
      </div>
    </div>
  );
}

export default SongCard;
