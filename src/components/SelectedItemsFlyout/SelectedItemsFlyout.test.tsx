import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { describe, expect, it, vi } from 'vitest';
import { toggleSelectedItem } from '../../store/selectedItemsSlice';
import { createAppStore } from '../../store/store';
import { mockCharacterResults } from '../../test-utils/characters';
import { SelectedItemsFlyout } from './SelectedItemsFlyout';

describe('SelectedItemsFlyout', () => {
  const renderFlyout = (withItems = true) => {
    const store = createAppStore();

    if (withItems) {
      store.dispatch(toggleSelectedItem(mockCharacterResults[0]));
      store.dispatch(toggleSelectedItem(mockCharacterResults[1]));
    }

    render(
      <Provider store={store}>
        <SelectedItemsFlyout />
      </Provider>
    );

    return store;
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
    const store = renderFlyout();

    await user.click(screen.getByRole('button', { name: /unselect all/i }));

    expect(store.getState().selectedItems.items).toEqual([]);
    expect(screen.queryByText(/selected:/i)).not.toBeInTheDocument();
  });

  it('downloads selected items as csv', async () => {
    const user = userEvent.setup();
    const createObjectURL = vi
      .spyOn(URL, 'createObjectURL')
      .mockReturnValue('blob:items');
    const revokeObjectURL = vi
      .spyOn(URL, 'revokeObjectURL')
      .mockImplementation(() => {});
    const click = vi
      .spyOn(HTMLAnchorElement.prototype, 'click')
      .mockImplementation(() => {});

    renderFlyout();
    await user.click(screen.getByRole('button', { name: /download/i }));

    expect(createObjectURL).toHaveBeenCalledTimes(1);
    expect(click).toHaveBeenCalledTimes(1);
    expect(revokeObjectURL).toHaveBeenCalledWith('blob:items');

    createObjectURL.mockRestore();
    revokeObjectURL.mockRestore();
    click.mockRestore();
  });
});
