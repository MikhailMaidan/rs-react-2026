'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useDispatch } from 'react-redux';
import { Search } from './components/Search';
import { Results } from './components/Results';
import { ErrorBoundary } from './components/ErrorBoundary';
import { NotFound } from './components/NotFound';
import { SelectedItemsFlyout } from './components/SelectedItemsFlyout';
import { DetailsPanel } from './components/DetailsPanel';
import {
  charactersQueryApi,
  useGetCharactersQuery,
} from './api/charactersQueryApi';
import { SEARCH_TERM_STORAGE_KEY } from './constants/localStorage';
import { getAssetUrl } from './utils/assets';
import { useLocalStorage } from './hooks/useLocalStorage';
import { usePathname, useRouter } from './i18n/navigation';
import type { CharacterResult } from './types/character';
import type { AppDispatch } from './store';

const getPageFromSearchParams = (searchParams: URLSearchParams) => {
  const page = Number(searchParams.get('page'));

  return Number.isInteger(page) && page > 0 ? page : 1;
};

const getCharacterId = (url: string) => {
  const parts = url.split('/').filter(Boolean);

  return parts[parts.length - 1];
};

const allowedSearchParams = ['page', 'details'];

const App = () => {
  const t = useTranslations('ErrorMessage');
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useLocalStorage(
    SEARCH_TERM_STORAGE_KEY,
    ''
  );
  const currentPage = getPageFromSearchParams(searchParams);
  const detailsId = searchParams.get('details');
  const hasUnknownSearchParam = Array.from(searchParams.keys()).some(
    (key) => !allowedSearchParams.includes(key)
  );
  const [hasResultsBoundaryError, setHasResultsBoundaryError] = useState(false);
  const [resultsBoundaryKey, setResultsBoundaryKey] = useState(0);
  const {
    data: charactersData,
    error: charactersError,
    isFetching,
    refetch: refetchCharacters,
  } = useGetCharactersQuery(
    { searchTerm, page: currentPage },
    { skip: hasUnknownSearchParam }
  );
  const items = charactersData?.items ?? [];
  const totalItems = charactersData?.totalItems ?? 0;
  const hasNextPage = charactersData?.hasNextPage ?? false;
  const hasPreviousPage = charactersData?.hasPreviousPage ?? false;
  const errorMessage =
    charactersError &&
    'error' in charactersError &&
    typeof charactersError.error === 'string'
      ? charactersError.error
      : charactersError
        ? t('message')
        : '';

  const moveToUrl = useCallback(
    (nextSearchParams: URLSearchParams, replace = false) => {
      const queryString = nextSearchParams.toString();
      const nextUrl = queryString ? `${pathname}?${queryString}` : pathname;

      if (replace) {
        router.replace(nextUrl, { scroll: false });
      } else {
        router.push(nextUrl, { scroll: false });
      }
    },
    [pathname, router]
  );

  const updatePageInUrl = useCallback(
    (page: number, replace = false) => {
      const nextSearchParams = new URLSearchParams(searchParams.toString());
      nextSearchParams.set('page', String(page));
      nextSearchParams.delete('details');
      moveToUrl(nextSearchParams, replace);
    },
    [searchParams, moveToUrl]
  );

  const openDetails = (item: CharacterResult) => {
    const nextSearchParams = new URLSearchParams(searchParams.toString());
    nextSearchParams.set('page', String(currentPage));
    nextSearchParams.set('details', getCharacterId(item.url));
    moveToUrl(nextSearchParams);
  };

  const closeDetails = () => {
    const nextSearchParams = new URLSearchParams(searchParams.toString());
    nextSearchParams.delete('details');
    moveToUrl(nextSearchParams);
  };

  useEffect(() => {
    if (hasUnknownSearchParam) {
      return;
    }

    if (searchParams.get('page') !== String(currentPage)) {
      updatePageInUrl(currentPage, true);
    }
  }, [currentPage, searchParams, updatePageInUrl, hasUnknownSearchParam]);

  const handleSearch = (newSearchTerm: string) => {
    const isSameSearch = newSearchTerm === searchTerm && currentPage === 1;

    if (isSameSearch && !hasResultsBoundaryError) {
      return;
    }

    setHasResultsBoundaryError(false);
    setResultsBoundaryKey((key) => key + 1);

    if (!isSameSearch) {
      setSearchTerm(newSearchTerm);
      updatePageInUrl(1);
    } else {
      refetchCharacters();
    }
  };

  const handleResultsBoundaryError = () => {
    setHasResultsBoundaryError(true);
  };

  const handleResultsBoundaryReset = () => {
    setHasResultsBoundaryError(false);
    setResultsBoundaryKey((key) => key + 1);
  };

  const handleRetry = () => {
    refetchCharacters();
  };

  const handleRefreshCache = () => {
    dispatch(
      charactersQueryApi.util.invalidateTags(['Characters', 'Character'])
    );
  };

  const handlePageChange = (page: number) => {
    if (page === currentPage) {
      return;
    }

    updatePageInUrl(page);
  };

  const handleNextPage = () => {
    updatePageInUrl(currentPage + 1);
  };

  const handlePreviousPage = () => {
    updatePageInUrl(currentPage - 1);
  };

  const backgroundAsset = getAssetUrl('background-image.png');

  if (hasUnknownSearchParam) {
    return (
      <main className="app-page">
        <NotFound />
      </main>
    );
  }

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
          <Search onSearch={handleSearch} />
          <div
            className={`mx-auto grid w-full max-w-[1800px] grid-cols-1 gap-5 ${
              detailsId ? 'xl:grid-cols-[minmax(0,1fr)_380px]' : ''
            }`}
          >
            <ErrorBoundary
              key={resultsBoundaryKey}
              onError={handleResultsBoundaryError}
              onReset={handleResultsBoundaryReset}
            >
              <Results
                items={items}
                searchTerm={searchTerm}
                currentPage={currentPage}
                totalItems={totalItems}
                hasNextPage={hasNextPage}
                hasPreviousPage={hasPreviousPage}
                isLoading={isFetching}
                errorMessage={errorMessage}
                onRetry={handleRetry}
                onRefreshCache={handleRefreshCache}
                onPageChange={handlePageChange}
                onNextPage={handleNextPage}
                onPreviousPage={handlePreviousPage}
                onItemSelect={openDetails}
              />
            </ErrorBoundary>
            <div className="px-6 pb-10 sm:px-9 xl:px-0 xl:pr-9">
              <DetailsPanel detailsId={detailsId} onClose={closeDetails} />
            </div>
          </div>
          <SelectedItemsFlyout />
        </div>
      </div>
    </main>
  );
};

export default App;
