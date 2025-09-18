import { motion } from 'framer-motion';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { type IMovieShort } from '@/types/movies';

import { Card } from '../Card';
import s from './MovieList.module.scss';
import { FavoriteButton } from '../FavoriteButton';
import { GenreTags } from '../GenreTags';
import { containerVariants, itemVariants } from './config';

type MovieListProps = {
  movies: IMovieShort[];
};

const MovieList: React.FC<MovieListProps> = ({ movies }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      className={s.movies__list}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {movies.map((movie) => (
        <motion.div key={movie.id} variants={itemVariants} whileTap={{ scale: 0.99 }} layout>
          <Card
            title={movie.title}
            image={movie.posterUrl}
            subtitle={movie.description}
            captionSlot={<GenreTags genres={movie.genres} />}
            onClick={() => navigate(`/movies/${movie.id}`)}
            actionSlot={
              <div>
                <FavoriteButton movieId={movie.id} />
              </div>
            }
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default React.memo(MovieList);
