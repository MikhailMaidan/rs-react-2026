import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { mockCharacterResults } from '../../test-utils/characters';
import { Results } from './Results';

const defaultProps = {
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
};

describe('Results', () => {
  it('renders the result summary and character rows', () => {
    render(<Results {...defaultProps} />);

    expect(screen.getByText('Showing results for "sky"')).toBeInTheDocument();
    expect(screen.getByText('Total: 20 items')).toBeInTheDocument();
    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText('Leia Organa')).toBeInTheDocument();
  });

  it('shows a loading status while data is being fetched', () => {
    render(<Results {...defaultProps} isLoading />);

    expect(screen.getByRole('status', { name: /loading results/i })).toBeInTheDocument();
  });

  it('renders an API error and retries from the error view', async () => {
    const user = userEvent.setup();
    const onRetry = vi.fn();
    render(
      <Results
        {...defaultProps}
        errorMessage="Unable to load results. Please try again."
        onRetry={onRetry}
      />
    );

    expect(
      screen.getByRole('heading', { name: /unable to load results/i })
    ).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /try again/i }));

    expect(onRetry).toHaveBeenCalledTimes(1);
  });

});
