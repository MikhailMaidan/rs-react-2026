import { useState, type ChangeEvent, type FormEvent } from 'react';
import { SEARCH_TERM_STORAGE_KEY } from '../../constants/localStorage';
import { getAssetUrl } from '../../utils/assets';
import { useLocalStorage } from '../../hooks/useLocalStorage';

const magnifierIcon = getAssetUrl('magnifier-svgrepo-com.svg');

interface SearchProps {
  onSearch: (searchTerm: string) => void;
}

export const Search = ({ onSearch }: SearchProps) => {
  const [savedSearchTerm] = useLocalStorage(SEARCH_TERM_STORAGE_KEY, '');
  const [searchTerm, setSearchTerm] = useState(savedSearchTerm);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedSearchTerm = searchTerm.trim();
    setSearchTerm(trimmedSearchTerm);
    onSearch(trimmedSearchTerm);
  };

  return (
    <section className="mx-auto max-w-[1500px] px-4 sm:px-6">
      <div className="rounded-[8px] border border-yellow-400 bg-black/85 p-3 shadow-[0_0_18px_rgba(250,204,21,0.08)]">
        <div className="rounded-[6px] border border-yellow-400/60 bg-zinc-950/70 px-4 py-4">
          <div>
            <div className="flex items-center gap-3">
              <img
                src={magnifierIcon}
                alt=""
                aria-hidden="true"
                className="icon-gold h-6 w-6"
              />
              <h1 className="text-[22px] font-bold leading-none text-white">
                Search
              </h1>
            </div>

            <p className="mt-2 text-xs text-zinc-200">
              Enter a term to search for items. Your last search is saved.
            </p>
          </div>

          <form
            className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end"
            onSubmit={handleSubmit}
          >
            <input
              type="search"
              placeholder="Search items..."
              value={searchTerm}
              className="search-input"
              onChange={handleChange}
            />
            <button type="submit" className="search-button">
              <img
                src={magnifierIcon}
                alt=""
                aria-hidden="true"
                className="icon-black h-5 w-5"
              />
              Search
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
