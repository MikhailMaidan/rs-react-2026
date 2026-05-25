import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { describe, expect, it, vi } from 'vitest';
import { mockCharacterResults } from '../../test-utils/characters';
import { createAppStore } from '../../store';
import { Card } from './Card';

describe('Card', () => {
  const renderCard = (onSelect = vi.fn()) => {
    const store = createAppStore();

    render(
      <Provider store={store}>
        <table>
          <tbody>
            <Card item={mockCharacterResults[0]} onSelect={onSelect} />
          </tbody>
        </table>
      </Provider>
    );

    return { onSelect, store };
  };

  it('renders character name and description', () => {
    renderCard();

    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    expect(
      screen.getByText('male, born 19BBY, height 172 cm, mass 77 kg.')
    ).toBeInTheDocument();
  });

  it('selects a character after row click', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();

    renderCard(onSelect);

    await user.click(screen.getByText('Luke Skywalker'));

    expect(onSelect).toHaveBeenCalledWith(mockCharacterResults[0]);
  });

  it('checks item without opening details', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    const { store } = renderCard(onSelect);

    await user.click(screen.getByRole('checkbox', { name: /select luke/i }));

    expect(onSelect).not.toHaveBeenCalled();
    expect(store.getState().selectedItems.items).toEqual([
      mockCharacterResults[0],
    ]);
  });

  it('unchecks selected item', async () => {
    const user = userEvent.setup();
    const { store } = renderCard();
    const checkbox = screen.getByRole('checkbox', { name: /select luke/i });

    await user.click(checkbox);
    await user.click(checkbox);

    expect(checkbox).not.toBeChecked();
    expect(store.getState().selectedItems.items).toEqual([]);
  });
});
