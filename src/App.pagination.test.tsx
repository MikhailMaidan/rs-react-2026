import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fetchCharacters } from './api/charactersApi';
import App from './App';
import { createAppStore } from './store';
import { mockCharacterResults } from './test-utils/characters';
import {
  resetMockNavigation,
  setMockUrl,
  useMockSearch,
} from './test-utils/nextNavigationMock';
import { renderWithIntl } from './test-utils/renderWithIntl';

vi.mock('./api/charactersApi', () => ({
  ITEMS_PER_PAGE: 10,
  fetchCharacters: vi.fn(),
  fetchCharacterDetails: vi.fn(),
}));

vi.mock('next/navigation', async () => {
  const navigationMock = await import('./test-utils/nextNavigationMock');

  return {
    useSearchParams: navigationMock.useMockSearchParams,
  };
});

vi.mock('./i18n/navigation', async () => {
  const actual =
    await vi.importActual<typeof import('./i18n/navigation')>(
      './i18n/navigation'
    );
  const navigationMock = await import('./test-utils/nextNavigationMock');

  return {
    ...actual,
    useRouter: () => navigationMock.routerMock,
    usePathname: navigationMock.useMockPathname,
  };
});

const firstPageResult = {
  items: [mockCharacterResults[0]],
  totalItems: 20,
  hasNextPage: true,
  hasPreviousPage: false,
};

const secondPageResult = {
  items: [mockCharacterResults[1]],
  totalItems: 20,
  hasNextPage: false,
  hasPreviousPage: true,
};

describe('App pagination', () => {
  const fetchCharactersMock = vi.mocked(fetchCharacters);

  beforeEach(() => {
    localStorage.clear();
    resetMockNavigation();
    fetchCharactersMock.mockReset();
    fetchCharactersMock
      .mockResolvedValueOnce(firstPageResult)
      .mockResolvedValueOnce(secondPageResult);
  });

  const LocationDisplay = () => {
    const search = useMockSearch();

    return <span data-testid="location">{search}</span>;
  };

  const renderApp = (initialEntries = ['/']) => {
    const store = createAppStore();
    setMockUrl(initialEntries[0]);

    renderWithIntl(
      <Provider store={store}>
        <App />
        <LocationDisplay />
      </Provider>
    );

    return store;
  };

  it('loads next page after next click', async () => {
    const user = userEvent.setup();

    renderApp();

    expect(await screen.findByText('Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByTestId('location')).toHaveTextContent('?page=1');

    await user.click(screen.getByRole('button', { name: /next/i }));

    expect(fetchCharactersMock).toHaveBeenLastCalledWith('', 2);
    expect(screen.getByTestId('location')).toHaveTextContent('?page=2');
    expect(await screen.findByText('Leia Organa')).toBeInTheDocument();
  });

  it('loads selected page after page button click', async () => {
    const user = userEvent.setup();

    renderApp();

    expect(await screen.findByText('Luke Skywalker')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: '2' }));

    expect(fetchCharactersMock).toHaveBeenLastCalledWith('', 2);
    expect(screen.getByTestId('location')).toHaveTextContent('?page=2');
    expect(await screen.findByText('Leia Organa')).toBeInTheDocument();
  });

  it('shows cached previous page after previous click', async () => {
    const user = userEvent.setup();

    renderApp();

    expect(await screen.findByText('Luke Skywalker')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /next/i }));
    expect(await screen.findByText('Leia Organa')).toBeInTheDocument();

    const callsBeforePreviousClick = fetchCharactersMock.mock.calls.length;
    await user.click(screen.getByRole('button', { name: /previous/i }));

    expect(fetchCharactersMock).toHaveBeenCalledTimes(callsBeforePreviousClick);
    expect(screen.getByTestId('location')).toHaveTextContent('?page=1');
    expect(await screen.findByText('Luke Skywalker')).toBeInTheDocument();
  });

  it('loads cached previous page again after refresh click', async () => {
    const user = userEvent.setup();

    renderApp();

    expect(await screen.findByText('Luke Skywalker')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /next/i }));
    expect(await screen.findByText('Leia Organa')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /previous/i }));
    expect(fetchCharactersMock).toHaveBeenCalledTimes(2);
    expect(await screen.findByText('Luke Skywalker')).toBeInTheDocument();

    fetchCharactersMock.mockResolvedValueOnce(firstPageResult);
    await user.click(screen.getByRole('button', { name: /^refresh$/i }));

    expect(fetchCharactersMock).toHaveBeenCalledTimes(3);
    expect(fetchCharactersMock).toHaveBeenLastCalledWith('', 1);
    expect(await screen.findByText('Luke Skywalker')).toBeInTheDocument();
  });

  it('loads page from URL on first render', async () => {
    fetchCharactersMock.mockReset();
    fetchCharactersMock.mockResolvedValueOnce(secondPageResult);

    renderApp(['/?page=2']);

    expect(fetchCharactersMock).toHaveBeenLastCalledWith('', 2);
    expect(await screen.findByText('Leia Organa')).toBeInTheDocument();
    expect(screen.getByTestId('location')).toHaveTextContent('?page=2');
  });

  it('keeps selected item after page navigation', async () => {
    const user = userEvent.setup();
    const store = renderApp();

    expect(await screen.findByText('Luke Skywalker')).toBeInTheDocument();
    await user.click(screen.getByRole('checkbox', { name: /select luke/i }));

    expect(screen.getByText('Selected: 1')).toBeInTheDocument();
    expect(store.getState().selectedItems.items).toEqual([
      mockCharacterResults[0],
    ]);

    await user.click(screen.getByRole('button', { name: /next/i }));

    expect(await screen.findByText('Leia Organa')).toBeInTheDocument();
    expect(screen.getByText('Selected: 1')).toBeInTheDocument();
    expect(store.getState().selectedItems.items).toEqual([
      mockCharacterResults[0],
    ]);
  });
});
