import { action, makeObservable, observable, runInAction } from 'mobx';

import { searchMoviesByTitle } from '@/services/movies';
import { LoadingStageModel } from '@/store/models/LoadingStageModel';
import type { IMovieShort } from '@/types/movies';

export class SearchStore {
  query = '';
  filteredMovies: IMovieShort[] = [];
  readonly loadingStage = new LoadingStageModel();

  constructor() {
    makeObservable(this, {
      query: observable,
      filteredMovies: observable,
      setQuery: action.bound,
      search: action.bound,
    });
  }

  setQuery(value: string) {
    this.query = value;
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
