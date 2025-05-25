import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAppContext } from '../context/AppContext';

function Login() {
  const { setUser } = useAppContext();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:6543/api/login', { username, password });
      if (res.data && res.data.user_id) {
        setUser(res.data);
        if (res.data.token) localStorage.setItem('token', res.data.token);
        navigate('/search');
      } else {
        alert('Login gagal: data user tidak valid');
      }
    } catch {
      alert('Login gagal');
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center min-vh-100 p-3"
      style={{
        backgroundImage: 'url("/background.jpg")',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundColor: '#000000cc',
      }}
    >
      <div
        className="p-4 rounded"
        style={{
          maxWidth: '400px',
          width: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(6px)',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.5)',
        }}
      >
        <h2 className="text-center mb-4 text-white fw-bold">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label text-white">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderColor: 'rgba(255, 255, 255, 0.3)',
                color: '#fff',
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label text-white">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderColor: 'rgba(255, 255, 255, 0.3)',
                color: '#fff',
              }}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>

        <div className="text-center mt-3 text-white">
          <span>Belum punya akun? </span>
          <Link to="/register" className="text-info text-decoration-underline ms-2">
            Daftar
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
