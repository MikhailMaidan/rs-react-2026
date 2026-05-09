import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { mockCharactersResponse } from '../test-utils/characters';
import { fetchCharacters, ITEMS_PER_PAGE } from './charactersApi';

describe('fetchCharacters', () => {
  const fetchMock = vi.fn<typeof fetch>();

  beforeEach(() => {
    vi.useFakeTimers();
    vi.stubGlobal('fetch', fetchMock);
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
    fetchMock.mockReset();
  });

  it('fetches, filters, paginates, and normalizes character data', async () => {
    fetchMock.mockResolvedValue(
      new Response(JSON.stringify(mockCharactersResponse), { status: 200 })
    );

    const request = fetchCharacters('lu', 1);
    await vi.advanceTimersByTimeAsync(500);
    const data = await request;

    expect(fetchMock).toHaveBeenCalledWith(
      `https://swapi.info/api/people?page=1&limit=${ITEMS_PER_PAGE}&search=lu`
    );
    expect(data).toEqual({
      items: [
        {
          url: 'https://swapi.info/api/people/1',
          name: 'Luke Skywalker',
          description: 'male, born 19BBY, height 172 cm, mass 77 kg.',
        },
      ],
      totalItems: 1,
      hasNextPage: false,
      hasPreviousPage: false,
    });
  });

  it('rejects with the user-facing message when the API response fails', async () => {
    fetchMock.mockResolvedValue(new Response(null, { status: 500 }));

    const request = expect(fetchCharacters('', 2)).rejects.toThrow(
      'Unable to load results. Please try again.'
    );
    await vi.advanceTimersByTimeAsync(500);

    await request;
  });
});
