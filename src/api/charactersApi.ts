import { ENDPOINTS } from './endpoints';
import type { CharactersResponse } from '../types/api';
import type { CharacterResult } from '../types/character';

export const fetchCharacters = async (
  searchTerm: string
): Promise<CharacterResult[]> => {
  let url = `${ENDPOINTS.people}?page=1`;

  if (searchTerm) {
    url += `&search=${encodeURIComponent(searchTerm)}`;
  }

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Unable to load results. Please try again.');
  }

  const data = (await response.json()) as CharactersResponse;

  return data.results.map((character) => ({
    url: character.url,
    name: character.name,
    description: `${character.gender}, born ${character.birth_year}, height ${character.height} cm, mass ${character.mass} kg.`,
  }));
};
