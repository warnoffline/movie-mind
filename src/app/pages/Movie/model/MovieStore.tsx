import {
  action,
  computed,
  makeObservable,
  reaction,
  runInAction,
  type IReactionDisposer,
} from 'mobx';

import { getMovie, getMoviesByGenres } from '@/services/movies';
import { LoadingStageModel } from '@/store/models/LoadingStageModel';
import { ValueModel } from '@/store/models/ValueModel';
import type { IMovie, IMovieShort } from '@/types/movies';
import type { ILocalStore } from '@/types/store';

export class MovieStore implements ILocalStore {
  private _reactionDisposer?: IReactionDisposer;
  private readonly _movie = new ValueModel<IMovie | null>(null);
  private readonly _similarMovies = new ValueModel<IMovieShort[]>([]);

  readonly loadingStage = new LoadingStageModel();
  readonly similarLoadingStage = new LoadingStageModel();
  private _movieId: number | null = null;

  constructor(movieId: number) {
    this._movieId = movieId;

    makeObservable(this, {
      movie: computed,
      similarMovies: computed,
      loadMovie: action.bound,
      loadSimilarMovies: action.bound,
    });

    this._reactionDisposer = reaction(
      () => [this._movieId],
      () => {
        this.loadMovie(movieId);
      },
      { fireImmediately: true }
    );
  }

  get movie(): IMovie | null {
    return this._movie.value;
  }

  get similarMovies(): IMovieShort[] {
    return this._similarMovies.value;
  }

  async loadMovie(id: number) {
    this.loadingStage.loading();
    try {
      const fetchedMovie = await getMovie(id);
      runInAction(() => {
        this._movie.change(fetchedMovie);
        this.loadingStage.success();
      });

      this.loadSimilarMovies();
    } catch {
      runInAction(() => {
        this.loadingStage.error();
      });
    }
  }

  async loadSimilarMovies() {
    const movie = this.movie;
    if (!movie || !movie.genres.length) return;

    this.similarLoadingStage.loading();
    try {
      const genres = movie.genres.map((g) => g.name);
      const { movies } = await getMoviesByGenres(genres, 1, 16);

      runInAction(() => {
        this._similarMovies.change(movies.filter((m) => m.id !== Number(movie.id)));
        this.similarLoadingStage.success();
      });
    } catch {
      runInAction(() => {
        this.similarLoadingStage.error();
      });
    }
  }

  destroy(): void {
    if (this._reactionDisposer) {
      this._reactionDisposer();
      this._reactionDisposer = undefined;
    }
  }
}
