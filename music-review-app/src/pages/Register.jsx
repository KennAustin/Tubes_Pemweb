import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:6543/api/register', {
        username,
        password,
      });
      if (res.data.status === 'success') {
        navigate('/login');
      } else {
        setMessage(res.data.message);
      }
    } catch (err) {
      setMessage(err.response?.data?.message || 'Register gagal');
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
        <h2 className="text-center mb-4 text-white fw-bold">Register</h2>
        <form onSubmit={handleSubmit}>
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
            Register
          </button>
        </form>
        {message && (
          <div className="alert alert-danger mt-3" role="alert">
            {message}
          </div>
        )}

        <div className="text-center mt-3 text-white">
          <span>Sudah punya akun?</span>
          <Link to="/login" className="text-info text-decoration-underline ms-2">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}