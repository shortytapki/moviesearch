import { getUsername } from '@entities/User';
import { RoutePaths } from '@shared/config/routeConfig';
import type { FC, PropsWithChildren } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

export const RequireAuth: FC<PropsWithChildren> = ({ children }) => {
  const location = useLocation();
  const username = useSelector(getUsername);
  if (!username) {
    return <Navigate to={RoutePaths.main} state={{ from: location }} replace />;
  }

  return children;
};
