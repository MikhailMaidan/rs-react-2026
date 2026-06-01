import { CardList } from '../CardList';
import { ErrorButton } from '../ErrorButton';
import { ErrorMessage } from '../ErrorMessage';
import { Loader } from '../Loader';
import { ITEMS_PER_PAGE } from '../../api/charactersApi';
import { getAssetUrl } from '../../utils/assets';
import type { CharacterResult } from '../../types/character';

interface ResultsProps {
  items: CharacterResult[];
  searchTerm: string;
  currentPage: number;
  totalItems: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  isLoading: boolean;
  errorMessage: string;
  onRetry: () => void;
  onRefreshCache: () => void;
  onPageChange: (page: number) => void;
  onNextPage: () => void;
  onPreviousPage: () => void;
  onItemSelect: (item: CharacterResult) => void;
}

const menuIcon = getAssetUrl('menu-svgrepo-com.svg');
const maxPageButtons = 9;

export const Results = ({
  items,
  searchTerm,
  currentPage,
  totalItems,
  hasNextPage,
  hasPreviousPage,
  isLoading,
  errorMessage,
  onRetry,
  onRefreshCache,
  onPageChange,
  onNextPage,
  onPreviousPage,
  onItemSelect,
}: ResultsProps) => {
  const subtitle = searchTerm
    ? `Showing results for "${searchTerm}"`
    : 'Showing results for all items';
  const totalPages = Math.min(
    maxPageButtons,
    Math.ceil(totalItems / ITEMS_PER_PAGE)
  );
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <section className="mx-auto w-full max-w-[1500px] px-4 pb-8 sm:px-6">
      <div className="results-card">
        {isLoading && <Loader place="results" />}

        {errorMessage ? (
          <ErrorMessage message={errorMessage} onRetry={onRetry} />
        ) : (
          <>
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <img
                    src={menuIcon}
                    className="icon-gold h-6 w-6"
                  />
                  <h2 className="text-[22px] font-bold leading-none text-white">
                    Results
                  </h2>
                </div>
                <p className="mt-2 text-xs text-zinc-300">{subtitle}</p>
              </div>

              <div className="results-total">Total: {totalItems} items</div>
            </div>

            <CardList items={items} onItemSelect={onItemSelect} />

            <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
              {totalPages > 0 && (
                <>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      className="pagination-button"
                      disabled={isLoading || !hasPreviousPage}
                      onClick={onPreviousPage}
                    >
                      Previous
                    </button>
                    <button
                      type="button"
                      className="pagination-button"
                      disabled={isLoading || !hasNextPage}
                      onClick={onNextPage}
                    >
                      Next
                    </button>
                  </div>

                  <div className="flex flex-wrap justify-start gap-2 lg:justify-center">
                    {pages.map((page) => (
                      <button
                        key={page}
                        type="button"
                        className={`flex h-9 w-9 cursor-pointer items-center justify-center rounded-md border text-sm font-bold transition disabled:cursor-not-allowed disabled:border-zinc-700 disabled:text-zinc-500 disabled:opacity-70 ${
                          page === currentPage
                            ? 'border-yellow-400 bg-yellow-400 text-black shadow-[0_0_20px_rgba(250,204,21,0.24)]'
                            : 'border-yellow-400 bg-zinc-950/80 text-white hover:bg-yellow-400/10'
                        }`}
                        disabled={isLoading}
                        onClick={() => onPageChange(page)}
                      >
                        {page}
                      </button>
                    ))}
                  </div>
                </>
              )}

              <div className="grid w-full grid-cols-2 gap-3 lg:col-start-3 lg:w-auto lg:min-w-[280px] lg:justify-self-end">
                <button
                  type="button"
                  className="pagination-button w-full"
                  disabled={isLoading}
                  onClick={onRefreshCache}
                >
                  Refresh
                </button>
                <ErrorButton />
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};
