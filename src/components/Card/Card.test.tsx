import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { mockCharacterResults } from '../../test-utils/characters';
import { Card } from './Card';

describe('Card', () => {
  it('renders character name and description', () => {
    render(
      <table>
        <tbody>
          <Card item={mockCharacterResults[0]} />
        </tbody>
      </table>
    );

    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    expect(
      screen.getByText('male, born 19BBY, height 172 cm, mass 77 kg.')
    ).toBeInTheDocument();
  });
});
