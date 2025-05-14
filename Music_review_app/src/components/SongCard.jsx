import { useAppContext } from '../context/AppContext';

function SongCard({ song }) {
  const { savedSongs, setSavedSongs } = useAppContext();

  const handleSave = () => {
    if (!savedSongs.find(s => s.id === song.id)) {
      setSavedSongs([...savedSongs, song]);
    }
  };

  return (
    <div className="col-md-4 mb-4">
      <div className="card">
        <img src={song.album_image || 'https://via.placeholder.com/150'} className="card-img-top" alt={song.name} />
        <div className="card-body">
          <h5 className="card-title">{song.name}</h5>
          <p className="card-text">{song.artist_name}</p>
          <button className="btn btn-success" onClick={handleSave}>Simpan</button>
        </div>
      </div>
    </div>
  );
}

export default SongCard;