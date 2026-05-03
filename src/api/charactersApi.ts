import { ENDPOINTS } from './endpoints';
import type { CharactersResponse } from '../types/api';
import type { CharacterResult } from '../types/character';

export interface CharactersData {
  items: CharacterResult[];
  totalItems: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export const fetchCharacters = async (
  searchTerm: string,
  page: number
): Promise<CharactersData> => {
  let url = `${ENDPOINTS.people}?page=${page}`;

  if (searchTerm) {
    url += `&search=${encodeURIComponent(searchTerm)}`;
  }

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Unable to load results. Please try again.');
  }

  const data = (await response.json()) as CharactersResponse;

  return {
    items: data.results.map((character) => ({
      url: character.url,
      name: character.name,
      description: `${character.gender}, born ${character.birth_year}, height ${character.height} cm, mass ${character.mass} kg.`,
    })),
    totalItems: data.count,
    hasNextPage: data.next !== null,
    hasPreviousPage: data.previous !== null,
  };
};
