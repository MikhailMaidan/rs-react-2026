import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ErrorButton } from '../ErrorButton';
import { ErrorBoundary } from './ErrorBoundary';

function ThrowingChild() {
  throw new Error('Broken child');
  return null;
}

describe('ErrorBoundary', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('catches render errors and exposes a reset action', async () => {
    const user = userEvent.setup();
    const onReset = vi.fn();

    render(
      <ErrorBoundary onReset={onReset}>
        <ThrowingChild />
      </ErrorBoundary>
    );

    expect(screen.getByText(/unable to render results/i)).toBeInTheDocument();
    expect(screen.getByText(/caught safely/i)).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /try again/i }));

    expect(onReset).toHaveBeenCalledTimes(1);
    expect(console.error).toHaveBeenCalled();
  });

  it('shows fallback UI after error button click', async () => {
    const user = userEvent.setup();

    render(
      <ErrorBoundary>
        <ErrorButton />
      </ErrorBoundary>
    );

    await user.click(screen.getByRole('button', { name: /error button/i }));

    expect(screen.getByText(/unable to render results/i)).toBeInTheDocument();
    expect(console.error).toHaveBeenCalled();
  });
});
