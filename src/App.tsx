import { useCallback, useEffect, useState } from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';
import { Header } from './components/Header';
import { Search } from './components/Search';
import { Results } from './components/Results';
import { ErrorBoundary } from './components/ErrorBoundary';
import { NotFound } from './components/NotFound';
import { SelectedItemsFlyout } from './components/SelectedItemsFlyout';
import { useGetCharactersQuery } from './api/charactersQueryApi';
import { SEARCH_TERM_STORAGE_KEY } from './constants/localStorage';
import { getAssetUrl } from './utils/assets';
import { useLocalStorage } from './hooks/useLocalStorage';
import type { CharacterResult } from './types/character';

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
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useLocalStorage(
    SEARCH_TERM_STORAGE_KEY,
    ''
  );
  const currentPage = getPageFromSearchParams(searchParams);
  const detailsId = searchParams.get('details');
  const hasUnknownSearchParam = Array.from(searchParams.keys()).some(
    (key) => !allowedSearchParams.includes(key)
  );
  const [hasResultsBoundaryError, setHasResultsBoundaryError] =
    useState(false);
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
  const errorMessage = charactersError
    ? 'Unable to load results. Please try again.'
    : '';

  const updatePageInUrl = useCallback(
    (page: number, replace = false) => {
      const nextSearchParams = new URLSearchParams(searchParams);
      nextSearchParams.set('page', String(page));
      nextSearchParams.delete('details');
      setSearchParams(nextSearchParams, { replace });
    },
    [searchParams, setSearchParams]
  );

  const openDetails = (item: CharacterResult) => {
    const nextSearchParams = new URLSearchParams(searchParams);
    nextSearchParams.set('page', String(currentPage));
    nextSearchParams.set('details', getCharacterId(item.url));
    setSearchParams(nextSearchParams);
  };

  const closeDetails = () => {
    const nextSearchParams = new URLSearchParams(searchParams);
    nextSearchParams.delete('details');
    setSearchParams(nextSearchParams);
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

  const backgroundImage = `url("${getAssetUrl('background-image.png')}")`;

  if (hasUnknownSearchParam) {
    return <NotFound />;
  }

  return (
    <main className="app-page">
      <Header />
      <div
        className="min-h-[calc(100vh-74px)] space-y-4 bg-cover bg-center bg-fixed py-4"
        style={{ backgroundImage }}
      >
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
              onPageChange={handlePageChange}
              onNextPage={handleNextPage}
              onPreviousPage={handlePreviousPage}
              onItemSelect={openDetails}
            />
          </ErrorBoundary>
          <div className="px-6 pb-10 sm:px-9 xl:px-0 xl:pr-9">
            <Outlet context={{ onClose: closeDetails }} />
          </div>
        </div>
        <SelectedItemsFlyout />
      </div>
    </main>
  );
};

export default App;
