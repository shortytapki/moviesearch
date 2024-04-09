import { lazy } from 'react';

export const RegisterPageAsync = lazy(async () => {
  const page = await import('./RegisterPage');
  return page;
});
