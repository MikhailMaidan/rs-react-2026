import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Modal } from './Modal';

describe('Modal', () => {
  it('renders in portal and focuses close button', () => {
    render(
      <Modal title="Test modal" onClose={vi.fn()}>
        <button type="button">Inside action</button>
      </Modal>
    );

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /close modal/i })).toHaveFocus();
  });

  it('calls close on escape and close button', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    render(
      <Modal title="Test modal" onClose={onClose}>
        <button type="button">Inside action</button>
      </Modal>
    );

    await user.keyboard('{Escape}');
    await user.click(screen.getByRole('button', { name: /close modal/i }));

    expect(onClose).toHaveBeenCalledTimes(2);
  });
});
