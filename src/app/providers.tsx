'use client';

import { Provider } from 'react-redux';
import type { ReactNode } from 'react';
import { ThemeProvider } from '../context';
import { store } from '../store';

interface ProvidersProps {
  children: ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <ThemeProvider>
      <Provider store={store}>{children}</Provider>
    </ThemeProvider>
  );
};
