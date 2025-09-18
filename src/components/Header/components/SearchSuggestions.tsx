import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import { useCallback } from 'react';
import { useNavigate } from 'react-router';

import { Text } from '@/components/Text';
import { useSearchStore } from '@/store';

import s from './SearchSuggestions.module.scss';

type SearchSuggestionsProps = {
  onClick: () => void;
  highlightedIndex?: number;
};

const SearchSuggestions: React.FC<SearchSuggestionsProps> = observer(
  ({ onClick, highlightedIndex = -2 }) => {
    const { filteredMovies, loadingStage } = useSearchStore();

    const navigate = useNavigate();

    const handleClick = useCallback(
      (id: number) => {
        navigate(`/movies/${id}`);
        onClick();
      },
      [navigate, onClick]
    );

    if (loadingStage.isLoading)
      return (
        <div className={s.list}>
          <Text color="primary" view="p-18" className={s.loading}>
            Загрузка...
          </Text>
        </div>
      );

    if (filteredMovies.length === 0) return null;

    return (
      <div className={s.list}>
        {filteredMovies.map((m, idx) => (
          <div
            key={m.id}
            className={cn(s.item, { [s.highlighted]: idx === highlightedIndex })}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => handleClick(m.id)}
          >
            <img src={m.posterUrl} alt={m.title} className={s.poster} />
            <Text weight="bold" className={s.title}>
              {m.title}
            </Text>
          </div>
        ))}
      </div>
    );
  }
);

export default SearchSuggestions;
