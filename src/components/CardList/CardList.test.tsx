import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { mockCharacterResults } from '../../test-utils/characters';
import { CardList } from './CardList';

describe('CardList', () => {
  it('renders table with cards', () => {
    render(<CardList items={mockCharacterResults} />);

    expect(screen.getByText('Item Name')).toBeInTheDocument();
    expect(screen.getByText('Item Description')).toBeInTheDocument();
    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText('Leia Organa')).toBeInTheDocument();
  });

  it('renders empty message', () => {
    render(<CardList items={[]} />);

    expect(screen.getByText('No results found')).toBeInTheDocument();
  });
});
