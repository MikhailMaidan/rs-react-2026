import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  fetchCharacterDetails,
  fetchCharacters,
  type CharactersData,
} from './charactersApi';
import type { Character } from '../types/character';

interface GetCharactersArgs {
  searchTerm: string;
  page: number;
}

type QueryError = {
  error: string;
};

const defaultCacheTtlSeconds = 300;
const configuredCacheTtl = Number(
  process.env.NEXT_PUBLIC_API_CACHE_TTL_SECONDS
);

export const apiCacheTtlSeconds = Number.isFinite(configuredCacheTtl)
  ? configuredCacheTtl
  : defaultCacheTtlSeconds;

const toQueryError = (error: unknown, fallbackMessage: string): QueryError => ({
  error: error instanceof Error ? error.message : fallbackMessage,
});

export const charactersQueryApi = createApi({
  reducerPath: 'charactersQueryApi',
  baseQuery: fakeBaseQuery<QueryError>(),
  tagTypes: ['Characters', 'Character'],
  keepUnusedDataFor: apiCacheTtlSeconds,
  endpoints: (builder) => ({
    getCharacters: builder.query<CharactersData, GetCharactersArgs>({
      queryFn: async ({ searchTerm, page }) => {
        try {
          return { data: await fetchCharacters(searchTerm, page) };
        } catch (error) {
          return {
            error: toQueryError(
              error,
              'Unable to load results. Please try again.'
            ),
          };
        }
      },
      providesTags: (_result, _error, { searchTerm, page }) => [
        { type: 'Characters', id: `${searchTerm}:${page}` },
        { type: 'Characters', id: 'LIST' },
      ],
    }),
    getCharacterDetails: builder.query<Character, string>({
      queryFn: async (id) => {
        try {
          return { data: await fetchCharacterDetails(id) };
        } catch (error) {
          return {
            error: toQueryError(
              error,
              'Unable to load details. Please try again.'
            ),
          };
        }
      },
      providesTags: (_result, _error, id) => [{ type: 'Character', id }],
    }),
  }),
});

export const { useGetCharactersQuery, useGetCharacterDetailsQuery } =
  charactersQueryApi;
