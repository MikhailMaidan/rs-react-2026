import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CharacterResult } from '../types/character';

interface SelectedItemsState {
  items: CharacterResult[];
}

const initialState: SelectedItemsState = {
  items: [],
};

export const selectedItemsSlice = createSlice({
  name: 'selectedItems',
  initialState,
  reducers: {
    toggleSelectedItem: (state, action: PayloadAction<CharacterResult>) => {
      const item = action.payload;
      const existingItem = state.items.find(
        (selectedItem) => selectedItem.url === item.url
      );

      if (existingItem) {
        return {
          items: state.items.filter(
            (selectedItem) => selectedItem.url !== item.url
          ),
        };
      }

      return {
        items: [...state.items, item],
      };
    },
    clearSelectedItems: () => {
      return {
        items: [],
      };
    },
  },
});

export const { toggleSelectedItem, clearSelectedItems } =
  selectedItemsSlice.actions;

export const selectedItemsReducer = selectedItemsSlice.reducer;
