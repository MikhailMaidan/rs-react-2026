import { useState } from 'react';

export function useLocalStorage(key: string, initialValue: string) {
  const [value, setValue] = useState<string>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    return window.localStorage.getItem(key) ?? initialValue;
  });

  const saveValue = (newValue: string) => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(key, newValue);
    }

    setValue(newValue);
  };

  return [value, saveValue] as const;
}
