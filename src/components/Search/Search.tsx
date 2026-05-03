import { Component, type ChangeEvent, type FormEvent } from 'react';
import { SEARCH_TERM_STORAGE_KEY } from '../../constants/localStorage';

const magnifierIcon = '/magnifier-svgrepo-com.svg';

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

    const searchTerm = this.state.searchTerm.trim();
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
                  <img
                    src={magnifierIcon}
                    alt=""
                    className="icon-gold h-10 w-10"
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
                <img
                  src={magnifierIcon}
                  alt=""
                  className="icon-black h-5 w-5"
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
