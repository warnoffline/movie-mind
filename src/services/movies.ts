import { collection, doc, getDoc, getDocs } from 'firebase/firestore';

import { db } from '@/configs/firebase';
import {
  type IMovieShort,
  type IGetMoviesResponse,
  type IMovie,
  type IMovieResponse,
} from '@/types/movies';

const COLLECTION = 'movies';

export const getMovies = async (page = 1, limitCount = 10): Promise<IGetMoviesResponse> => {
  try {
    const moviesRef = collection(db, COLLECTION);

    const snapshot = await getDocs(moviesRef);

    const allDocs = snapshot.docs;
    const totalCounts = allDocs.length;

    const startIndex = (page - 1) * limitCount;
    const endIndex = startIndex + limitCount;
    const pageDocs = allDocs.slice(startIndex, endIndex);

    const movies: IMovieShort[] = pageDocs.map((doc) => {
      const data = doc.data() as IMovieResponse;

      return {
        id: data.id,
        title: data.movie.name,
        description: data.movie.shortDescription ?? data.movie.description,
        posterUrl: data.movie.poster.url,
        genres: data.movie.genres,
        releaseDate: data.movie.year,
        rating: data.movie.rating.imdb,
      };
    });

    return {
      movies,
      totalCounts,
      page,
      counts: movies.length,
    };
  } catch (err) {
    throw new Error(err as string);
  }
};

export const getMovie = async (id: number): Promise<IMovie | null> => {
  try {
    const docRef = doc(db, COLLECTION, id.toString());
    const snapshot = await getDoc(docRef);

    if (!snapshot.exists()) {
      return null;
    }

    const data = snapshot.data() as IMovieResponse;

    return data.movie;
  } catch (err) {
    throw new Error(err as string);
  }
};

export const getMoviesByGenres = async (
  genres: string[],
  page = 1,
  limitCount = 30
): Promise<IGetMoviesResponse> => {
  try {
    const moviesRef = collection(db, COLLECTION);
    const snapshot = await getDocs(moviesRef);

    const allDocs = snapshot.docs;

    const filtered = allDocs.filter((docSnap) => {
      const data = docSnap.data() as IMovieResponse;
      const movieGenres = data.movie.genres.map((g) => g.name.toLowerCase());
      return genres.some((g) => movieGenres.includes(g.toLowerCase()));
    });

    const totalCounts = filtered.length;
    const startIndex = (page - 1) * limitCount;
    const endIndex = startIndex + limitCount;

    const movies: IMovieShort[] = filtered.slice(startIndex, endIndex).map((docSnap) => {
      const data = docSnap.data() as IMovieResponse;

      return {
        id: data.id,
        title: data.movie.name,
        description: data.movie.shortDescription ?? data.movie.description,
        posterUrl: data.movie.poster.url,
        genres: data.movie.genres,
        releaseDate: data.movie.year,
        rating: data.movie.rating.imdb,
      };
    });

    return {
      movies,
      totalCounts,
      page,
      counts: movies.length,
    };
  } catch (err) {
    throw new Error(err as string);
  }
};
