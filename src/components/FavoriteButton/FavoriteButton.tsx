import { useFavorites } from '@/utils/hooks/useFavorites';

import Button from '../Button';
import s from './FavoriteButton.module.scss';
import { LikeIcon } from '../icons/LikeIcon';

type Props = { movieId: number };

export const FavoriteButton: React.FC<Props> = ({ movieId }) => {
  const { toggleFavorite, isFavorite } = useFavorites();

  return (
    <Button
      className={s.button}
      variant={isFavorite(movieId) ? 'contained' : 'outlined'}
      onClick={(e) => {
        e.stopPropagation();
        toggleFavorite(movieId);
      }}
    >
      <LikeIcon />
      <span>{isFavorite(movieId) ? 'В избранном' : 'В избранное'}</span>
    </Button>
  );
};
