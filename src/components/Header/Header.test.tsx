import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { ThemeProvider } from '../../context';
import { Header } from './Header';

describe('Header', () => {
  const renderHeader = () => {
    render(
      <ThemeProvider>
        <Header />
      </ThemeProvider>
    );
  };

  it('renders logo image', () => {
    renderHeader();

    expect(screen.getByRole('img', { name: 'Starforge' })).toBeInTheDocument();
    expect(screen.getByLabelText(/go to main page/i)).toHaveAttribute(
      'href',
      '/'
    );
    expect(screen.getByRole('link', { name: /plug/i })).toHaveAttribute(
      'href',
      '/plug'
    );
    expect(screen.getByRole('link', { name: /about/i })).toHaveAttribute(
      'href',
      '/about'
    );
  });

  it('changes theme after button click', async () => {
    const user = userEvent.setup();

    renderHeader();

    expect(document.documentElement.dataset.theme).toBe('dark');

    await user.click(screen.getByRole('button', { name: /light/i }));

    expect(document.documentElement.dataset.theme).toBe('light');
    expect(screen.getByRole('button', { name: /dark/i })).toBeInTheDocument();
  });
});
