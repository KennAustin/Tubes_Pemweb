import { useState } from 'react';
import axios from 'axios';
import SongCard from '../components/SongCard';

function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);

  const searchSongs = async (e) => {
    e.preventDefault();
    setSearched(true);
    try {
      const res = await axios.get(`https://api.jamendo.com/v3.0/tracks/?client_id=6b4e4b1a&format=json&limit=10&search=${query}`);
      setResults(res.data.results);
    } catch (error) {
      console.error('Error fetching songs:', error);
      setResults([]);
    }
  };

  return (
    <div>
      <form onSubmit={searchSongs} className="mb-3">
        <div className="input-group">
          <input type="text" className="form-control" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Cari lagu..." />
          <button className="btn btn-primary" type="submit">Cari</button>
        </div>
      </form>
      <div className="row">
        {results.length > 0 ? (
          results.map(song => <SongCard key={song.id} song={song} />)
        ) : searched ? (
          <div className="text-center text-muted">Lagu tidak ditemukan.</div>
        ) : null}
      </div>
    </div>
  );
}

export default Search;