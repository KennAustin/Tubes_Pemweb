import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/Mainlayout';
import Search from './pages/Search';
import Reviews from './pages/Reviews';
import Login from './pages/Login';
import Register from './pages/Register';
import { AppProvider } from './context/AppContext';
import './styles/App.css';

function App() {
  return (
    <Router>
      <AppProvider>
        <Routes>

          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route element={<MainLayout />}>
            <Route path="/search" element={<Search />} />
            <Route path="/reviews" element={<Reviews />} />
          </Route>
        </Routes>
      </AppProvider>
    </Router>
  );
}

export default App;
