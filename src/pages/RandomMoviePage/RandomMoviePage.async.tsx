import { lazy } from 'react';

export const RandomMoviePageAsync = lazy(async () => {
  const page = await import('./RandomMoviePage');
  return page;
});
