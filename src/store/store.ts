import { configureStore } from '@reduxjs/toolkit';
import { selectedItemsReducer } from './selectedItemsSlice';

export const createAppStore = () =>
  configureStore({
    reducer: {
      selectedItems: selectedItemsReducer,
    },
  });

export const store = createAppStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
