import { AlertStore } from './AlertStore';
import { FavoritesStore } from './FavoriteStore';
import { LocalStore } from './models/LocalStore';
import { QueryParamsStore } from './QueryParamsStore';
import { SearchStore } from './SearchStore';
import { UserStore } from './UserStore';

import type { IRootStore } from './types';

export class RootStore extends LocalStore implements IRootStore {
  alertStore = new AlertStore();
  userStore = new UserStore(this.alertStore);
  queryParamsStore = new QueryParamsStore();
  favoriteStore = new FavoritesStore(this.userStore);
  searchStore = new SearchStore();
}
