import { Routes, Route } from 'react-router-dom';
import Home from './pages/Login';
import SongList from './pages/Reviews';
import SongDetail from './pages/SavedSongs';
import NotFound from './pages/Search';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/songs" element={<SongList />} />
      <Route path="/songs/:id" element={<SongDetail />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}