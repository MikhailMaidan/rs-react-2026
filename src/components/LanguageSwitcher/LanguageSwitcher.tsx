'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import type { ChangeEvent } from 'react';
import { routing, type Locale } from '../../i18n/routing';
import { usePathname, useRouter } from '../../i18n/navigation';

export const LanguageSwitcher = () => {
  const t = useTranslations('Header');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = event.target.value as Locale;
    const queryString = searchParams.toString();
    const nextPath = queryString ? `${pathname}?${queryString}` : pathname;

    router.replace(nextPath, { locale: nextLocale, scroll: false });
  };

  return (
    <select
      aria-label={t('languageLabel')}
      className="theme-button language-select"
      value={locale}
      onChange={handleChange}
    >
      {routing.locales.map((item) => (
        <option key={item} value={item}>
          {item === 'en' ? t('languageEnglish') : t('languageRussian')}
        </option>
      ))}
    </select>
  );
};
