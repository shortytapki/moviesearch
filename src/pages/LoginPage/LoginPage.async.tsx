import { lazy } from 'react';

export const LoginPageAsync = lazy(async () => {
  const page = await import('./LoginPage');
  return page;
});
