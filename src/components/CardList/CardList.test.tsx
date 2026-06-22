import { screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { describe, expect, it, vi } from 'vitest';
import { mockCharacterResults } from '../../test-utils/characters';
import { renderWithIntl } from '../../test-utils/renderWithIntl';
import { createAppStore } from '../../store';
import { CardList } from './CardList';

describe('CardList', () => {
  const renderCardList = (items = mockCharacterResults) => {
    renderWithIntl(
      <Provider store={createAppStore()}>
        <CardList items={items} onItemSelect={vi.fn()} />
      </Provider>
    );
  };

  it('renders table with cards', () => {
    renderCardList();

    expect(screen.getByText('Select')).toBeInTheDocument();
    expect(screen.getByText('Item Name')).toBeInTheDocument();
    expect(screen.getByText('Item Description')).toBeInTheDocument();
    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText('Leia Organa')).toBeInTheDocument();
  });

  it('renders empty message', () => {
    renderCardList([]);

    expect(screen.getByText('No results found')).toBeInTheDocument();
  });
});
