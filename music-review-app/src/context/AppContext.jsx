import { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [savedSongs, setSavedSongs] = useState([]);
  const [reviews, setReviews] = useState([]);

  const deleteReview = (id) => {
    setReviews((prev) => prev.filter((r) => r.id !== id));
  };

  const removeSong = (id) => {
    setSavedSongs(prev => prev.filter(song => song.id !== id));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }, [user]);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        savedSongs,
        setSavedSongs,
        removeSong,
        reviews,
        setReviews,
        deleteReview,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
