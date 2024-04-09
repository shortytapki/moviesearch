import { lazy } from 'react';

export const MoviePageAsync = lazy(async () => {
  const page = await import('./MoviePage');
  return page;
});
