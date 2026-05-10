import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { mockCharacterResults } from '../../test-utils/characters';
import { Results } from './Results';

describe('Results', () => {
  it('renders the result summary and character rows', () => {
    render(
      <Results
        items={mockCharacterResults}
        searchTerm="sky"
        currentPage={1}
        totalItems={20}
        hasNextPage
        hasPreviousPage={false}
        isLoading={false}
        errorMessage=""
        shouldThrowError={false}
        onRetry={vi.fn()}
        onPageChange={vi.fn()}
        onNextPage={vi.fn()}
        onPreviousPage={vi.fn()}
      />
    );

    expect(screen.getByText('Showing results for "sky"')).toBeInTheDocument();
    expect(screen.getByText('Total: 20 items')).toBeInTheDocument();
    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText('Leia Organa')).toBeInTheDocument();
  });

  it('shows no results message when items are empty', () => {
    render(
      <Results
        items={[]}
        searchTerm=""
        currentPage={1}
        totalItems={0}
        hasNextPage={false}
        hasPreviousPage={false}
        isLoading={false}
        errorMessage=""
        shouldThrowError={false}
        onRetry={vi.fn()}
        onPageChange={vi.fn()}
        onNextPage={vi.fn()}
        onPreviousPage={vi.fn()}
      />
    );

    expect(screen.getByText('No results found')).toBeInTheDocument();
  });

  it('shows a loading status while data is being fetched', () => {
    render(
      <Results
        items={mockCharacterResults}
        searchTerm="sky"
        currentPage={1}
        totalItems={20}
        hasNextPage
        hasPreviousPage={false}
        isLoading
        errorMessage=""
        shouldThrowError={false}
        onRetry={vi.fn()}
        onPageChange={vi.fn()}
        onNextPage={vi.fn()}
        onPreviousPage={vi.fn()}
      />
    );

    expect(
      screen.getByRole('status', { name: /loading results/i })
    ).toBeInTheDocument();
  });

  it('renders an API error and retries from the error view', async () => {
    const user = userEvent.setup();
    const onRetry = vi.fn();

    render(
      <Results
        items={mockCharacterResults}
        searchTerm="sky"
        currentPage={1}
        totalItems={20}
        hasNextPage
        hasPreviousPage={false}
        isLoading={false}
        errorMessage="Unable to load results. Please try again."
        shouldThrowError={false}
        onRetry={onRetry}
        onPageChange={vi.fn()}
        onNextPage={vi.fn()}
        onPreviousPage={vi.fn()}
      />
    );

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

    render(
      <Results
        items={mockCharacterResults}
        searchTerm="sky"
        currentPage={2}
        totalItems={30}
        hasNextPage
        hasPreviousPage
        isLoading={false}
        errorMessage=""
        shouldThrowError={false}
        onRetry={vi.fn()}
        onPageChange={vi.fn()}
        onNextPage={onNextPage}
        onPreviousPage={onPreviousPage}
      />
    );

    await user.click(screen.getByRole('button', { name: /previous/i }));
    await user.click(screen.getByRole('button', { name: /next/i }));

    expect(onPreviousPage).toHaveBeenCalledTimes(1);
    expect(onNextPage).toHaveBeenCalledTimes(1);
  });

  it('calls page number button', async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();

    render(
      <Results
        items={mockCharacterResults}
        searchTerm="sky"
        currentPage={1}
        totalItems={30}
        hasNextPage
        hasPreviousPage={false}
        isLoading={false}
        errorMessage=""
        shouldThrowError={false}
        onRetry={vi.fn()}
        onPageChange={onPageChange}
        onNextPage={vi.fn()}
        onPreviousPage={vi.fn()}
      />
    );

    await user.click(screen.getByRole('button', { name: '2' }));

    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it('does not call disabled pagination buttons', async () => {
    const user = userEvent.setup();
    const onNextPage = vi.fn();
    const onPreviousPage = vi.fn();

    render(
      <Results
        items={mockCharacterResults}
        searchTerm="sky"
        currentPage={1}
        totalItems={10}
        hasNextPage={false}
        hasPreviousPage={false}
        isLoading={false}
        errorMessage=""
        shouldThrowError={false}
        onRetry={vi.fn()}
        onPageChange={vi.fn()}
        onNextPage={onNextPage}
        onPreviousPage={onPreviousPage}
      />
    );

    await user.click(screen.getByRole('button', { name: /previous/i }));
    await user.click(screen.getByRole('button', { name: /next/i }));

    expect(onPreviousPage).not.toHaveBeenCalled();
    expect(onNextPage).not.toHaveBeenCalled();
  });
});
