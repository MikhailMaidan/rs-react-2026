import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { ErrorMessage } from '../ErrorMessage';
import { ITEMS_PER_PAGE, type CharactersData } from '../../api/charactersApi';
import { Link } from '../../i18n/navigation';
import { getAssetUrl } from '../../utils/assets';
import { getCharacterId, makeSearchHref } from '../../utils/searchNavigation';
import { RefreshPageButton } from './RefreshPageButton';
import { SelectItemCheckbox } from './SelectItemCheckbox';

interface ServerResultsProps {
  charactersData: CharactersData;
  currentPage: number;
  errorMessage: string;
  searchTerm: string;
}

const menuIcon = getAssetUrl('menu-svgrepo-com.svg');
const maxPageButtons = 9;

export const ServerResults = ({
  charactersData,
  currentPage,
  errorMessage,
  searchTerm,
}: ServerResultsProps) => {
  const t = useTranslations('Results');
  const cardListT = useTranslations('CardList');
  const totalPages = Math.min(
    maxPageButtons,
    Math.ceil(charactersData.totalItems / ITEMS_PER_PAGE)
  );
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
  const subtitle = searchTerm
    ? t('showingFor', { term: searchTerm })
    : t('showingAll');

  return (
    <section className="mx-auto w-full max-w-[1500px] px-4 pb-8 sm:px-6">
      <div className="results-card">
        {errorMessage ? (
          <ErrorMessage message={errorMessage} showErrorButton={false} />
        ) : (
          <>
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <Image
                    src={menuIcon}
                    alt=""
                    width={24}
                    height={24}
                    unoptimized
                    className="icon-gold h-6 w-6"
                  />
                  <h2 className="text-[22px] font-bold leading-none text-white">
                    {t('title')}
                  </h2>
                </div>
                <p className="mt-2 text-xs text-zinc-300">{subtitle}</p>
              </div>

              <div className="results-total">
                {t('total', { count: charactersData.totalItems })}
              </div>
            </div>

            {charactersData.items.length === 0 ? (
              <div className="rounded-[8px] border border-yellow-400 bg-zinc-950/80 px-6 py-8 text-center text-base font-semibold text-zinc-300">
                {cardListT('empty')}
              </div>
            ) : (
              <div className="overflow-hidden rounded-[8px] border border-yellow-400 bg-zinc-950/80 shadow-[0_0_22px_rgba(250,204,21,0.08)]">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[640px] table-fixed border-collapse font-mono text-[14px] leading-snug">
                    <colgroup>
                      <col className="w-12" />
                      <col className="w-[40%]" />
                      <col className="w-[60%]" />
                    </colgroup>
                    <caption className="border-b border-yellow-400/60 px-4 py-2 text-center text-[16px] font-bold text-white">
                      {cardListT('caption')}
                    </caption>
                    <thead>
                      <tr className="border-b border-yellow-400/60 text-left text-zinc-100">
                        <th className="py-2 pl-4 pr-1 font-semibold">
                          {cardListT('select')}
                        </th>
                        <th className="py-2 pl-5 pr-4 font-semibold">
                          {cardListT('itemName')}
                        </th>
                        <th className="py-2 pl-4 pr-6 font-semibold">
                          {cardListT('itemDescription')}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {charactersData.items.map((item) => {
                        const detailsHref = makeSearchHref({
                          detailsId: getCharacterId(item.url),
                          page: currentPage,
                          searchTerm,
                        });

                        return (
                          <tr
                            key={item.url}
                            className="border-b border-yellow-400/40 transition hover:bg-yellow-400/10 last:border-b-0"
                          >
                            <td className="w-12 py-2 pl-4 pr-1 align-top">
                              <SelectItemCheckbox item={item} />
                            </td>
                            <td className="py-2 pl-5 pr-4 align-top text-white">
                              <Link href={detailsHref} className="block">
                                {item.name}
                              </Link>
                            </td>
                            <td className="py-2 pl-4 pr-6 align-top text-zinc-200">
                              <Link href={detailsHref} className="block">
                                {item.description}
                              </Link>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
              {totalPages > 0 && (
                <>
                  <div className="flex items-center gap-3">
                    {charactersData.hasPreviousPage ? (
                      <Link
                        href={makeSearchHref({
                          page: currentPage - 1,
                          searchTerm,
                        })}
                        className="pagination-button"
                      >
                        {t('previous')}
                      </Link>
                    ) : (
                      <span className="pagination-button cursor-not-allowed border-zinc-700 text-zinc-500 opacity-70">
                        {t('previous')}
                      </span>
                    )}
                    {charactersData.hasNextPage ? (
                      <Link
                        href={makeSearchHref({
                          page: currentPage + 1,
                          searchTerm,
                        })}
                        className="pagination-button"
                      >
                        {t('next')}
                      </Link>
                    ) : (
                      <span className="pagination-button cursor-not-allowed border-zinc-700 text-zinc-500 opacity-70">
                        {t('next')}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap justify-start gap-2 lg:justify-center">
                    {pages.map((page) =>
                      page === currentPage ? (
                        <span
                          key={page}
                          className="flex h-9 w-9 items-center justify-center rounded-md border border-yellow-400 bg-yellow-400 text-sm font-bold text-black shadow-[0_0_20px_rgba(250,204,21,0.24)]"
                        >
                          {page}
                        </span>
                      ) : (
                        <Link
                          key={page}
                          href={makeSearchHref({ page, searchTerm })}
                          className="flex h-9 w-9 items-center justify-center rounded-md border border-yellow-400 bg-zinc-950/80 text-sm font-bold text-white transition hover:bg-yellow-400/10"
                        >
                          {page}
                        </Link>
                      )
                    )}
                  </div>
                </>
              )}

              <div className="grid w-full grid-cols-1 gap-3 lg:col-start-3 lg:w-auto lg:min-w-[140px] lg:justify-self-end">
                <RefreshPageButton
                  className="pagination-button w-full"
                  label={t('refresh')}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};
