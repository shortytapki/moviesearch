import type { FC, PropsWithChildren } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { RoutePaths } from '@shared/config/routeConfig';
import { getUsername } from '@entities/User';

export const RequireAuth: FC<PropsWithChildren> = ({ children }) => {
  const location = useLocation();
  const username = useSelector(getUsername);
  if (!username) {
    return <Navigate to={RoutePaths.main} state={{ from: location }} replace />;
  }

  return children;
};
