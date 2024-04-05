import path from 'path';
import type webpack from 'webpack';
import type { BuildOptions } from './types/config';

export function buildResolvers(options: BuildOptions): webpack.ResolveOptions {
  return {
    extensions: ['.tsx', '.ts', '.js'],
    modules: [options.paths.src, 'node_modules'],
    mainFiles: ['index'],
    alias: {
      '@app': path.resolve(options.paths.src, 'app'),
      '@entities': path.resolve(options.paths.src, 'entities'),
      '@pages': path.resolve(options.paths.src, 'pages'),
      '@widgets': path.resolve(options.paths.src, 'widgets'),
      '@features': path.resolve(options.paths.src, 'features'),
      '@shared': path.resolve(options.paths.src, 'shared'),
    },
  };
}
