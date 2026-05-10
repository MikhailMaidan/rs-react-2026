import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Header } from './Header';

describe('Header', () => {
  it('renders logo image', () => {
    render(<Header />);

    expect(screen.getByRole('img', { name: 'Starforge' })).toBeInTheDocument();
  });
});
