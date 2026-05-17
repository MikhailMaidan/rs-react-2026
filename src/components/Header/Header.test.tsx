import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { Header } from './Header';

describe('Header', () => {
  it('renders logo image', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByRole('img', { name: 'Starforge' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /about/i })).toHaveAttribute(
      'href',
      '/about'
    );
  });
});
