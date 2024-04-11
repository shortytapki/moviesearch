import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Movie, Review } from '../model/types/movie';

interface SearchParams {
  page?: number;
  limit?: number;
  query?: string;
}

interface Additionals {
  total: number;
  limit: number;
  page: number;
  pages: number;
}

interface MovieApiResponse extends Additionals {
  docs: Movie[];
}

interface ReviewApiResponse extends Additionals {
  docs: Review[];
}

export const movieApi = createApi({
  reducerPath: 'movieApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    getMovies: builder.query<MovieApiResponse, string>({
      query: (query) => ({
        headers: { 'X-API-KEY': API_TOKEN },
        url: 'movie' + query,
      }),
    }),
    getMovieByName: builder.query<MovieApiResponse, SearchParams>({
      query: ({ limit, page, query }) => ({
        headers: { 'X-API-KEY': API_TOKEN },
        url: `movie/search?page=${page}&limit=${limit}&query=${query}`,
      }),
    }),
    getMovieById: builder.query<Movie, string>({
      query: (id) => ({
        headers: { 'X-API-KEY': API_TOKEN },
        url: `movie/${id}`,
      }),
    }),
    getReviewsByMovieId: builder.query<ReviewApiResponse, SearchParams>({
      query: ({ page, limit, query }) => ({
        headers: { 'X-API-KEY': API_TOKEN },
        url: `review?page=${page}&limit=${limit}&movieId=${query}`,
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
  useGetMovieByNameQuery,
} = movieApi;
