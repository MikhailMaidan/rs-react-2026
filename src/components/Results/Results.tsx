import { Component, type CSSProperties } from 'react';
import { CardList } from '../CardList/CardList';
import { ErrorButton } from '../ErrorButton/ErrorButton';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import { Loader } from '../Loader/Loader';
import type { CharacterResult } from '../../types/character';

interface ResultsProps {
  items: CharacterResult[];
  searchTerm: string;
  isLoading: boolean;
  errorMessage: string;
  onRetry: () => void;
}

const menuIcon = '/menu-svgrepo-com.svg';

const getIconMask = (icon: string): CSSProperties => ({
  WebkitMask: `url(${icon}) center / contain no-repeat`,
  mask: `url(${icon}) center / contain no-repeat`,
});

export class Results extends Component<ResultsProps> {
  getSubtitle() {
    const { searchTerm } = this.props;

    return searchTerm
      ? `Showing results for "${searchTerm}"`
      : 'Showing results for all items';
  }

  render() {
    const { items, isLoading, errorMessage, onRetry } = this.props;

    return (
      <section className="mx-auto max-w-[1800px] px-6 pb-10 sm:px-9">
        <div className="relative rounded-[14px] border border-zinc-800 bg-black/85 p-6 shadow-[0_0_30px_rgba(255,255,255,0.03)] sm:p-8">
          {isLoading && <Loader />}

          {errorMessage ? (
            <ErrorMessage message={errorMessage} onRetry={onRetry} />
          ) : (
            <>
              <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="flex items-center gap-5">
                    <span
                      aria-hidden="true"
                      className="h-12 w-12 bg-current text-yellow-400"
                      style={getIconMask(menuIcon)}
                    />
                    <h2 className="text-[42px] font-bold leading-none text-white">
                      Results
                    </h2>
                  </div>
                  <p className="mt-6 text-[24px] text-zinc-400">
                    {this.getSubtitle()}
                  </p>
                </div>

                <div className="rounded-lg border border-zinc-800 bg-zinc-950/80 px-5 py-3 text-[24px] font-bold text-yellow-400 shadow-[0_0_20px_rgba(250,204,21,0.08)]">
                  Total: {items.length} items
                </div>
              </div>

              <CardList items={items} />

              <div className="mt-7">
                <ErrorButton />
              </div>
            </>
          )}
        </div>
      </section>
    );
  }
}
