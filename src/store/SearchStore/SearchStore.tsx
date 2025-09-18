import { action, makeObservable, observable, runInAction } from 'mobx';

import { searchMoviesByTitle } from '@/services/movies';
import { LoadingStageModel } from '@/store/models/LoadingStageModel';
import type { IMovieShort } from '@/types/movies';

import { QueryParamsStore } from '../QueryParamsStore';

export class SearchStore {
  query = '';
  filteredMovies: IMovieShort[] = [];
  readonly loadingStage = new LoadingStageModel();
  private queryParamsStore = new QueryParamsStore();

  constructor() {
    makeObservable(this, {
      query: observable,
      filteredMovies: observable,
      setQuery: action.bound,
      search: action.bound,
    });

    const urlQuery = this.queryParamsStore.getParam('query');
    if (urlQuery) {
      this.query = urlQuery;
      this.search();
    }
  }

  setQuery(value: string) {
    this.query = value;

    this.queryParamsStore.setParams('query', value || null);

    this.search();
  }

  async search() {
    if (!this.query) {
      runInAction(() => {
        this.filteredMovies = [];
      });
      return;
    }

    this.loadingStage.loading();
    try {
      const results = await searchMoviesByTitle(this.query);
      runInAction(() => {
        this.filteredMovies = results;
        this.loadingStage.success();
      });
    } catch {
      runInAction(() => this.loadingStage.error());
    }
  }
}
