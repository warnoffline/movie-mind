import { Loader } from '../Loader';
import { Text } from '../Text';
import s from './Loading.module.scss';

export const Loading = () => {
  return (
    <div className={s.loading}>
      <Loader size="xl" />
      <Text view="p-20" weight="bold" color="primary">
        Загружаем фильмы...
      </Text>
    </div>
  );
};
