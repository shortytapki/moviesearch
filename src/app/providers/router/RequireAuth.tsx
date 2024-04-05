import { RoutePaths } from '@shared/config/routeConfig';
import type { FC, PropsWithChildren } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

export const RequireAuth: FC<PropsWithChildren> = ({ children }) => {
  const location = useLocation();
  const auth = true;
  if (!auth) {
    return <Navigate to={RoutePaths.main} state={{ from: location }} replace />;
  }

  return children;
};
