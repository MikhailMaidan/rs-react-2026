import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { ErrorMessage } from './ErrorMessage';

describe('ErrorMessage', () => {
  it('renders default error text', () => {
    render(<ErrorMessage showErrorButton={false} />);

    expect(
      screen.getByRole('heading', { name: /unable to load results/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });

  it('renders custom message and calls retry', async () => {
    const user = userEvent.setup();
    const onRetry = vi.fn();

    render(
      <ErrorMessage
        message="Test error"
        onRetry={onRetry}
        showErrorButton={false}
      />
    );

    expect(screen.getByText('Test error')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /try again/i }));

    expect(onRetry).toHaveBeenCalledTimes(1);
  });
});
