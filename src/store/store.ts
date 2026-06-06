import { configureStore } from '@reduxjs/toolkit';
import { charactersQueryApi } from '../api/charactersQueryApi';
import { formsReducer } from './formsSlice';
import { selectedItemsReducer } from './selectedItemsSlice';

export const createAppStore = () =>
  configureStore({
    reducer: {
      [charactersQueryApi.reducerPath]: charactersQueryApi.reducer,
      forms: formsReducer,
      selectedItems: selectedItemsReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(charactersQueryApi.middleware),
  });

export const store = createAppStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
