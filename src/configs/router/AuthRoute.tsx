import { observer } from 'mobx-react-lite';
import { Navigate } from 'react-router';

import { useUserStore } from '@/store/useRootStore';

import type { JSX } from 'react';

type AuthRouteProps = {
  children: JSX.Element;
  mode: 'protected' | 'public';
  redirectTo: string;
};

export const AuthRoute: React.FC<AuthRouteProps> = observer(({ children, mode, redirectTo }) => {
  const { isAuthorized } = useUserStore();

  if (mode === 'protected' && !isAuthorized) {
    return <Navigate to={redirectTo} replace />;
  }

  if (mode === 'public' && isAuthorized) {
    return <Navigate to={redirectTo} replace />;
  }

  return children;
});
