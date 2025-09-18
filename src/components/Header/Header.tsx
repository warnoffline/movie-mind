import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import { useCallback, useRef, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import { useSearchStore, useUserStore } from '@/store';
import { useSuggestionNavigation } from '@/utils/hooks/useSuggestionNavigation';

import s from './Header.module.scss';
import { Input } from '../Input';
import { Text } from '../Text';
import { SearchSuggestions } from './components';
import { Button } from '../Button';
import { defaultLinks, type HeaderLink } from './config';
import { BurgerIcon } from '../icons/BurgerIcon';
import { CloseIcon } from '../icons/CloseIcon';

const Header = observer(() => {
  const { query, setQuery, filteredMovies } = useSearchStore();
  const { isAuthorized, user } = useUserStore();
  const [isFocused, setIsFocused] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const { highlightedIndex, handleKeyDown, reset } = useSuggestionNavigation({
    items: filteredMovies,
    onSelect: (movie) => {
      navigate(`/movies/${movie.id}`);
      handleClear();
    },
  });

  const handleClear = useCallback(() => {
    setQuery('');
    setIsFocused(false);
    inputRef.current?.blur();
    setIsMenuOpen(false);
    reset();
  }, [reset, setQuery]);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const links: HeaderLink[] = [
    ...defaultLinks,
    {
      name: isAuthorized ? user?.displayName || 'Профиль' : 'Вход',
      path: isAuthorized ? '/profile' : '/login',
    },
  ];

  return (
    <header className={s.header}>
      <div className={s.logo}>
        <NavLink to={'/movies'}>
          <Text view="p-20" weight="bold" color="primary">
            Movie Mind
          </Text>
        </NavLink>
      </div>

      <div className={s.burger}>
        <Button onClick={toggleMenu}>{isMenuOpen ? <CloseIcon /> : <BurgerIcon />}</Button>
      </div>

      <div className={cn(s.content, { [s.open]: isMenuOpen })}>
        <div className={s.header__find}>
          <Input
            ref={inputRef}
            placeholder="Поиск фильмов"
            value={query}
            onChange={setQuery}
            onFocus={() => setIsFocused(true)}
            onBlur={() =>
              setTimeout(() => {
                setQuery('');
                setIsFocused(false);
                reset();
              }, 150)
            }
            onKeyDown={handleKeyDown}
          />
          {isFocused && (
            <SearchSuggestions onClick={handleClear} highlightedIndex={highlightedIndex} />
          )}
        </div>
        <nav className={s.header__nav}>
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.end}
              className={({ isActive }) => (isActive ? s.activeLink : undefined)}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
});

export default Header;
