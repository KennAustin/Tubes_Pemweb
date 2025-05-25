import { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import axios from 'axios';

function ReviewForm() {
  const { user, setReviews } = useAppContext();
  const [song, setSong] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  useEffect(() => {
    if (!song) return;

    const sendReview = async () => {
      try {
        const res = await axios.post('http://localhost:6543/api/reviews', {
          song_name: song,
          rating: parseInt(rating),
          comment,
          username: user?.username,
        });

        setReviews(prev => [...prev, res.data]);

      } catch (err) {
        console.error('Gagal mengirim ulasan:', err);
      }
    };

    const timeout = setTimeout(() => {
      sendReview();
    }, 500);

    return () => clearTimeout(timeout);

  }, [song, rating, comment, user, setReviews]);

  return (
    <form>
      <div className="mb-3">
        <label className="form-label">Pilih Lagu</label>
        <select className="form-select" value={song} onChange={e => setSong(e.target.value)} required>
          <option value="">--Pilih Lagu--</option>
        </select>
      </div>
      <div className="mb-3">
        <label className="form-label">Rating</label>
        <select className="form-select" value={rating} onChange={e => setRating(e.target.value)} required>
          {[1, 2, 3, 4, 5].map(n => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label className="form-label">Komentar</label>
        <textarea className="form-control" value={comment} onChange={e => setComment(e.target.value)} rows="3" required></textarea>
      </div>
    </form>
  );
}

export default ReviewForm;