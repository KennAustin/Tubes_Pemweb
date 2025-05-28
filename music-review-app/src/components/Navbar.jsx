import { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { useNavigate, Link } from 'react-router-dom'; // ⬅️ Tambahkan Link

function Navbar() {
  const { user, logout } = useAppContext();
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) setShowPopup(false);
  }, [user]);

  if (!user || !user.user_id) return null;

  const togglePopup = () => setShowPopup((prev) => !prev);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3 stick position-relative">
      <span className="navbar-brand fw-bold">Music Review</span>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ms-auto align-items-center">
          <li className="nav-item">
            <Link className="nav-link" to="/search">
              Cari Lagu
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/reviews">
              Ulasan
            </Link>
          </li>
          <li className="nav-item ms-3 position-relative">
            <img
              src="https://api.dicebear.com/6.x/personas/svg?seed=stickman"
              alt="Avatar"
              className="rounded-circle"
              style={{ width: '40px', height: '40px', cursor: 'pointer' }}
              onClick={togglePopup}
            />
            {showPopup && (
              <div
                className="position-absolute bg-white text-dark p-2 rounded shadow"
                style={{ right: 0, top: '50px', zIndex: 1000 }}
              >
                <button className="btn btn-sm btn-danger" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;