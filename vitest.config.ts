/// <reference types="vitest" />
import { fileURLToPath, URL } from 'url';
import { defineConfig } from 'vite';

export default defineConfig({
  define: {
    API_URL: '123',
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/shared/tests/setupTests.ts'],
  },
  resolve: {
    alias: [
      {
        find: '@app',
        replacement: fileURLToPath(new URL('./src/app/', import.meta.url)),
      },
      {
        find: '@pages',
        replacement: fileURLToPath(new URL('./src/pages', import.meta.url)),
      },
      {
        find: '@widgets',
        replacement: fileURLToPath(new URL('./src/widgets/', import.meta.url)),
      },
      {
        find: '@features',
        replacement: fileURLToPath(new URL('./src/features', import.meta.url)),
      },
      {
        find: '@entities',
        replacement: fileURLToPath(new URL('./src/entities', import.meta.url)),
      },
      {
        find: '@shared',
        replacement: fileURLToPath(new URL('./src/shared', import.meta.url)),
      },
    ],
  },
});
