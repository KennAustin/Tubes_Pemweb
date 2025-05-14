// src/pages/SavedSongs.jsx
import { useAppContext } from '../context/AppContext';

function SavedSongs() {
  const { savedSongs, removeSong } = useAppContext();

  return (
    <div className="container mt-4">
      <h2>Daftar Lagu Tersimpan</h2>
      {savedSongs.length > 0 ? (
        <ul className="list-group">
          {savedSongs.map((song) => (
            <li
              key={song.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <span>{song.name} - {song.artist_name}</span>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => removeSong(song.id)}
              >
                Hapus
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-muted">Belum ada lagu tersimpan.</p>
      )}
    </div>
  );
}

export default SavedSongs;
