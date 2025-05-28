import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';

function MainLayout() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <div className="flex-grow-1">
        <Outlet />
      </div>
    </div>
  );
}

export default MainLayout;