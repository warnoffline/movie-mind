export const routes = {
  main: {
    mask: '/',
    create: () => '/',
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
