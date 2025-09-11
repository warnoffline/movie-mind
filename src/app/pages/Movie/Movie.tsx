import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Button from '@/components/Button';
import { Loading } from '@/components/Loading';
import { MovieList } from '@/components/MovieList';
import Text from '@/components/Text';
import { getMovie, getMoviesByGenres } from '@/services/movies';
import { type IMovie, type IMovieShort } from '@/types/movies';

import { GoBackButton } from './components/GoBackButton';
import { MovieInfo } from './components/MovieInfo';
import s from './Movie.module.scss';

export const Movie = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<IMovie | null>(null);
  const [similarMovies, setSimilarMovies] = useState<IMovieShort[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!movie) return;

    const loadSimilar = async () => {
      try {
        const genres = movie.genres.map((g) => g.name);
        const fetched = await getMoviesByGenres(genres, 1, 16);
        setSimilarMovies(fetched.movies.filter((m) => m.id !== Number(movie.id)));
      } catch (err: unknown) {
        throw new Error(err as string);
      }
    };

    loadSimilar();
  }, [movie]);

  useEffect(() => {
    if (!id) return;

    const loadMovie = async () => {
      setLoading(true);
      try {
        const fetchedMovie = await getMovie(Number(id));
        setMovie(fetchedMovie);
      } catch (err) {
        throw new Error(err as string);
      } finally {
        setLoading(false);
      }
    };

    loadMovie();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (!movie) {
    return (
      <div className={s.empty}>
        <Text view="title" color="primary">
          Фильм не найден
        </Text>
        <Button variant="outlined" onClick={() => navigate('-1')}>
          Назад
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className={s.movie}>
        {movie.backdrop.url && (
          <div
            className={s.movie__backdrop}
            style={{ backgroundImage: `url(${movie.backdrop.url})` }}
          />
        )}
        <GoBackButton onClick={() => navigate(-1)} />
        <div className={s.movie__header}>
          <div className={s.movie__poster}>
            <img src={movie.poster.url} alt={movie.name} />
            {movie.ageRating && (
              <Text color="primary" view="p-16">
                {movie.ageRating}+
              </Text>
            )}
          </div>
          <MovieInfo movie={movie} />
        </div>
      </div>
      <div className={s.similar}>
        <div className={s.similar__header}>
          <Text color="primary" view="title">
            Похожее по жанрам
          </Text>
        </div>
        <MovieList movies={similarMovies} />
      </div>
    </>
  );
};
