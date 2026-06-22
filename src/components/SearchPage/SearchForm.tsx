import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { searchCharactersAction } from '../../app/[locale]/actions';
import { getAssetUrl } from '../../utils/assets';
import type { Locale } from '../../i18n/routing';

interface SearchFormProps {
  locale: Locale;
  searchTerm: string;
}

const magnifierIcon = getAssetUrl('magnifier-svgrepo-com.svg');

export const SearchForm = ({ locale, searchTerm }: SearchFormProps) => {
  const t = useTranslations('Search');
  const action = searchCharactersAction.bind(null, locale);

  return (
    <section className="mx-auto max-w-[1500px] px-4 sm:px-6">
      <div className="rounded-[8px] border border-yellow-400 bg-black/85 p-3 shadow-[0_0_18px_rgba(250,204,21,0.08)]">
        <div className="rounded-[6px] border border-yellow-400/60 bg-zinc-950/70 px-4 py-4">
          <div>
            <div className="flex items-center gap-3">
              <Image
                src={magnifierIcon}
                alt=""
                width={24}
                height={24}
                unoptimized
                className="icon-gold h-6 w-6"
              />
              <h1 className="text-[22px] font-bold leading-none text-white">
                {t('title')}
              </h1>
            </div>

            <p className="mt-2 text-xs text-zinc-200">{t('description')}</p>
          </div>

          <form
            action={action}
            className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end"
          >
            <input
              type="search"
              name="search"
              placeholder={t('placeholder')}
              defaultValue={searchTerm}
              className="search-input"
            />
            <button type="submit" className="search-button">
              <Image
                src={magnifierIcon}
                alt=""
                width={20}
                height={20}
                unoptimized
                className="icon-black h-5 w-5"
              />
              {t('submit')}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
