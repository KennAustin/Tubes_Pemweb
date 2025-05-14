import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Search from './pages/Search';
import SavedSongs from './pages/SavedSongs';
import Reviews from './pages/Reviews';
import Login from './pages/Login';
import { AppProvider } from './context/AppContext';

function App() {
  return (
    <Router>
      <AppProvider>
        <Navbar />
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/search" element={<Search />} />
            <Route path="/saved" element={<SavedSongs />} />
            <Route path="/reviews" element={<Reviews />} />
          </Routes>
        </div>
      </AppProvider>
    </Router>
  );
}

export default App;
