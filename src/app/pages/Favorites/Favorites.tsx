import { useEffect, useState } from 'react';

import { Loading } from '@/components/Loading';
import { MovieList } from '@/components/MovieList';
import { Text } from '@/components/Text';
import { getMovies } from '@/services/movies';
import { type IMovieShort } from '@/types/movies';
import { useFavorites } from '@/utils/hooks/useFavorites';

import s from './Favorites.module.scss';

export const Favorites = () => {
  const { favorites } = useFavorites();
  const [movies, setMovies] = useState<IMovieShort[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFavorites = async () => {
      setLoading(true);
      try {
        const { movies: allMovies } = await getMovies(1, 500);

        const favMovies = allMovies.filter((m) => favorites.includes(m.id));
        setMovies(favMovies);
      } catch (err) {
        throw new Error(err as string);
      } finally {
        setLoading(false);
      }
    };

    if (favorites.length > 0) {
      loadFavorites();
    } else {
      setMovies([]);
      setLoading(false);
    }
  }, [favorites]);

  if (loading) {
    return <Loading />;
  }

  if (movies.length === 0) {
    return (
      <div className={s.empty}>
        <Text view="p-20" color="secondary">
          У вас пока нет избранных фильмов
        </Text>
      </div>
    );
  }

  return (
    <div className={s.favorites}>
      <div className={s.favorites__header}>
        <Text color="primary" view="title" weight="bold">
          Избранное
        </Text>
      </div>
      <div>
        <MovieList movies={movies} />
      </div>
    </div>
  );
};
