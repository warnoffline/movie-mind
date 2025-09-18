import { motion } from 'framer-motion';
import { observer } from 'mobx-react-lite';
import { useNavigate, useParams } from 'react-router-dom';

import { Button } from '@/components/Button';
import { Loading } from '@/components/Loading';
import { MovieList } from '@/components/MovieList';
import { Text } from '@/components/Text';

import { GoBackButton } from './components/GoBackButton';
import { MovieInfo } from './components/MovieInfo';
import { containerVariants, itemVariants } from './config';
import { MovieStoreProvider, useMovieStore } from './model';
import s from './Movie.module.scss';

const Movie = observer(() => {
  const navigate = useNavigate();
  const { loadingStage, similarLoadingStage, movie, similarMovies } = useMovieStore();

  if (loadingStage.isLoading) return <Loading />;

  if (!movie)
    return (
      <div className={s.empty}>
        <Text view="title" color="primary">
          Фильм не найден
        </Text>
        <Button variant="outlined" onClick={() => navigate('-1')}>
          <Text view="p-18">Назад</Text>
        </Button>
      </div>
    );

  return (
    <>
      <motion.div
        className={s.movie}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {movie.backdrop.url && (
          <div
            className={s.movie__backdrop}
            style={{ backgroundImage: `url(${movie.backdrop.url})` }}
          />
        )}

        <GoBackButton onClick={() => navigate(-1)} />

        <motion.div className={s.movie__header} variants={containerVariants}>
          <motion.div className={s.movie__poster} variants={itemVariants}>
            <img src={movie.poster.url} alt={movie.name} />
            {movie.ageRating && (
              <Text color="primary" view="p-16">
                {movie.ageRating}+
              </Text>
            )}
          </motion.div>

          <motion.div variants={itemVariants}>
            <MovieInfo movie={movie} />
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        className={s.similar}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className={s.similar__header}>
          <Text color="primary" view="title">
            Похожее по жанрам
          </Text>
        </div>

        {similarLoadingStage.isLoading ? (
          <Loading />
        ) : (
          <motion.div
            className={s.movies__list}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1 } },
            }}
          >
            <MovieList movies={similarMovies} />
          </motion.div>
        )}
      </motion.div>
    </>
  );
});

const MovieWrapper = () => {
  const { id } = useParams<{ id: string }>();
  const movieId = id ? Number(id) : undefined;
  const navigate = useNavigate();

  if (!movieId)
    return (
      <div className={s.empty}>
        <Text view="title" color="primary">
          Фильм не найден
        </Text>
        <Button variant="outlined" onClick={() => navigate('-1')}>
          <Text view="p-18">Назад</Text>
        </Button>
      </div>
    );

  return (
    <MovieStoreProvider key={movieId} movieId={movieId}>
      <Movie />
    </MovieStoreProvider>
  );
};

export default MovieWrapper;
