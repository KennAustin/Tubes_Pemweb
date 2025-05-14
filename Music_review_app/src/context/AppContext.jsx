// src/context/AppContext.jsx
import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [savedSongs, setSavedSongs] = useState([]);

  // ✅ Tambahkan fungsi removeSong
  const removeSong = (id) => {
    setSavedSongs(prev => prev.filter(song => song.id !== id));
  };

  return (
    <AppContext.Provider value={{ user, setUser, savedSongs, setSavedSongs, removeSong }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
