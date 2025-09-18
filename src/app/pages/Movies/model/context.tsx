import { useLocalObservable } from 'mobx-react-lite';
import { createContext, useContext } from 'react';

import { useRootStore } from '@/store';

import { MoviesStore } from './MoviesStore';

type ProviderProps = {
  children: React.ReactNode;
};

const MoviesStoreContext = createContext<MoviesStore | null>(null);

export const MoviesStoreProvider: React.FC<ProviderProps> = ({ children }) => {
  const { queryParamsStore } = useRootStore();
  const moviesStore = useLocalObservable(() => new MoviesStore(queryParamsStore));

  return <MoviesStoreContext.Provider value={moviesStore}>{children}</MoviesStoreContext.Provider>;
};

export function useMoviesStore() {
  const store = useContext(MoviesStoreContext);

  if (!store) throw new Error('useMoviesStore must be used within MoviesStoreProvider');

  return store;
}
