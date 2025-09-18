import { useStrictContext } from '@/utils/hooks/useStrictContext';

import { RootStoreContext } from './RootStoreContext';

export const useRootStore = () => {
  return useStrictContext({
    context: RootStoreContext,
    message: 'useRootStore must be used within a RootStoreProvider',
  });
};

export const useQueryParamsStore = () => {
  return useRootStore().queryParamsStore;
};

export const useFavoriteStore = () => {
  return useRootStore().favoriteStore;
};

export const useSearchStore = () => {
  return useRootStore().searchStore;
};

export const useUserStore = () => {
  return useRootStore().userStore;
};

export const useAlertStore = () => {
  return useRootStore().alertStore;
};
