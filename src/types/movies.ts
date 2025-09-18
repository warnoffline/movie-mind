export type IMovieShort = {
  id: number;
  title: string;
  description: string;
  posterUrl: string;
  genres: { name: string }[];
  releaseDate: number;
  rating: number | null;
};

export type IGetMoviesResponse = {
  movies: IMovieShort[];
  totalCounts: number;
  page: number;
  counts: number;
};

export type IMovie = {
  ageRating: number;
  alternativeName: string | null;
  backdrop: {
    previewUrl: string;
    url: string;
  };
  countries: {
    name: string;
  }[];
  description: string;
  enName: string | null;
  genres: { name: string }[];
  id: string;
  isSeries: boolean;
  movieLength: number;
  name: string;
  poster: {
    previewUrl: string;
    url: string;
  };
  rating: {
    await: null | number;
    filmCritics: number;
    imdb: number;
    kp: number;
    russianFilmCritics: number;
  };
  ratingMpaa: string;
  seriesLength: number | null;
  shortDescription: string | null;
  status: string | null;
  ticketOnSale: boolean;
  top10: number | null;
  top250: number | null;
  type: string;
  typeNumber: number;
  votes: {
    await: null | number;
    filmCritics: number;
    imdb: number;
    kp: number;
    russianFilmCritics: number;
  };
  year: number;
};

export type IMovieResponse = {
  createdAt: string;
  id: number;
  movie: IMovie;
};
