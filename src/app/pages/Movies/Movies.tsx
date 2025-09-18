import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';

import { Loading } from '@/components/Loading';
import { MovieList } from '@/components/MovieList';
import { Pagination } from '@/components/Pagination';
import { Text } from '@/components/Text';
import { getMovies, getMoviesByGenres } from '@/services/movies';
import type { IMovieShort } from '@/types/movies';

import { Categories } from './components/Categories/Categories';
import s from './Movies.module.scss';

export const Movies = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = Number(searchParams.get('page')) || 1;
  const categoryParam = searchParams.get('category') as string | null;

  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    categoryParam ?? undefined
  );
  const [movies, setMovies] = useState<IMovieShort[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(pageParam);
  const [totalCounts, setTotalCounts] = useState(0);
  const limit = 12;

  const loadMovies = async (pageNumber: number, category?: string) => {
    setLoading(true);

    if (category) {
      const { movies: fetchedMovies, totalCounts: total } = await getMoviesByGenres(
        [category],
        pageNumber,
        limit
      );
      setMovies(fetchedMovies);
      setTotalCounts(total);
    } else {
      const { movies: fetchedMovies, totalCounts: total } = await getMovies(pageNumber, limit);
      setMovies(fetchedMovies);
      setTotalCounts(total);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadMovies(page, selectedCategory);
    const params: Record<string, string> = { page: String(page) };
    if (selectedCategory) params.category = selectedCategory;
    setSearchParams(params);
  }, [page, selectedCategory, setSearchParams]);

  const totalPages = Math.ceil(totalCounts / limit);

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
          setSelectedCategory(cat);
          setPage(1);
        }}
      />

      {loading ? (
        <Loading />
      ) : (
        <>
          <MovieList movies={movies} />
          {totalPages > 1 && <Pagination page={page} totalPages={totalPages} onChange={setPage} />}
        </>
      )}
    </div>
  );
};
