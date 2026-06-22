'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useTheme } from '../../context';
import { Link } from '../../i18n/navigation';
import { getAssetUrl } from '../../utils/assets';
import { LanguageSwitcher } from '../LanguageSwitcher';

export const Header = () => {
  const t = useTranslations('Header');
  const { theme, toggleTheme } = useTheme();
  const nextTheme = theme === 'dark' ? t('light') : t('dark');

  return (
    <header className="relative h-[66px] overflow-hidden border-b border-zinc-900 bg-black sm:h-[70px]">
      <Image
        src={getAssetUrl('header.png')}
        alt=""
        fill
        priority
        sizes="100vw"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/10" />

      <div className="relative z-10 mx-auto flex h-full max-w-[1500px] items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" aria-label={t('mainAria')}>
          <Image
            src={getAssetUrl('logo.png')}
            alt="Starforge"
            width={250}
            height={70}
            priority
            className="h-auto w-[220px] max-w-[52vw] object-contain mix-blend-screen sm:w-[250px] sm:max-w-[70vw]"
          />
        </Link>
        <div className="flex items-center gap-2 sm:gap-3">
          <nav className="hidden items-center gap-3 sm:flex">
            <Link href="/plug" className="header-link min-w-[96px]">
              {t('plug')}
            </Link>
            <Link href="/about" className="header-link min-w-[110px]">
              {t('about')}
            </Link>
          </nav>
          <LanguageSwitcher />
          <button type="button" className="theme-button" onClick={toggleTheme}>
            {nextTheme}
          </button>
        </div>
      </div>
    </header>
  );
};
