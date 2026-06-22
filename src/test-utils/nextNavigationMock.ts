import { useSyncExternalStore } from 'react';
import { vi } from 'vitest';

let pathname = '/';
let search = '';

const listeners = new Set<() => void>();

const subscribe = (listener: () => void) => {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
};

const tellListeners = () => {
  listeners.forEach((listener) => listener());
};

const moveToUrl = (url: string) => {
  const nextUrl = new URL(url, 'http://localhost');
  pathname = nextUrl.pathname;
  search = nextUrl.search;
  tellListeners();
};

export const routerMock = {
  push: vi.fn((url: string) => {
    moveToUrl(url);
  }),
  replace: vi.fn((url: string) => {
    moveToUrl(url);
  }),
};

export const setMockUrl = (url: string) => {
  moveToUrl(url);
};

export const resetMockNavigation = () => {
  pathname = '/';
  search = '';
  routerMock.push.mockClear();
  routerMock.replace.mockClear();
  tellListeners();
};

export const useMockPathname = () => {
  return useSyncExternalStore(
    subscribe,
    () => pathname,
    () => pathname
  );
};

export const useMockSearch = () => {
  return useSyncExternalStore(
    subscribe,
    () => search,
    () => search
  );
};

export const useMockSearchParams = () => {
  const currentSearch = useMockSearch();

  return new URLSearchParams(currentSearch);
};
