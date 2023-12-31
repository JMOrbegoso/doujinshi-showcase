import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  Artist,
  Category,
  Character,
  Circle,
  Doujinshi,
  PaginatedDoujinshi,
  Parody,
  Tag,
} from '@/models';

// Define a service using a base URL and expected endpoints
export const showcaseApi = createApi({
  reducerPath: 'showcaseApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    getArtists: builder.query<Artist[], void>({
      query: () => '/artists',
    }),
    getCategories: builder.query<Category[], void>({
      query: () => '/categories',
    }),
    getCharacters: builder.query<Character[], void>({
      query: () => '/characters',
    }),
    getCircles: builder.query<Circle[], void>({
      query: () => '/circles',
    }),
    getParodies: builder.query<Parody[], void>({
      query: () => '/parodies',
    }),
    getTags: builder.query<Tag[], void>({
      query: () => '/tags',
    }),
    getDoujinshiById: builder.query<Doujinshi, string>({
      query: (doujinshiId) => `/doujinshi/${doujinshiId}`,
    }),
    getDoujinshi: builder.query<Doujinshi[], string>({
      query: (params) => `/doujinshi${params}`,
    }),
    getPaginatedDoujinshi: builder.query<PaginatedDoujinshi, string>({
      query: (params) => `/doujinshi/paginated${params}`,
    }),
    refreshLibrary: builder.mutation<void, void>({
      query: () => ({
        url: '/library/refresh',
        method: 'POST',
      }),
    }),
  }),
});

export const {
  useGetArtistsQuery,
  useGetCategoriesQuery,
  useGetCharactersQuery,
  useGetCirclesQuery,
  useGetParodiesQuery,
  useGetTagsQuery,
  useGetDoujinshiByIdQuery,
  useGetDoujinshiQuery,
  useGetPaginatedDoujinshiQuery,
  useRefreshLibraryMutation,
} = showcaseApi;
