import { action, computed, makeObservable, observable, reaction, runInAction } from 'mobx';

import { getFavorites, setFavorites } from '@/services/favorites';
import { getMovies } from '@/services/movies';
import { LoadingStageModel } from '@/store/models/LoadingStageModel';
import { ValueModel } from '@/store/models/ValueModel';
import type { IMovieShort } from '@/types/movies';

import type { UserStore } from '../UserStore';

const FAVORITES_KEY = 'favorites';

export class FavoritesStore {
  private readonly _movies = new ValueModel<IMovieShort[]>([]);
  readonly loadingStage = new LoadingStageModel();
  private readonly userStore: UserStore;

  favorites: number[] = [];
  private initialized = false;

  constructor(userStore: UserStore) {
    this.userStore = userStore;

    makeObservable(this, {
      favorites: observable,
      movies: computed,
      addFavorite: action.bound,
      removeFavorite: action.bound,
      toggleFavorite: action.bound,
      loadMovies: action.bound,
      setFavoritesList: action.bound,
    });

    this.initializeFavorites();

    reaction(
      () => this.favorites.slice(),
      () => {
        if (!this.initialized) return;
        this.loadMovies();
        this.sync();
      }
    );

    reaction(
      () => this.userStore.isAuthorized,
      (isAuth) => {
        if (isAuth) {
          this.onLogin();
        } else {
          this.onLogout();
        }
      }
    );
  }

  get movies() {
    return this._movies.value;
  }

  private async initializeFavorites() {
    if (this.userStore.isAuthorized && this.userStore.user) {
      await this.onLogin();
    } else {
      const localFavs = this.loadFromLocalStorage();
      this.setFavoritesList([...localFavs]);
    }

    runInAction(() => {
      this.initialized = true;
      this.loadMovies();
    });
  }

  private async onLogin() {
    if (!this.userStore.user) return;

    const serverFavs = await getFavorites(this.userStore.user.uid);
    const merged = Array.from(new Set([...this.favorites, ...serverFavs]));

    this.setFavoritesList(merged);
    await setFavorites(this.userStore.user.uid, merged);
  }

  private onLogout() {
    const localFavs = this.loadFromLocalStorage();
    this.setFavoritesList([...localFavs]);
    this.saveToLocalStorage();
  }

  setFavoritesList(favs: number[]) {
    this.favorites = favs;
  }

  addFavorite(id: number) {
    if (!this.favorites.includes(id)) this.favorites.push(id);
  }

  removeFavorite(id: number) {
    this.favorites = this.favorites.filter((fav) => fav !== id);
  }

  toggleFavorite(id: number) {
    if (this.favorites.includes(id)) this.removeFavorite(id);
    else this.addFavorite(id);
  }

  isFavorite(id: number) {
    return this.favorites.includes(id);
  }

  private async sync() {
    if (this.userStore.isAuthorized && this.userStore.user) {
      await setFavorites(this.userStore.user.uid, this.favorites);
    } else {
      this.saveToLocalStorage();
    }
  }

  async loadMovies() {
    if (this.favorites.length === 0) {
      this._movies.change([]);
      return;
    }

    this.loadingStage.loading();
    try {
      const { movies: allMovies } = await getMovies(1, 500);
      runInAction(() => {
        this._movies.change(allMovies.filter((m) => this.favorites.includes(m.id)));
        this.loadingStage.success();
      });
    } catch {
      runInAction(() => this.loadingStage.error());
    }
  }

  private saveToLocalStorage() {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(this.favorites));
  }

  private loadFromLocalStorage(): number[] {
    const saved = localStorage.getItem(FAVORITES_KEY);
    return saved ? JSON.parse(saved) : [];
  }
}
