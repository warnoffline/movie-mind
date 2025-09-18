import { useLocalStore } from '@/utils/hooks/useLocalStore';

import { RootStore } from './RootStore';
import { RootStoreContext } from './RootStoreContext';

import type { PropsWithChildren } from 'react';
export const RootStoreProvider = ({ children }: PropsWithChildren) => {
  const { store } = useLocalStore(() => new RootStore());
  return <RootStoreContext.Provider value={store}>{children}</RootStoreContext.Provider>;
};
