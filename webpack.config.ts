import type webpack from 'webpack';
import path from 'path';
import { buildWebpackConfig } from './config/build/buildWebpackConfig';
import type { BuildEnv, BuildPaths } from './config/build/types/config';

const paths: BuildPaths = {
  entry: path.resolve(__dirname, 'src', 'index.tsx'),
  build: path.resolve(__dirname, 'build'),
  html: path.resolve(__dirname, 'public', 'index.html'),
  src: path.resolve(__dirname, 'src'),
};

export default (env: BuildEnv): webpack.Configuration => {
  const token = env.token;
  const authServerUrl = env.authServerUrl || '';
  if (typeof token !== 'string')
    throw Error('Error: API token is not provided.');
  const mode = env.mode || 'development';
  const port = env.port || 7070;
  const apiUrl = env.apiUrl || 'https://api.kinopoisk.dev/v1.4';

  const isDev = mode === 'development';

  const config: webpack.Configuration = buildWebpackConfig({
    mode,
    paths,
    isDev,
    port,
    token,
    apiUrl,
    authServerUrl,
  });

  return config;
};
