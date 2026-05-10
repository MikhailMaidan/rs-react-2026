import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fetchCharacters } from './api/charactersApi';
import App from './App';
import { SEARCH_TERM_STORAGE_KEY } from './constants/localStorage';
import { mockCharacterResults } from './test-utils/characters';

vi.mock('./api/charactersApi', () => ({
  ITEMS_PER_PAGE: 10,
  fetchCharacters: vi.fn(),
}));

const emptyResult = {
  items: [],
  totalItems: 0,
  hasNextPage: false,
  hasPreviousPage: false,
};

const lukeResult = {
  items: [mockCharacterResults[0]],
  totalItems: 1,
  hasNextPage: false,
  hasPreviousPage: false,
};

describe('App', () => {
  const fetchCharactersMock = vi.mocked(fetchCharacters);

  beforeEach(() => {
    localStorage.clear();
    fetchCharactersMock.mockReset();
  });

  it('loads characters with saved localStorage value', async () => {
    localStorage.setItem(SEARCH_TERM_STORAGE_KEY, 'luke');
    fetchCharactersMock.mockResolvedValue(lukeResult);

    render(<App />);

    expect(screen.getByRole('searchbox')).toHaveValue('luke');
    expect(fetchCharactersMock).toHaveBeenCalledWith('luke', 1);
    expect(await screen.findByText('Luke Skywalker')).toBeInTheDocument();
  });

  it('saves search term to localStorage after search', async () => {
    const user = userEvent.setup();
    fetchCharactersMock.mockResolvedValue(emptyResult);

    render(<App />);

    await user.type(screen.getByRole('searchbox'), '  leia  ');
    await user.click(screen.getByRole('button', { name: /^search$/i }));

    expect(localStorage.getItem(SEARCH_TERM_STORAGE_KEY)).toBe('leia');
    expect(fetchCharactersMock).toHaveBeenLastCalledWith('leia', 1);
  });

  it('shows API error message', async () => {
    fetchCharactersMock.mockRejectedValue(
      new Error('Unable to load results. Please try again.')
    );

    render(<App />);

    await waitFor(() => {
      expect(
        screen.getByRole('heading', { name: /unable to load results/i })
      ).toBeInTheDocument();
    });
    expect(
      screen.getByText('Unable to load results. Please try again.')
    ).toBeInTheDocument();
  });

  it('shows loader while characters are loading', async () => {
    let finishLoading: (value: typeof emptyResult) => void = () => {};
    const loadingPromise = new Promise<typeof emptyResult>((resolve) => {
      finishLoading = resolve;
    });

    fetchCharactersMock.mockReturnValue(loadingPromise);

    render(<App />);

    expect(
      screen.getByRole('status', { name: /loading results/i })
    ).toBeInTheDocument();

    finishLoading(emptyResult);
    await screen.findByText('No results found');
  });

  it('tries to load characters again after error', async () => {
    const user = userEvent.setup();

    fetchCharactersMock
      .mockRejectedValueOnce(
        new Error('Unable to load results. Please try again.')
      )
      .mockResolvedValueOnce(lukeResult);

    render(<App />);

    await screen.findByRole('heading', { name: /unable to load results/i });
    await user.click(screen.getByRole('button', { name: /try again/i }));

    expect(fetchCharactersMock).toHaveBeenCalledTimes(2);
    expect(await screen.findByText('Luke Skywalker')).toBeInTheDocument();
  });
});
