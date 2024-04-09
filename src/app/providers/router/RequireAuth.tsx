import { RoutePaths } from '@shared/config/routeConfig';
import { MOVIE_SEARCH_USER } from '@shared/consts/consts';
import type { FC, PropsWithChildren } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

export const RequireAuth: FC<PropsWithChildren> = ({ children }) => {
  const location = useLocation();
  const auth = localStorage.getItem(MOVIE_SEARCH_USER);
  if (!auth) {
    return <Navigate to={RoutePaths.main} state={{ from: location }} replace />;
  }

  return children;
};
