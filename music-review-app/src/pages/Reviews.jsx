import { useAppContext } from '../context/AppContext';

function Reviews() {
  const { reviews, savedSongs, deleteReview } = useAppContext();

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
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => {
                    if (window.confirm('Hapus review ini?')) {
                      deleteReview(review.id);
                    }
                  }}
                >
                  Hapus
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Reviews;