import { NavLink } from 'react-router-dom';

import s from './Header.module.scss';
import Text from '../Text';

const Header = () => {
  return (
    <header className={s.header}>
      <div className={s.logo}>
        <NavLink to={'/movies'}>
          <Text view="p-20" weight="bold" color="primary">
            Movie Mind
          </Text>
        </NavLink>
      </div>
      <nav className={s.header__nav}>
        <NavLink
          to="/movies"
          end
          className={({ isActive }) => (isActive ? s.activeLink : undefined)}
        >
          Главная
        </NavLink>
        <NavLink
          to="/favorites"
          className={({ isActive }) => (isActive ? s.activeLink : undefined)}
        >
          Избранное
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
