import { Component } from 'react';
import { CardList } from '../CardList/CardList';
import { ErrorButton } from '../ErrorButton/ErrorButton';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import { Loader } from '../Loader/Loader';
import { ITEMS_PER_PAGE } from '../../api/charactersApi';
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
  shouldThrowError: boolean;
  onRetry: () => void;
  onPageChange: (page: number) => void;
  onNextPage: () => void;
  onPreviousPage: () => void;
}

const menuIcon = '/menu-svgrepo-com.svg';
const maxPageButtons = 9;

export class Results extends Component<ResultsProps> {
  getSubtitle() {
    const { searchTerm } = this.props;

    return searchTerm
      ? `Showing results for "${searchTerm}"`
      : 'Showing results for all items';
  }

  render() {
    const {
      items,
      currentPage,
      totalItems,
      hasNextPage,
      hasPreviousPage,
      isLoading,
      errorMessage,
      onRetry,
      onPageChange,
      onNextPage,
      onPreviousPage,
      shouldThrowError,
    } = this.props;
    const totalPages = Math.min(
      maxPageButtons,
      Math.ceil(totalItems / ITEMS_PER_PAGE)
    );
    const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

    if (shouldThrowError) {
      throw new Error('Test application error');
    }

    return (
      <section className="mx-auto max-w-[1800px] px-6 pb-10 sm:px-9">
        <div className="relative rounded-[14px] border border-yellow-400 bg-black/85 p-6 shadow-[0_0_30px_rgba(250,204,21,0.08)] sm:p-8">
          {isLoading && <Loader />}

          {errorMessage ? (
            <ErrorMessage message={errorMessage} onRetry={onRetry} />
          ) : (
            <>
              <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="flex items-center gap-4">
                    <img
                      src={menuIcon}
                      alt=""
                      className="icon-gold h-10 w-10"
                    />
                    <h2 className="text-[30px] font-bold leading-none text-white">
                      Results
                    </h2>
                  </div>
                  <p className="mt-5 text-sm text-zinc-300">
                    {this.getSubtitle()}
                  </p>
                </div>

                <div className="rounded-lg border border-yellow-400 bg-zinc-950/80 px-5 py-3 text-[24px] font-bold text-yellow-400 shadow-[0_0_20px_rgba(250,204,21,0.08)]">
                  Total: {totalItems} items
                </div>
              </div>

              <CardList items={items} />

              <div className="mt-7 grid gap-5 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
                {totalPages > 0 && (
                  <>
                    <div className="flex items-center gap-4">
                      <button
                        type="button"
                        className="rounded-md border border-yellow-400 bg-zinc-950/80 px-5 py-3 font-semibold text-white transition hover:bg-yellow-400/10 disabled:cursor-not-allowed disabled:border-zinc-700 disabled:text-zinc-500 disabled:opacity-70"
                        disabled={!hasPreviousPage}
                        onClick={onPreviousPage}
                      >
                        Previous
                      </button>
                      <button
                        type="button"
                        className="rounded-md border border-yellow-400 bg-zinc-950/80 px-5 py-3 font-semibold text-white transition hover:bg-yellow-400/10 disabled:cursor-not-allowed disabled:border-zinc-700 disabled:text-zinc-500 disabled:opacity-70"
                        disabled={!hasNextPage}
                        onClick={onNextPage}
                      >
                        Next
                      </button>
                    </div>

                    <div className="flex flex-wrap justify-start gap-3 lg:justify-center">
                      {pages.map((page) => (
                        <button
                          key={page}
                          type="button"
                          className={`flex h-12 w-12 items-center justify-center rounded-md border font-bold transition ${
                            page === currentPage
                              ? 'border-yellow-400 bg-yellow-400 text-black shadow-[0_0_20px_rgba(250,204,21,0.24)]'
                              : 'border-yellow-400 bg-zinc-950/80 text-white hover:bg-yellow-400/10'
                          }`}
                          onClick={() => onPageChange(page)}
                        >
                          {page}
                        </button>
                      ))}
                    </div>
                  </>
                )}

                <div className="lg:col-start-3 lg:justify-self-end">
                  <ErrorButton />
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    );
  }
}
