import {
  Component,
  type CSSProperties,
  type ChangeEvent,
  type FormEvent,
} from 'react';
import { SEARCH_TERM_STORAGE_KEY } from '../../constants/localStorage';
import { normalizeSearchTerm } from '../../utils/normalizeSearchTerm';

const magnifierIcon = '/magnifier-svgrepo-com.svg';

const getIconMask = (icon: string): CSSProperties => ({
  WebkitMask: `url(${icon}) center / contain no-repeat`,
  mask: `url(${icon}) center / contain no-repeat`,
});

interface SearchProps {
  onSearch: (searchTerm: string) => void;
}

interface SearchState {
  searchTerm: string;
}

export class Search extends Component<SearchProps, SearchState> {
  state: SearchState = {
    searchTerm: localStorage.getItem(SEARCH_TERM_STORAGE_KEY) ?? '',
  };

  handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: event.target.value });
  };

  handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const searchTerm = normalizeSearchTerm(this.state.searchTerm);
    this.setState({ searchTerm });
    this.props.onSearch(searchTerm);
  };

  render() {
    return (
      <section className="mx-auto max-w-[1800px] px-6 sm:px-9">
        <div className="rounded-[10px] border border-zinc-800 bg-black/85 p-5">
          <div className="rounded-[8px] border border-zinc-800 bg-zinc-950/70 px-6 py-6">
            <div className="flex items-start justify-between gap-6">
              <div>
                <div className="flex items-center gap-4">
                  <span
                    aria-hidden="true"
                    className="h-10 w-10 bg-current text-yellow-400"
                    style={getIconMask(magnifierIcon)}
                  />
                  <h1 className="text-[30px] font-bold leading-none text-white">
                    Search
                  </h1>
                </div>

                <p className="mt-5 text-sm text-zinc-200">
                  Enter a term to search for items. Your last search is saved.
                </p>
              </div>
            </div>

            <form className="mt-6 flex gap-5" onSubmit={this.handleSubmit}>
              <input
                type="search"
                placeholder="Search items..."
                value={this.state.searchTerm}
                className="h-[54px] min-w-0 flex-1 rounded-md border border-zinc-700 bg-zinc-900/80 px-5 text-base text-white outline-none transition placeholder:text-zinc-400 focus:border-yellow-400"
                onChange={this.handleChange}
              />
              <button
                type="submit"
                className="flex h-[54px] w-[194px] shrink-0 items-center justify-center gap-3 rounded-md bg-yellow-400 font-bold text-black shadow-[0_0_24px_rgba(250,204,21,0.32)] transition hover:bg-yellow-300"
              >
                <span
                  aria-hidden="true"
                  className="h-5 w-5 bg-current text-black"
                  style={getIconMask(magnifierIcon)}
                />
                Search
              </button>
            </form>
          </div>
        </div>
      </section>
    );
  }
}
