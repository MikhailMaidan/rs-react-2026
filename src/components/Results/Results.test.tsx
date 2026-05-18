import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { ComponentProps } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { mockCharacterResults } from '../../test-utils/characters';
import { Results } from './Results';

type ResultsProps = ComponentProps<typeof Results>;

const defaultProps: ResultsProps = {
  items: mockCharacterResults,
  searchTerm: 'sky',
  currentPage: 1,
  totalItems: 20,
  hasNextPage: true,
  hasPreviousPage: false,
  isLoading: false,
  errorMessage: '',
  shouldThrowError: false,
  onRetry: vi.fn(),
  onPageChange: vi.fn(),
  onNextPage: vi.fn(),
  onPreviousPage: vi.fn(),
  onItemSelect: vi.fn(),
};

const renderResults = (props: Partial<ResultsProps> = {}) => {
  render(<Results {...defaultProps} {...props} />);
};

describe('Results', () => {
  it('renders the result summary and character rows', () => {
    renderResults();

    expect(screen.getByText('Showing results for "sky"')).toBeInTheDocument();
    expect(screen.getByText('Total: 20 items')).toBeInTheDocument();
    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText('Leia Organa')).toBeInTheDocument();
  });

  it('shows no results message when items are empty', () => {
    renderResults({
      items: [],
      searchTerm: '',
      totalItems: 0,
      hasNextPage: false,
    });

    expect(screen.getByText('No results found')).toBeInTheDocument();
  });

  it('shows a loading status while data is being fetched', () => {
    renderResults({ isLoading: true });

    expect(
      screen.getByRole('status', { name: /loading results/i })
    ).toBeInTheDocument();
  });

  it('renders an API error and retries from the error view', async () => {
    const user = userEvent.setup();
    const onRetry = vi.fn();

    renderResults({
      errorMessage: 'Unable to load results. Please try again.',
      onRetry,
    });

    expect(
      screen.getByRole('heading', { name: /unable to load results/i })
    ).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /try again/i }));

    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it('calls pagination buttons', async () => {
    const user = userEvent.setup();
    const onNextPage = vi.fn();
    const onPreviousPage = vi.fn();

    renderResults({
      currentPage: 2,
      totalItems: 30,
      hasPreviousPage: true,
      onNextPage,
      onPreviousPage,
    });

    await user.click(screen.getByRole('button', { name: /previous/i }));
    await user.click(screen.getByRole('button', { name: /next/i }));

    expect(onPreviousPage).toHaveBeenCalledTimes(1);
    expect(onNextPage).toHaveBeenCalledTimes(1);
  });

  it('calls page number button', async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();

    renderResults({ totalItems: 30, onPageChange });

    await user.click(screen.getByRole('button', { name: '2' }));

    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it('does not call disabled pagination buttons', async () => {
    const user = userEvent.setup();
    const onNextPage = vi.fn();
    const onPreviousPage = vi.fn();

    renderResults({
      totalItems: 10,
      hasNextPage: false,
      onNextPage,
      onPreviousPage,
    });

    await user.click(screen.getByRole('button', { name: /previous/i }));
    await user.click(screen.getByRole('button', { name: /next/i }));

    expect(onPreviousPage).not.toHaveBeenCalled();
    expect(onNextPage).not.toHaveBeenCalled();
  });
});
