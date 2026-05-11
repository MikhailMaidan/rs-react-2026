import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fetchCharacters } from './api/charactersApi';
import App from './App';
import { mockCharacterResults } from './test-utils/characters';

vi.mock('./api/charactersApi', () => ({
  ITEMS_PER_PAGE: 10,
  fetchCharacters: vi.fn(),
}));

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
    fetchCharactersMock.mockReset();
    fetchCharactersMock
      .mockResolvedValueOnce(firstPageResult)
      .mockResolvedValueOnce(secondPageResult);
  });

  it('loads next page after next click', async () => {
    const user = userEvent.setup();

    render(<App />);

    expect(await screen.findByText('Luke Skywalker')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /next/i }));

    expect(fetchCharactersMock).toHaveBeenLastCalledWith('', 2);
    expect(await screen.findByText('Leia Organa')).toBeInTheDocument();
  });

  it('loads selected page after page button click', async () => {
    const user = userEvent.setup();

    render(<App />);

    expect(await screen.findByText('Luke Skywalker')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: '2' }));

    expect(fetchCharactersMock).toHaveBeenLastCalledWith('', 2);
    expect(await screen.findByText('Leia Organa')).toBeInTheDocument();
  });

  it('loads previous page after previous click', async () => {
    const user = userEvent.setup();

    render(<App />);

    expect(await screen.findByText('Luke Skywalker')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /next/i }));
    expect(await screen.findByText('Leia Organa')).toBeInTheDocument();

    fetchCharactersMock.mockResolvedValueOnce(firstPageResult);
    await user.click(screen.getByRole('button', { name: /previous/i }));

    expect(fetchCharactersMock).toHaveBeenLastCalledWith('', 1);
    expect(await screen.findByText('Luke Skywalker')).toBeInTheDocument();
  });
});
