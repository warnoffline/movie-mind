import { Outlet } from 'react-router-dom';

import { Header } from '@/components/Header';

import s from './App.module.scss';

function App() {
  return (
    <div>
      <Header />
      <div className={s.body}>
        <Outlet />
      </div>
    </div>
  );
}

export default App;
