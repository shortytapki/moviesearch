import { beforeAll } from 'vitest';

beforeAll(() => {
  // @ts-expect-error wrong type
  process.API_URL = '123';
});
