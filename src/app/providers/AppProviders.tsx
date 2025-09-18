import { RouterProvider } from 'react-router-dom';

import { router } from '@/configs/router';
import { RootStoreProvider } from '@/store';

export const AppProviders = () => {
  return (
    <RootStoreProvider>
      <RouterProvider router={router} />
    </RootStoreProvider>
  );
};
