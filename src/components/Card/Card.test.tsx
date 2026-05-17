import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { mockCharacterResults } from '../../test-utils/characters';
import { Card } from './Card';

describe('Card', () => {
  it('renders character name and description', () => {
    render(
      <table>
        <tbody>
          <Card item={mockCharacterResults[0]} onSelect={vi.fn()} />
        </tbody>
      </table>
    );

    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    expect(
      screen.getByText('male, born 19BBY, height 172 cm, mass 77 kg.')
    ).toBeInTheDocument();
  });

  it('selects a character after row click', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();

    render(
      <table>
        <tbody>
          <Card item={mockCharacterResults[0]} onSelect={onSelect} />
        </tbody>
      </table>
    );

    await user.click(screen.getByText('Luke Skywalker'));

    expect(onSelect).toHaveBeenCalledWith(mockCharacterResults[0]);
  });
});
