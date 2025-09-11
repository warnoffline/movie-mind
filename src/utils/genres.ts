import type { GenreValue } from '@/types/genres';
import { formatGenre } from '@/utils/format';

export const genres = [
  'Боевик',
  'Комедия',
  'Драма',
  'Фэнтези',
  'Ужасы',
  'Фантастика',
  'Триллер',
  'Мелодрама',
  'Криминал',
  'История',
  'Приключения',
  'Детектив',
  'Музыка',
  'Военный',
  'Семейный',
];

export const genreImages: Record<string, string> = {
  Боевик:
    'https://avatars.mds.yandex.net/get-ott/1534341/2a000001843847ce092f99de54ec03f9908f/720x360',
  Комедия:
    'https://avatars.mds.yandex.net/get-ott/223007/2a0000018438302568b271ccc82563762fda/720x360',
  Драма:
    'https://avatars.mds.yandex.net/get-ott/1534341/2a000001843892886831c9143cc8a793ff40/720x360',
  Фэнтези:
    'https://avatars.mds.yandex.net/get-ott/1652588/2a0000018438661c1d5d9534909bb30d0a26/720x360',
  Ужасы:
    'https://avatars.mds.yandex.net/get-ott/1652588/2a0000018438345d1f13f3052ff693c01cc6/720x360',
  Фантастика:
    'https://avatars.mds.yandex.net/get-ott/1534341/2a000001843844c85b8b9074853af40c5f51/720x360',
  Триллер:
    'https://avatars.mds.yandex.net/get-ott/239697/2a00000184388fae65f740ea391765d55e4f/720x360',
  Мелодрама:
    'https://avatars.mds.yandex.net/get-ott/1534341/2a00000184387ced83a0309d9dbd841184f9/720x360',
  Криминал:
    'https://avatars.mds.yandex.net/get-ott/1534341/2a000001843847ce092f99de54ec03f9908f/720x360',
  История:
    'https://avatars.mds.yandex.net/get-ott/1534341/2a0000018438825ae96489247215e47b9304/720x360',
  Приключения:
    'https://avatars.mds.yandex.net/get-ott/2439731/2a000001843865926b014c8f0d542b7c3205/720x360',
  Детектив:
    'https://avatars.mds.yandex.net/get-ott/1534341/2a0000018438799210583ef1dd416bad351a/720x360',
  Музыка:
    'https://avatars.mds.yandex.net/get-ott/1672343/2a00000184388c71c6c0df025d421f8b2c25/720x360',
  Военный:
    'https://avatars.mds.yandex.net/get-ott/1534341/2a000001843847ce092f99de54ec03f9908f/720x360',
  Семейный:
    'https://avatars.mds.yandex.net/get-ott/1531675/2a000001843884b6c652e846be0d1a34042f/720x360',
};

export const genreColors: Record<string, string> = {
  Боевик: '#e53935',
  Комедия: '#695600ff',
  Драма: '#6a1b9a',
  Фэнтези: '#8e24aa',
  Ужасы: '#d32f2f',
  Фантастика: '#0288d1',
  Триллер: '#f57c00',
  Мелодрама: '#ff8a65',
  Криминал: '#6d4c41',
  История: '#8d6e63',
  Приключения: '#43a047',
  Детектив: '#3949ab',
  Биография: '#f4511e',
  Музыка: '#9c27b0',
  Военный: '#607d8b',
  Семейный: '#0b5ab4ff',
  Default: '#9146ff',
};

export const getGenres = (genres: { name: string }[]): GenreValue[] =>
  genres.map((g) => {
    const genre = formatGenre(g.name);
    return {
      label: genre,
      color: genreColors[genre] || genreColors.Default,
    };
  });
