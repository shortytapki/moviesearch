import { AppRoutes, RoutePaths } from '@shared/config/routeConfig';
import { Route, type RouteProps, Routes } from 'react-router-dom';
import { Suspense, memo, useCallback } from 'react';
import { RequireAuth } from './RequireAuth';
import { MainPage } from '@pages/index';

type AppRouteProps = RouteProps & { authOnly?: boolean };

const routes: Record<AppRoutes, AppRouteProps> = {
  [AppRoutes.MAIN]: {
    path: RoutePaths.main,
    element: <MainPage />,
  },
  [AppRoutes.MOVIE]: {
    path: RoutePaths.movie,
    element: <>Movie Page</>,
  },
  [AppRoutes.RANDOM_MOVIE]: {
    path: RoutePaths.randomMovie,
    element: <>RandomMovie page</>,
    authOnly: true,
  },
  [AppRoutes.NOT_FOUND]: {
    path: RoutePaths.not_found,
    element: <>404</>,
  },
};

const Router = () => {
  const renderWithProtectedRoutes = useCallback((route: AppRouteProps) => {
    return (
      <Route
        key={route.path}
        path={route.path}
        element={
          route.authOnly ? (
            <RequireAuth>{route.element}</RequireAuth>
          ) : (
            <Suspense fallback={<>Loading</>}>{route.element}</Suspense>
          )
        }
      />
    );
  }, []);

  return (
    <Routes>{Object.values(routes).map(renderWithProtectedRoutes)}</Routes>
  );
};

export const AppRouter = memo(Router);
