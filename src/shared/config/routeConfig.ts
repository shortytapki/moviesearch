export enum AppRoutes {
  MAIN = 'main',
  MOVIE = 'movie',
  RANDOM_MOVIE = 'randomMovie',
  NOT_FOUND = 'not_found',
}

export enum RouteParams {
  movieId = ':id',
}

export const RoutePaths: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: '/',
  [AppRoutes.MOVIE]: `/movie/${RouteParams.movieId}`,
  [AppRoutes.RANDOM_MOVIE]: 'random_movie',
  [AppRoutes.NOT_FOUND]: '*',
};
