import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { describe, expect, it } from 'vitest';
import { toggleSelectedItem } from '../../store/selectedItemsSlice';
import { createAppStore } from '../../store';
import { mockCharacterResults } from '../../test-utils/characters';
import { renderWithIntl } from '../../test-utils/renderWithIntl';
import { SelectedItemsFlyout } from './SelectedItemsFlyout';

describe('SelectedItemsFlyout', () => {
  const renderFlyout = (withItems = true) => {
    const store = createAppStore();

    if (withItems) {
      store.dispatch(toggleSelectedItem(mockCharacterResults[0]));
      store.dispatch(toggleSelectedItem(mockCharacterResults[1]));
    }

    const view = renderWithIntl(
      <Provider store={store}>
        <SelectedItemsFlyout />
      </Provider>
    );

    return {
      ...view,
      store,
    };
  };

  it('does not render when selected items list is empty', () => {
    renderFlyout(false);

    expect(screen.queryByText(/selected:/i)).not.toBeInTheDocument();
  });

  it('shows selected items count', () => {
    renderFlyout();

    expect(screen.getByText('Selected: 2')).toBeInTheDocument();
  });

  it('unselects all items', async () => {
    const user = userEvent.setup();
    const { store } = renderFlyout();

    await user.click(screen.getByRole('button', { name: /unselect all/i }));

    expect(store.getState().selectedItems.items).toEqual([]);
    expect(screen.queryByText(/selected:/i)).not.toBeInTheDocument();
  });

  it('posts selected items to csv route', () => {
    renderFlyout();

    const form = screen.getByRole('form', { name: /download/i });
    const itemsInput = form.querySelector<HTMLInputElement>(
      'input[name="items"]'
    );

    expect(form).toHaveAttribute('action', '/api/export-csv');
    expect(form).toHaveAttribute('method', 'post');
    expect(itemsInput).not.toBeNull();
    expect(itemsInput?.value).toBe(
      JSON.stringify([mockCharacterResults[0], mockCharacterResults[1]])
    );
    expect(screen.getByRole('button', { name: /download/i })).toHaveAttribute(
      'type',
      'submit'
    );
  });
});
