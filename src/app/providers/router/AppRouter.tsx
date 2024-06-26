import { Spinner } from 'react-bootstrap';
import { Route, type RouteProps, Routes } from 'react-router-dom';
import { Suspense, memo, useCallback } from 'react';
import { AppRoutes, RoutePaths } from '@shared/config/routeConfig';
import {
  LoginPage,
  MainPage,
  MoviePage,
  RegisterPage,
  RandomMoviePage,
  NotFoundPage,
} from '@pages';
import { RequireAuth } from './RequireAuth';

type AppRouteProps = RouteProps & { authOnly?: boolean };

const routes: Record<AppRoutes, AppRouteProps> = {
  [AppRoutes.MAIN]: {
    path: RoutePaths.main,
    element: <MainPage />,
  },
  [AppRoutes.MOVIE]: {
    path: RoutePaths.movie,
    element: <MoviePage />,
  },
  [AppRoutes.RANDOM_MOVIE]: {
    path: RoutePaths.randomMovie,
    element: <RandomMoviePage />,
    authOnly: true,
  },
  [AppRoutes.LOGIN]: {
    path: RoutePaths.login,
    element: <LoginPage />,
  },
  [AppRoutes.REGISTER]: {
    path: RoutePaths.register,
    element: <RegisterPage />,
  },
  [AppRoutes.NOT_FOUND]: {
    path: RoutePaths.not_found,
    element: <NotFoundPage />,
  },
};

const Router = () => {
  const renderWithProtectedRoutes = useCallback((route: AppRouteProps) => {
    return (
      <Route
        key={route.path}
        path={route.path}
        element={
          <Suspense fallback={<Spinner />}>
            {route.authOnly ? (
              <RequireAuth>{route.element}</RequireAuth>
            ) : (
              route.element
            )}
          </Suspense>
        }
      />
    );
  }, []);

  return (
    <Routes>{Object.values(routes).map(renderWithProtectedRoutes)}</Routes>
  );
};

export const AppRouter = memo(Router);
