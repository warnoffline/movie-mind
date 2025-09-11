import { useNavigate } from 'react-router-dom';

import { type IMovieShort } from '@/types/movies';

import Card from '../Card';
import s from './MovieList.module.scss';
import { FavoriteButton } from '../FavoriteButton';
import { GenreTags } from '../GenreTags/GenreTags';

import type React from 'react';

type MovieListProps = {
  movies: IMovieShort[];
};

export const MovieList: React.FC<MovieListProps> = ({ movies }) => {
  const navigate = useNavigate();

  return (
    <div className={s.movies__list}>
      {movies.map((movie) => (
        <Card
          key={movie.id}
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
      ))}
    </div>
  );
};
