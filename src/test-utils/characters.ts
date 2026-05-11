import type { Character, CharacterResult } from '../types/character';

export const mockCharacterResults: CharacterResult[] = [
  {
    url: 'https://swapi.info/api/people/1',
    name: 'Luke Skywalker',
    description: 'male, born 19BBY, height 172 cm, mass 77 kg.',
  },
  {
    url: 'https://swapi.info/api/people/2',
    name: 'Leia Organa',
    description: 'female, born 19BBY, height 150 cm, mass 49 kg.',
  },
];

export const mockCharactersResponse: Character[] = [
  {
    url: 'https://swapi.info/api/people/1',
    name: 'Luke Skywalker',
    birth_year: '19BBY',
    gender: 'male',
    height: '172',
    mass: '77',
  },
  {
    url: 'https://swapi.info/api/people/2',
    name: 'Leia Organa',
    birth_year: '19BBY',
    gender: 'female',
    height: '150',
    mass: '49',
  },
  {
    url: 'https://swapi.info/api/people/3',
    name: 'Han Solo',
    birth_year: '29BBY',
    gender: 'male',
    height: '180',
    mass: '80',
  },
];
