export const routes = {
  main: {
    mask: '/',
    create: () => '/',
  },
  login: {
    mask: '/login',
    create: () => '/login',
  },
  profile: {
    mask: '/profile',
    create: () => '/profile',
  },
  movies: {
    mask: '/movies',
    create: () => '/movies',
  },
  movie: {
    mask: '/movies/:id',
    create: (id: number | string) => `/movies/${id}`,
  },
  favorites: {
    mask: '/favorites',
    create: () => '/favorites',
  },
};
