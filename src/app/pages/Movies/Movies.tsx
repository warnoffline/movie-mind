import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';

import { Loading } from '@/components/Loading';
import { MovieList } from '@/components/MovieList';
import { Pagination } from '@/components/Pagination';
import { Text } from '@/components/Text';
import { withProvider } from '@/utils/withProvider';

import { Categories } from './components/Categories/Categories';
import { MoviesStoreProvider, useMoviesStore } from './model';
import s from './Movies.module.scss';

const Movies = observer(() => {
  const {
    destroy,
    selectedCategory,
    setCategory,
    setPage,
    loadingStage,
    totalPages,
    movies,
    page,
  } = useMoviesStore();

  useEffect(() => {
    return () => {
      destroy();
    };
  }, [destroy]);

  return (
    <div className={s.movies}>
      <div className={s.movies__article}>
        <Text view="title" color="primary">
          Фильмы
        </Text>
      </div>
      <Categories
        selectedCategory={selectedCategory}
        onSelectCategory={(cat) => {
          setCategory(cat);
          setPage(1);
        }}
      />

      {loadingStage.isLoading ? (
        <Loading />
      ) : (
        <>
          <MovieList movies={movies} />
          {totalPages > 1 && <Pagination page={page} totalPages={totalPages} onChange={setPage} />}
        </>
      )}
    </div>
  );
});

export default withProvider(Movies, [MoviesStoreProvider]);
