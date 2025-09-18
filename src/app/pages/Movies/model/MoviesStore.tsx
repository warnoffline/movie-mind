import {
  action,
  computed,
  makeObservable,
  observable,
  reaction,
  runInAction,
  type IReactionDisposer,
} from 'mobx';

import { getMovies, getMoviesByGenres } from '@/services/movies';
import { LoadingStageModel } from '@/store/models/LoadingStageModel';
import { PaginationModel } from '@/store/models/PaginationModel';
import { ValueModel } from '@/store/models/ValueModel';
import type { QueryParamsStore } from '@/store/QueryParamsStore';
import type { IMovieShort } from '@/types/movies';
import type { ILocalStore } from '@/types/store';

export class MoviesStore implements ILocalStore {
  private _reactionDisposer?: IReactionDisposer;
  private readonly _queryParamsStore: QueryParamsStore;

  private readonly _movies: ValueModel<IMovieShort[]> = new ValueModel<IMovieShort[]>([]);
  readonly loadingStage = new LoadingStageModel();
  readonly pagination = new PaginationModel();

  selectedCategory?: string;

  constructor(queryParamsStore: QueryParamsStore) {
    makeObservable(this, {
      selectedCategory: observable,
      page: computed,
      movies: computed,
      totalPages: computed,
      queryParamsStore: computed,
      setPage: action.bound,
      setCategory: action.bound,
      loadMovies: action.bound,
      destroy: action.bound,
    });

    this._queryParamsStore = queryParamsStore;

    this.loadQueryParams();

    this._reactionDisposer = reaction(
      () => [this.page, this.selectedCategory],
      () => {
        this.syncQueryParams();
        this.loadMovies();
      },
      { fireImmediately: true }
    );
  }

  get page() {
    return this.pagination.page;
  }

  get totalPages() {
    return this.pagination.totalPages;
  }

  get movies(): IMovieShort[] {
    return this._movies.value;
  }

  get queryParamsStore() {
    return this._queryParamsStore;
  }

  private syncQueryParams() {
    this._queryParamsStore.setParams('page', String(this.page));
    this._queryParamsStore.setParams('category', this.selectedCategory ?? null);
  }

  setPage(page: number) {
    this.pagination.setPage(page);
    this.syncQueryParams();
    this.loadMovies();
  }

  setCategory(category?: string) {
    this.selectedCategory = category;
    this.pagination.setPage(1);
    this.syncQueryParams();
    this.loadMovies();
  }

  async loadMovies() {
    this.loadingStage.loading();
    try {
      if (this.selectedCategory) {
        const { movies, totalCounts } = await getMoviesByGenres(
          [this.selectedCategory],
          this.page,
          this.pagination.limit
        );
        runInAction(() => {
          this._movies.change(movies);
          this.pagination.setTotalCounts(totalCounts);
          this.loadingStage.success();
        });
      } else {
        const { movies, totalCounts } = await getMovies(this.page, this.pagination.limit);
        runInAction(() => {
          this._movies.change(movies);
          this.pagination.setTotalCounts(totalCounts);
          this.loadingStage.success();
        });
      }
    } catch {
      runInAction(() => {
        this.loadingStage.error();
      });
    }
  }

  private loadQueryParams() {
    const paramCategory = this.queryParamsStore.getParam('category');
    const paramPage = this.queryParamsStore.getParam('page');
    if (paramCategory) this.selectedCategory = paramCategory;
    if (paramPage && !isNaN(Number(paramPage))) this.pagination.setPage(Number(paramPage));
  }

  destroy(): void {
    if (this._reactionDisposer) {
      this._reactionDisposer();
      this._reactionDisposer = undefined;
    }
  }
}
