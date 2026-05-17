import { useCallback, useEffect, useState } from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Search } from './components/Search/Search';
import { Results } from './components/Results/Results';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';
import { fetchCharacters } from './api/charactersApi';
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

export default function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [items, setItems] = useState<CharacterResult[]>([]);
  const [searchTerm, setSearchTerm] = useLocalStorage(
    SEARCH_TERM_STORAGE_KEY,
    ''
  );
  const currentPage = getPageFromSearchParams(searchParams);
  const detailsId = searchParams.get('details');
  const [totalItems, setTotalItems] = useState<number>(0);
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);
  const [hasPreviousPage, setHasPreviousPage] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [shouldThrowResultsError, setShouldThrowResultsError] =
    useState<boolean>(false);
  const [retryCount, setRetryCount] = useState<number>(0);

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

  const loadCharacters = useCallback(
    (currentSearchTerm: string, page: number, isActualRequest: () => boolean) => {
      fetchCharacters(currentSearchTerm, page)
        .then((data) => {
          if (!isActualRequest()) {
            return;
          }

          setItems(data.items);
          setTotalItems(data.totalItems);
          setHasNextPage(data.hasNextPage);
          setHasPreviousPage(data.hasPreviousPage);
          setIsLoading(false);
        })
        .catch((error: Error) => {
          if (!isActualRequest()) {
            return;
          }

          setErrorMessage(error.message);
          setIsLoading(false);
          setItems([]);
          setTotalItems(0);
          setHasNextPage(false);
          setHasPreviousPage(false);
        });
    },
    []
  );

  useEffect(() => {
    let isActualRequest = true;

    loadCharacters(searchTerm, currentPage, () => isActualRequest);

    return () => {
      isActualRequest = false;
    };
  }, [searchTerm, currentPage, retryCount, loadCharacters]);

  useEffect(() => {
    if (searchParams.get('page') !== String(currentPage)) {
      updatePageInUrl(currentPage, true);
    }
  }, [currentPage, searchParams, updatePageInUrl]);

  const handleSearch = (newSearchTerm: string) => {
    if (newSearchTerm === searchTerm && currentPage === 1) {
      return;
    }

    setIsLoading(true);
    setErrorMessage('');
    setSearchTerm(newSearchTerm);
    updatePageInUrl(1);
  };

  const handleErrorButtonClick = () => {
    setShouldThrowResultsError(true);
  };

  const handleResultsBoundaryReset = () => {
    setShouldThrowResultsError(false);
  };

  const handleRetry = () => {
    setIsLoading(true);
    setErrorMessage('');
    setRetryCount((currentRetryCount) => currentRetryCount + 1);
  };

  const handlePageChange = (page: number) => {
    if (page === currentPage) {
      return;
    }

    setIsLoading(true);
    setErrorMessage('');
    updatePageInUrl(page);
  };

  const handleNextPage = () => {
    setIsLoading(true);
    setErrorMessage('');
    updatePageInUrl(currentPage + 1);
  };

  const handlePreviousPage = () => {
    setIsLoading(true);
    setErrorMessage('');
    updatePageInUrl(currentPage - 1);
  };

  const backgroundImage = `url("${getAssetUrl('background-image.png')}")`;

  return (
    <main className="min-h-screen bg-black text-slate-100">
      <Header />
      <div
        className="min-h-[calc(100vh-96px)] space-y-5 bg-cover bg-center bg-fixed py-5"
        style={{ backgroundImage }}
      >
        <Search
          onSearch={handleSearch}
          onErrorButtonClick={handleErrorButtonClick}
        />
        <div
          className={`mx-auto grid max-w-[1800px] gap-5 ${
            detailsId ? 'xl:grid-cols-[minmax(0,1fr)_380px]' : ''
          }`}
        >
          <ErrorBoundary onReset={handleResultsBoundaryReset}>
            <Results
              items={items}
              searchTerm={searchTerm}
              currentPage={currentPage}
              totalItems={totalItems}
              hasNextPage={hasNextPage}
              hasPreviousPage={hasPreviousPage}
              isLoading={isLoading}
              errorMessage={errorMessage}
              shouldThrowError={shouldThrowResultsError}
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
      </div>
    </main>
  );
}
