import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import AboutPage from './app/[locale]/about/page';
import NotFoundPage from './app/[locale]/not-found';
import { renderWithIntl } from './test-utils/renderWithIntl';

describe('routes', () => {
  it('renders About page for /about', () => {
    renderWithIntl(<AboutPage />);

    expect(screen.getByText(/about the creator/i)).toBeInTheDocument();
  });

  it('renders 404 page for unknown routes', () => {
    renderWithIntl(<NotFoundPage />);

    expect(
      screen.getByRole('heading', { name: /page not found/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /back to search/i })
    ).toHaveAttribute('href', '/en');
  });
});
