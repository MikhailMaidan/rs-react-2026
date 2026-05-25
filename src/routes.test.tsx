import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { About } from './components/About';
import { NotFound } from './components/NotFound';

const renderRoute = (route: string) => {
  render(
    <MemoryRouter initialEntries={[route]}>
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </MemoryRouter>
  );
};

describe('routes', () => {
  it('renders About page for /about', () => {
    renderRoute('/about');

    expect(screen.getByText(/about the creator/i)).toBeInTheDocument();
  });

  it('renders 404 page for unknown routes', () => {
    renderRoute('/missing-page');

    expect(
      screen.getByRole('heading', { name: /page not found/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /back to search/i })).toHaveAttribute(
      'href',
      '/'
    );
  });
});
