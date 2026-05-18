import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { About } from './About';

describe('About', () => {
  it('renders creator info and RS School link', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>
    );

    expect(screen.getByRole('img', { name: 'Future' })).toBeInTheDocument();
    expect(screen.getByText(/about the creator/i)).toBeInTheDocument();
    expect(screen.getByText(/dark lord of half-finished/i)).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /rs school react course/i })
    ).toHaveAttribute('href', 'https://rs.school/courses/reactjs');
    expect(screen.getByRole('link', { name: /main menu/i })).toHaveAttribute(
      'href',
      '/'
    );
  });
});
