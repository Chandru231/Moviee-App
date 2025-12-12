// FavoritesContext.js 
import { createContext, useContext, useState, useEffect } from 'react';

const FavoritesContext = createContext();

// Custom hook to use favorites
export function useFavorites() {
  return useContext(FavoritesContext);
}

// Provider component
export function FavoritesProvider({ children }) { 

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });

  // Save to localStorage 
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Add movie to favorites
  function addFavorite(movie) {
    setFavorites(prev => [...prev, movie]);
  }

  // Remove movie from favorites
  function removeFavorite(id) {
    setFavorites(prev => prev.filter(movie => movie.id !== id));
  }

  // Check if movie is favorite
  function isFavorite(id) {
    return favorites.some(movie => movie.id === id);
  }

  // Toggle favorite
  function toggleFavorite(movie) {
    if (isFavorite(movie.id)) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie);
    }
  }

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}
