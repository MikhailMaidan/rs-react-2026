import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import AboutPage from './app/about/page';
import NotFoundPage from './app/not-found';

describe('routes', () => {
  it('renders About page for /about', () => {
    render(<AboutPage />);

    expect(screen.getByText(/about the creator/i)).toBeInTheDocument();
  });

  it('renders 404 page for unknown routes', () => {
    render(<NotFoundPage />);

    expect(
      screen.getByRole('heading', { name: /page not found/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /back to search/i })
    ).toHaveAttribute('href', '/');
  });
});
