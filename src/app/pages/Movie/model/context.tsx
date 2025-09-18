import { useLocalObservable } from 'mobx-react-lite';
import { createContext, useContext } from 'react';

import { MovieStore } from './MovieStore';

type ProviderProps = {
  children: React.ReactNode;
  movieId: number;
};

const MovieStoreContext = createContext<MovieStore | null>(null);

export const MovieStoreProvider: React.FC<ProviderProps> = ({ children, movieId }) => {
  const moviesStore = useLocalObservable(() => new MovieStore(movieId));

  return <MovieStoreContext.Provider value={moviesStore}>{children}</MovieStoreContext.Provider>;
};

export function useMovieStore() {
  const store = useContext(MovieStoreContext);

  if (!store) throw new Error('useMovieStore must be used within MovieStoreProvider');

  return store;
}
