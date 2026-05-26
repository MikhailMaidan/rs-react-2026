import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { fetchCharacterDetails, fetchCharacters } from './api/charactersApi';
import App from './App';
import { DetailsPanel } from './components/DetailsPanel';
import { SEARCH_TERM_STORAGE_KEY } from './constants/localStorage';
import { createAppStore } from './store';
import {
  mockCharacterResults,
  mockCharactersResponse,
} from './test-utils/characters';

vi.mock('./api/charactersApi', () => ({
  ITEMS_PER_PAGE: 10,
  fetchCharacters: vi.fn(),
  fetchCharacterDetails: vi.fn(),
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
  const fetchCharacterDetailsMock = vi.mocked(fetchCharacterDetails);

  beforeEach(() => {
    localStorage.clear();
    fetchCharactersMock.mockReset();
    fetchCharacterDetailsMock.mockReset();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const LocationDisplay = () => {
    const location = useLocation();

    return <span data-testid="location">{location.search}</span>;
  };

  const renderApp = (initialEntries = ['/']) => {
    render(
      <Provider store={createAppStore()}>
        <MemoryRouter initialEntries={initialEntries}>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<DetailsPanel />} />
            </Route>
          </Routes>
          <LocationDisplay />
        </MemoryRouter>
      </Provider>
    );
  };

  const searchFor = async (searchTerm: string) => {
    const user = userEvent.setup();
    await user.type(screen.getByRole('searchbox'), searchTerm);
    await user.click(screen.getByRole('button', { name: /^search$/i }));
  };

  describe('initial loading', () => {
    it('loads characters with saved localStorage value', async () => {
      localStorage.setItem(SEARCH_TERM_STORAGE_KEY, 'luke');
      fetchCharactersMock.mockResolvedValue(lukeResult);

      renderApp();

      expect(screen.getByRole('searchbox')).toHaveValue('luke');
      expect(fetchCharactersMock).toHaveBeenCalledWith('luke', 1);
      expect(await screen.findByText('Luke Skywalker')).toBeInTheDocument();
    });

    it('shows loader while characters are loading', async () => {
      let finishLoading: (value: typeof emptyResult) => void = () => {};
      const loadingPromise = new Promise<typeof emptyResult>((resolve) => {
        finishLoading = resolve;
      });

      fetchCharactersMock.mockReturnValue(loadingPromise);

      renderApp();

      expect(
        screen.getByRole('status', { name: /loading results/i })
      ).toBeInTheDocument();

      finishLoading(emptyResult);
      await screen.findByText('No results found');
    });
  });

  describe('routing guard', () => {
    it('shows 404 page for unsupported query params', () => {
      renderApp(['/?xcs=&page=1']);

      expect(
        screen.getByRole('heading', { name: /page not found/i })
      ).toBeInTheDocument();
      expect(fetchCharactersMock).not.toHaveBeenCalled();
    });
  });

  describe('search and localStorage', () => {
    it('saves search term to localStorage after search', async () => {
      fetchCharactersMock.mockResolvedValue(emptyResult);

      renderApp();
      await searchFor('  leia  ');

      expect(localStorage.getItem(SEARCH_TERM_STORAGE_KEY)).toBe('leia');
      expect(fetchCharactersMock).toHaveBeenLastCalledWith('leia', 1);
      expect(screen.getByTestId('location')).toHaveTextContent('?page=1');
    });

    it('overwrites old search term in localStorage', async () => {
      const user = userEvent.setup();
      localStorage.setItem(SEARCH_TERM_STORAGE_KEY, 'old');
      fetchCharactersMock.mockResolvedValue(emptyResult);

      renderApp();

      await user.clear(screen.getByRole('searchbox'));
      await user.type(screen.getByRole('searchbox'), 'new');
      await user.click(screen.getByRole('button', { name: /^search$/i }));

      expect(localStorage.getItem(SEARCH_TERM_STORAGE_KEY)).toBe('new');
    });

    it('does not search again when term is the same', async () => {
      const user = userEvent.setup();
      localStorage.setItem(SEARCH_TERM_STORAGE_KEY, 'luke');
      fetchCharactersMock.mockResolvedValue(lukeResult);

      renderApp();

      await screen.findByText('Luke Skywalker');
      await user.click(screen.getByRole('button', { name: /^search$/i }));

      expect(fetchCharactersMock).toHaveBeenCalledTimes(1);
    });

    it('resets page to one after search', async () => {
      fetchCharactersMock.mockResolvedValue(emptyResult);

      renderApp(['/?page=3']);
      await searchFor('leia');

      expect(fetchCharactersMock).toHaveBeenLastCalledWith('leia', 1);
      expect(screen.getByTestId('location')).toHaveTextContent('?page=1');
    });
  });

  describe('error handling', () => {
    it('shows API error message', async () => {
      fetchCharactersMock.mockRejectedValue(
        new Error('Unable to load results. Please try again.')
      );

      renderApp();

      expect(
        await screen.findByRole('heading', { name: /unable to load results/i })
      ).toBeInTheDocument();
      expect(
        screen.getByText('Unable to load results. Please try again.')
      ).toBeInTheDocument();
    });

    it('tries to load characters again after error', async () => {
      const user = userEvent.setup();

      fetchCharactersMock
        .mockRejectedValueOnce(
          new Error('Unable to load results. Please try again.')
        )
        .mockResolvedValueOnce(lukeResult);

      renderApp();

      await screen.findByRole('heading', { name: /unable to load results/i });
      await user.click(screen.getByRole('button', { name: /try again/i }));

      expect(fetchCharactersMock).toHaveBeenCalledTimes(2);
      expect(await screen.findByText('Luke Skywalker')).toBeInTheDocument();
    });

    it('shows error boundary after error button click', async () => {
      const user = userEvent.setup();
      vi.spyOn(console, 'error').mockImplementation(() => {});
      fetchCharactersMock.mockResolvedValue(emptyResult);

      renderApp();

      await user.click(screen.getByRole('button', { name: /error button/i }));

      expect(
        await screen.findByText(/unable to render results/i)
      ).toBeInTheDocument();
    });

    it('resets error boundary after a new search', async () => {
      const user = userEvent.setup();
      vi.spyOn(console, 'error').mockImplementation(() => {});
      fetchCharactersMock.mockResolvedValue(emptyResult);

      renderApp();

      await user.click(screen.getByRole('button', { name: /error button/i }));
      expect(
        await screen.findByText(/unable to render results/i)
      ).toBeInTheDocument();

      await user.type(screen.getByRole('searchbox'), 'vader');
      await user.click(screen.getByRole('button', { name: /^search$/i }));

      expect(fetchCharactersMock).toHaveBeenLastCalledWith('vader', 1);
      expect(await screen.findByText('No results found')).toBeInTheDocument();
    });

    it('resets error boundary after same empty search', async () => {
      const user = userEvent.setup();
      vi.spyOn(console, 'error').mockImplementation(() => {});
      fetchCharactersMock.mockResolvedValue(emptyResult);

      renderApp();

      await screen.findByText('No results found');
      await user.click(screen.getByRole('button', { name: /error button/i }));
      expect(
        await screen.findByText(/unable to render results/i)
      ).toBeInTheDocument();

      await user.click(screen.getByRole('button', { name: /^search$/i }));

      expect(fetchCharactersMock).toHaveBeenLastCalledWith('', 1);
      expect(await screen.findByText('No results found')).toBeInTheDocument();
    });
  });

  describe('details panel', () => {
    it('opens and closes character details through URL params', async () => {
      const user = userEvent.setup();
      let finishLoadingDetails: (
        value: (typeof mockCharactersResponse)[number]
      ) => void = () => {};
      const detailsPromise = new Promise<
        (typeof mockCharactersResponse)[number]
      >(
        (resolve) => {
          finishLoadingDetails = resolve;
        }
      );

      fetchCharactersMock.mockResolvedValue(lukeResult);
      fetchCharacterDetailsMock.mockReturnValue(detailsPromise);

      renderApp(['/?page=2']);

      await screen.findByText('Luke Skywalker');
      await user.click(screen.getByText('Luke Skywalker'));

      expect(screen.getByTestId('location')).toHaveTextContent(
        '?page=2&details=1'
      );
      expect(fetchCharacterDetailsMock).toHaveBeenCalledWith('1');
      expect(
        screen.getByRole('status', { name: /loading results/i })
      ).toBeInTheDocument();

      finishLoadingDetails(mockCharactersResponse[0]);
      expect(await screen.findByText('Birth year')).toBeInTheDocument();

      await user.click(screen.getByRole('button', { name: /close details/i }));

      expect(screen.getByTestId('location')).toHaveTextContent('?page=2');
    });
  });
});
