import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [reviews, setReviews] = useState([]);
  const [savedSongs, setSavedSongs] = useState([]);

  const fetchReviews = async () => {
    try {
      const res = await axios.get(`http://localhost:6543/api/reviews?user_id=${user.user_id}`);
      if (res.data.status === 'success') {
        setReviews(res.data.reviews);
        console.log('Fetched reviews:', res.data.reviews);
      }
    } catch (err) {
      console.error('Gagal fetch reviews:', err);
    }
  };

  const fetchSavedSongs = async () => {
    try {
      const res = await axios.get(`http://localhost:6543/api/saved-songs?user_id=${user.user_id}`);
      if (res.data.status === 'success') {
        setSavedSongs(res.data.songs);
        console.log('Fetched savedSongs:', res.data.songs);
      }
    } catch (err) {
      console.error('Gagal fetch saved songs:', err);
    }
  };

  useEffect(() => {
    if (!user) {
      setReviews([]);
      setSavedSongs([]);
      return;
    }

    fetchReviews();
    fetchSavedSongs();
  }, [user]);

  const deleteReview = async (id) => {
  try {
    console.log('Attempting to delete review with ID:', id, 'Type:', typeof id);
    
    // Validasi ID lebih ketat
    if (!id || (typeof id !== 'number' && typeof id !== 'string')) {
      throw new Error('ID review tidak valid');
    }

    // Konversi ke number jika berupa string numerik
    const numericId = typeof id === 'string' ? parseInt(id) : id;
    
    if (isNaN(numericId) || numericId > 10000) { // Asumsi ID database < 10.000
      throw new Error('Format ID tidak valid (mungkin timestamp)');
    }

    // Cek review ada di state
    const reviewExists = reviews.some(r => r.id === numericId);
    if (!reviewExists) {
      throw new Error(`Review dengan ID ${numericId} tidak ditemukan`);
    }

    // Optimistic update
    setReviews(prev => prev.filter(r => r.id !== numericId));
    
    // Request ke backend
    const response = await axios.delete(`http://localhost:6543/api/reviews/${numericId}`);
    
    if (response.data?.status !== 'success') {
      throw new Error(response.data?.message || 'Gagal menghapus di server');
    }

    console.log('Berhasil menghapus review ID:', numericId);
    return true;
  } catch (err) {
    console.error('Error saat menghapus:', err);
    fetchReviews(); // Refresh data dari server
    alert(`Gagal menghapus: ${err.message}`);
    return false;
  }
};

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setReviews([]);
    setSavedSongs([]);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        reviews,
        setReviews,
        savedSongs,
        setSavedSongs,
        deleteReview,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);