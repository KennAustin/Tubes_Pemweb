import { useState, useEffect } from 'react';
import { searchTracks } from '../services/api';
import SongCard from '../components/SongCard';
import { useAppContext } from '../context/AppContext';

const Search = () => {
  const { user } = useAppContext();
  const [query, setQuery] = useState('');
  const [tracks, setTracks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [lastQuery, setLastQuery] = useState('');
  const [showFooter, setShowFooter] = useState(false);

  const userKeyPrefix = user?.user_id || 'guest';

  useEffect(() => {
    const savedQuery = localStorage.getItem(`${userKeyPrefix}_searchQuery`);
    const savedTracks = JSON.parse(localStorage.getItem(`${userKeyPrefix}_searchResults`) || '[]');

    if (savedQuery) {
      setQuery(savedQuery);
      setLastQuery(savedQuery);
    }
    if (savedTracks.length > 0) {
      setTracks(savedTracks);
      setSearchPerformed(true);
    }
  }, [userKeyPrefix]);

  useEffect(() => {
    // fungsi cek scroll sampai bawah
    const handleScroll = () => {
      const scrollTop = window.scrollY || window.pageYOffset;
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;

      if (scrollTop + windowHeight >= fullHeight - 10) {
        setShowFooter(true);
      } else {
        setShowFooter(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setIsLoading(true);
    setSearchPerformed(false);

    try {
      const results = await searchTracks(query);
      const filtered = results.filter((track) =>
        track.name.toLowerCase().includes(query.toLowerCase())
      );

      setTracks(filtered);
      setLastQuery(query);
      setSearchPerformed(true);

      localStorage.setItem(`${userKeyPrefix}_searchQuery`, query);
      localStorage.setItem(`${userKeyPrefix}_searchResults`, JSON.stringify(filtered));
    } catch (error) {
      console.error('Search error:', error);
      setTracks([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setQuery('');
    setTracks([]);
    setSearchPerformed(false);
    setLastQuery('');
    localStorage.removeItem(`${userKeyPrefix}_searchQuery`);
    localStorage.removeItem(`${userKeyPrefix}_searchResults`);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div
      className="min-vh-100"
      style={{
        backgroundImage: 'url("background_search.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        paddingTop: '4rem',
        paddingBottom: '4rem',
      }}
    >
      <div
        className="container p-4 rounded shadow"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
        }}
      >
        <h2 className="text-center mb-4">Cari Lagu</h2>

        <div className="input-group mb-4">
          <input
            type="text"
            className="form-control"
            placeholder="Masukkan nama lagu..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button
            className="btn btn-primary me-2"
            onClick={handleSearch}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Mencari...
              </>
            ) : 'Cari'}
          </button>
          <button
            className="btn btn-secondary"
            onClick={handleReset}
            disabled={isLoading}
          >
            Reset
          </button>
        </div>

        {searchPerformed && lastQuery && (
          <div className="mb-3">
            {tracks.length > 0 ? (
              <p className="text-muted">
                Menampilkan {tracks.length} hasil untuk "{lastQuery}"
              </p>
            ) : (
              <p className="text-muted">
                Tidak ditemukan hasil untuk "{lastQuery}"
              </p>
            )}
          </div>
        )}

        <div className="row">
          {tracks.map((track) => {
            const song = {
              id: track.id,
              name: track.name,
              artist_name: track.artists.map((a) => a.name).join(', '),
              album_image: track.album.images[0]?.url,
              spotify_url: track.external_urls.spotify,
            };

            return (
              <div className="col-md-4 mb-4" key={track.id}>
                <SongCard song={song} />
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <footer
        style={{
          backgroundColor: '#212529',
          color: 'white',
          textAlign: 'center',
          padding: '0 1rem',
          height: '56px',
          lineHeight: '56px',
          position: 'fixed',
          bottom: 0,
          width: '100%',
          borderTop: '1px solid rgba(255,255,255,0.1)',
          zIndex: 1000,
          fontWeight: '700',
          fontSize: '1rem',
          userSelect: 'none',
          transform: showFooter ? 'translateY(0)' : 'translateY(100%)',
          transition: 'transform 0.3s ease-in-out',
        }}
      >
        &copy; {new Date().getFullYear()} MusicReview. All rights reserved.
      </footer>
    </div>
  );
};

export default Search;
