import Image from 'next/image';
import { SelectedItemsFlyout } from '../SelectedItemsFlyout';
import { getAssetUrl } from '../../utils/assets';
import { makeSearchHref } from '../../utils/searchNavigation';
import { SearchForm } from './SearchForm';
import { ServerDetailsPanel } from './ServerDetailsPanel';
import { ServerResults } from './ServerResults';
import type { CharactersData } from '../../api/charactersApi';
import type { Locale } from '../../i18n/routing';
import type { Character } from '../../types/character';

interface SearchPageProps {
  character: Character | null;
  charactersData: CharactersData;
  currentPage: number;
  detailsErrorMessage: string;
  detailsId: string | null;
  locale: Locale;
  resultsErrorMessage: string;
  searchTerm: string;
}

export const SearchPage = ({
  character,
  charactersData,
  currentPage,
  detailsErrorMessage,
  detailsId,
  locale,
  resultsErrorMessage,
  searchTerm,
}: SearchPageProps) => {
  const backgroundAsset = getAssetUrl('background-image.png');
  const hasDetails = detailsId !== null;
  const closeDetailsHref = makeSearchHref({
    page: currentPage,
    searchTerm,
  });

  return (
    <main className="app-page">
      <div className="relative min-h-[calc(100vh-74px)] space-y-4 overflow-hidden py-4">
        <Image
          src={backgroundAsset}
          alt=""
          fill
          priority
          sizes="100vw"
          className="pointer-events-none object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative z-10 space-y-4">
          <SearchForm locale={locale} searchTerm={searchTerm} />
          <div
            className={`mx-auto grid w-full max-w-[1800px] grid-cols-1 gap-5 ${
              hasDetails ? 'xl:grid-cols-[minmax(0,1fr)_380px]' : ''
            }`}
          >
            <ServerResults
              charactersData={charactersData}
              currentPage={currentPage}
              errorMessage={resultsErrorMessage}
              searchTerm={searchTerm}
            />
            {hasDetails && (
              <div className="px-6 pb-10 sm:px-9 xl:px-0 xl:pr-9">
                <ServerDetailsPanel
                  character={character}
                  closeHref={closeDetailsHref}
                  errorMessage={detailsErrorMessage}
                />
              </div>
            )}
          </div>
          <SelectedItemsFlyout />
        </div>
      </div>
    </main>
  );
};
