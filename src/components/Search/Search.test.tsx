import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { SEARCH_TERM_STORAGE_KEY } from '../../constants/localStorage';
import { renderWithIntl } from '../../test-utils/renderWithIntl';
import { Search } from './Search';

describe('Search', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('shows empty input when localStorage is empty', () => {
    renderWithIntl(<Search onSearch={vi.fn()} />);

    expect(screen.getByRole('searchbox')).toHaveValue('');
  });

  it('shows a previously saved search term from localStorage', () => {
    localStorage.setItem(SEARCH_TERM_STORAGE_KEY, 'vader');

    renderWithIntl(<Search onSearch={vi.fn()} />);

    expect(screen.getByRole('searchbox')).toHaveValue('vader');
  });

  it('submits the trimmed search term and keeps the trimmed value visible', async () => {
    const user = userEvent.setup();
    const onSearch = vi.fn();
    renderWithIntl(<Search onSearch={onSearch} />);

    await user.type(screen.getByRole('searchbox'), '  leia  ');
    await user.click(screen.getByRole('button', { name: /^search$/i }));

    expect(onSearch).toHaveBeenCalledWith('leia');
    expect(screen.getByRole('searchbox')).toHaveValue('leia');
  });

  it('does not render error button', () => {
    renderWithIntl(<Search onSearch={vi.fn()} />);

    expect(
      screen.queryByRole('button', { name: /error button/i })
    ).not.toBeInTheDocument();
  });
});
