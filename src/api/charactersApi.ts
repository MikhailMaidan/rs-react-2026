import { ENDPOINTS } from './endpoints';
import type { CharactersResponse } from '../types/api';
import type { CharacterResult } from '../types/character';

export interface CharactersData {
  items: CharacterResult[];
  totalItems: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

const itemsPerPage = 10;

export const fetchCharacters = async (
  searchTerm: string,
  page: number
): Promise<CharactersData> => {
  const response = await fetch(ENDPOINTS.people);

  if (!response.ok) {
    throw new Error('Unable to load results. Please try again.');
  }

  const data = (await response.json()) as CharactersResponse;
  const normalizedSearchTerm = searchTerm.toLowerCase();
  const filteredCharacters = normalizedSearchTerm
    ? data.filter((character) =>
        character.name.toLowerCase().includes(normalizedSearchTerm)
      )
    : data;
  const startIndex = (page - 1) * itemsPerPage;
  const pageItems = filteredCharacters.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return {
    items: pageItems.map((character) => ({
      url: character.url,
      name: character.name,
      description: `${character.gender}, born ${character.birth_year}, height ${character.height} cm, mass ${character.mass} kg.`,
    })),
    totalItems: filteredCharacters.length,
    hasNextPage: page * itemsPerPage < filteredCharacters.length,
    hasPreviousPage: page > 1,
  };
};
