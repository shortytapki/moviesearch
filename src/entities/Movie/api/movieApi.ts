import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Movie } from '../model/types/movie';

interface SearchParams {
  page?: number;
  limit?: number;
  query?: string;
}

interface MovieApiResponse {
  docs: Movie[];
  total: number;
  limit: number;
  page: number;
  pages: number;
}

export const movieApi = createApi({
  reducerPath: 'movieApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    getMovies: builder.query<MovieApiResponse, SearchParams>({
      query: ({ limit, page, query }) => ({
        headers: { 'X-API-KEY': API_TOKEN },
        url: `movie?page=${page}&limit=${limit}` + query,
      }),
    }),
    searchMovie: builder.query<MovieApiResponse, SearchParams>({
      query: ({ limit, page, query }) => ({
        headers: { 'X-API-KEY': API_TOKEN },
        url: `movie/search?page=${page}&limit=${limit}&query=${query}`,
      }),
    }),
  }),
});

export const { useGetMoviesQuery, useSearchMovieQuery } = movieApi;
