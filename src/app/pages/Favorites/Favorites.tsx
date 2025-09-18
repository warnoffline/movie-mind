import { observer } from 'mobx-react-lite';

import { Loading } from '@/components/Loading';
import { MovieList } from '@/components/MovieList';
import { Text } from '@/components/Text';
import { useFavoriteStore } from '@/store';

import s from './Favorites.module.scss';

const Favorites = observer(() => {
  const { movies, loadingStage } = useFavoriteStore();

  if (loadingStage.isLoading) {
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
});

export default Favorites;
