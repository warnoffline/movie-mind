import { createContext, useState, useEffect } from 'react';

const FAVORITES_KEY = 'favorites';

export const FavoritesContext = createContext<{
  favorites: number[];
  toggleFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
} | null>(null);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(FAVORITES_KEY);
    if (stored) setFavorites(JSON.parse(stored));

    const handleStorage = (e: StorageEvent) => {
      if (e.key === FAVORITES_KEY && e.newValue) {
        setFavorites(JSON.parse(e.newValue));
      }
    };
    window.addEventListener('storage', handleStorage);

    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => {
      const updated = prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id];
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const isFavorite = (id: number) => favorites.includes(id);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};
