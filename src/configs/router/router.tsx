import { createBrowserRouter, Navigate } from 'react-router';

import { App } from '@/app';
import { Favorites } from '@/app/pages/Favorites';
import { Movie } from '@/app/pages/Movie';
import { Movies } from '@/app/pages/Movies';

import { routes } from './constants';

export const router = createBrowserRouter([
  {
    path: routes.main.mask,
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate to={routes.movies.mask} replace />,
      },
      {
        path: routes.movies.mask,
        element: <Movies />,
      },
      {
        path: routes.movie.mask,
        element: <Movie />,
      },
      {
        path: routes.favorites.mask,
        element: <Favorites />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to={routes.main.mask} replace />,
  },
]);
