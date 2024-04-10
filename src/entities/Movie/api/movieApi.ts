import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Movie, Review } from '../model/types/movie';

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
    getMovieById: builder.query<Movie, string>({
      query: (id) => ({
        headers: { 'X-API-KEY': API_TOKEN },
        url: `movie/${id}`,
      }),
    }),
    getReviewsByMovieId: builder.query<Review, string>({
      query: (id) => ({
        headers: { 'X-API-KEY': API_TOKEN },
        url: `review/?movieId=${id}`,
      }),
    }),
    randomMovie: builder.query<Movie, string | undefined>({
      query: (query) => ({
        headers: { 'X-API-KEY': API_TOKEN },
        url: 'movie/random?' + query,
      }),
    }),
  }),
});

export const {
  useGetMoviesQuery,
  useGetMovieByIdQuery,
  useRandomMovieQuery,
  useGetReviewsByMovieIdQuery,
} = movieApi;
