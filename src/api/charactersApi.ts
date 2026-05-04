import { buildPeopleUrl } from './endpoints';
import type { CharactersResponse } from '../types/api';
import type { CharacterResult } from '../types/character';

export interface CharactersData {
  items: CharacterResult[];
  totalItems: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export const ITEMS_PER_PAGE = 10;
const loadingDelay = 500;

const wait = (delay: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, delay);
  });

export const fetchCharacters = async (
  searchTerm: string,
  page: number
): Promise<CharactersData> => {
  const requestUrl = buildPeopleUrl(searchTerm, page, ITEMS_PER_PAGE);
  await wait(loadingDelay);

  const response = await fetch(requestUrl);

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
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const pageItems = filteredCharacters.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return {
    items: pageItems.map((character) => ({
      url: character.url,
      name: character.name,
      description: `${character.gender}, born ${character.birth_year}, height ${character.height} cm, mass ${character.mass} kg.`,
    })),
    totalItems: filteredCharacters.length,
    hasNextPage: page * ITEMS_PER_PAGE < filteredCharacters.length,
    hasPreviousPage: page > 1,
  };
};
