import { useContext } from 'react';

import { FavoritesContext } from '@/app/providers/FavoriteProvider';

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error('useFavorites must be used within FavoritesProvider');
  return context;
};
