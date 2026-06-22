'use server';

import { redirect } from 'next/navigation';
import { routing, type Locale } from '../../i18n/routing';

const getSafeLocale = (locale: Locale) => {
  return routing.locales.includes(locale) ? locale : routing.defaultLocale;
};

export const searchCharactersAction = async (
  locale: Locale,
  formData: FormData
) => {
  const searchValue = formData.get('search');
  const searchTerm = typeof searchValue === 'string' ? searchValue.trim() : '';
  const params = new URLSearchParams({
    page: '1',
  });

  if (searchTerm) {
    params.set('search', searchTerm);
  }

  redirect(`/${getSafeLocale(locale)}?${params.toString()}`);
};
