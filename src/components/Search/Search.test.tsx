import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { SEARCH_TERM_STORAGE_KEY } from '../../constants/localStorage';
import { Search } from './Search';

describe('Search', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('shows empty input when localStorage is empty', () => {
    render(<Search onSearch={vi.fn()} onErrorButtonClick={vi.fn()} />);

    expect(screen.getByRole('searchbox')).toHaveValue('');
  });

  it('shows a previously saved search term from localStorage', () => {
    localStorage.setItem(SEARCH_TERM_STORAGE_KEY, 'vader');

    render(<Search onSearch={vi.fn()} onErrorButtonClick={vi.fn()} />);

    expect(screen.getByRole('searchbox')).toHaveValue('vader');
  });

  it('submits the trimmed search term and keeps the trimmed value visible', async () => {
    const user = userEvent.setup();
    const onSearch = vi.fn();
    render(<Search onSearch={onSearch} onErrorButtonClick={vi.fn()} />);

    await user.type(screen.getByRole('searchbox'), '  leia  ');
    await user.click(screen.getByRole('button', { name: /^search$/i }));

    expect(onSearch).toHaveBeenCalledWith('leia');
    expect(screen.getByRole('searchbox')).toHaveValue('leia');
  });

  it('calls the supplied error handler from the error button', async () => {
    const user = userEvent.setup();
    const onErrorButtonClick = vi.fn();
    render(
      <Search onSearch={vi.fn()} onErrorButtonClick={onErrorButtonClick} />
    );

    await user.click(screen.getByRole('button', { name: /error button/i }));

    expect(onErrorButtonClick).toHaveBeenCalledTimes(1);
  });
});
