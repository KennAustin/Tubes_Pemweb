import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/search">Music Review</Link>
        <div>
          <Link className="btn btn-outline-light me-2" to="/search">Cari Lagu</Link>
          <Link className="btn btn-outline-light me-2" to="/saved">Daftar Lagu</Link>
          <Link className="btn btn-outline-light" to="/reviews">Ulasan</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;