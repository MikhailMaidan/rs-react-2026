import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { renderWithIntl } from '../../test-utils/renderWithIntl';
import { ErrorButton } from './ErrorButton';

describe('ErrorButton', () => {
  it('renders error button', () => {
    renderWithIntl(<ErrorButton />);

    expect(
      screen.getByRole('button', { name: /error button/i })
    ).toBeInTheDocument();
  });

  it('calls click handler', async () => {
    const user = userEvent.setup();
    const onTriggerError = vi.fn();

    renderWithIntl(<ErrorButton onTriggerError={onTriggerError} />);

    await user.click(screen.getByRole('button', { name: /error button/i }));

    expect(onTriggerError).toHaveBeenCalledTimes(1);
  });
});
