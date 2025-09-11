import { RouterProvider } from 'react-router-dom';

import { router } from '@/configs/router';

import { FavoritesProvider } from './FavoriteProvider';

export const AppProviders = () => {
  return (
    <FavoritesProvider>
      <RouterProvider router={router} />
    </FavoritesProvider>
  );
};
