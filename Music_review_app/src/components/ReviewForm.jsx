import { useState } from 'react';
import { useAppContext } from '../context/AppContext';

function ReviewForm() {
  const { savedSongs, setReviews } = useAppContext();
  const [song, setSong] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setReviews(prev => [...prev, { song, rating, comment }]);
    setSong('');
    setRating(5);
    setComment('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Pilih Lagu</label>
        <select className="form-select" value={song} onChange={(e) => setSong(e.target.value)} required>
          <option value="">--Pilih Lagu--</option>
          {savedSongs.map((s) => (
            <option key={s.id} value={s.name}>{s.name}</option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label className="form-label">Rating</label>
        <select className="form-select" value={rating} onChange={(e) => setRating(e.target.value)} required>
          {[1, 2, 3, 4, 5].map(n => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label className="form-label">Komentar</label>
        <textarea className="form-control" value={comment} onChange={(e) => setComment(e.target.value)} rows="3" required></textarea>
      </div>
      <button type="submit" className="btn btn-primary">Kirim Ulasan</button>
    </form>
  );
}

export default ReviewForm;