import React from 'react';

import { useFavorites } from '@/utils/hooks/useFavorites';

import { Button } from '../Button';
import s from './FavoriteButton.module.scss';
import { LikeIcon } from '../icons/LikeIcon';

type Props = { movieId: number };

const FavoriteButton: React.FC<Props> = ({ movieId }) => {
  const { toggleFavorite, isFavorite } = useFavorites();

  return (
    <Button
      className={s.fav__button}
      variant={isFavorite(movieId) ? 'contained' : 'outlined'}
      onClick={(e) => {
        e.stopPropagation();
        toggleFavorite(movieId);
      }}
    >
      <div className={s.fav__button__container}>
        <LikeIcon />
        <span className={s.fav__button__text}>
          {isFavorite(movieId) ? 'В избранном' : 'В избранное'}
        </span>
      </div>
    </Button>
  );
};

export default React.memo(FavoriteButton);
