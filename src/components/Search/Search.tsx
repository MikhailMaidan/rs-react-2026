import { Component } from 'react';

export class Search extends Component {
  render() {
    return (
      <section className="mx-auto max-w-[1800px] px-6 sm:px-9">
        <div className="rounded-[10px] border border-zinc-800 bg-black/85 p-5">
          <div className="rounded-[8px] border border-zinc-800 bg-zinc-950/70 px-6 py-6">
            <div className="flex items-start justify-between gap-6">
              <div>
                <div className="flex items-center gap-4">
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="h-10 w-10 text-yellow-400"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.4"
                  >
                    <circle cx="11" cy="11" r="7" />
                    <path d="m20 20-4.2-4.2" />
                  </svg>
                  <h1 className="text-[30px] font-bold leading-none text-white">
                    Search
                  </h1>
                </div>

                <p className="mt-5 text-sm text-zinc-200">
                  Enter a term to search for items. Your last search is saved.
                </p>
              </div>

              <button
                type="button"
                className="flex h-11 shrink-0 items-center gap-3 rounded-md border border-zinc-800 bg-zinc-950/80 px-5 text-sm font-semibold text-white"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="h-5 w-5 text-yellow-400"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.2"
                >
                  <path d="M10.3 4.2 2.8 17.3A2 2 0 0 0 4.5 20h15a2 2 0 0 0 1.7-2.7L13.7 4.2a2 2 0 0 0-3.4 0Z" />
                  <path d="M12 9v4" />
                  <path d="M12 17h.01" />
                </svg>
                Test Error
              </button>
            </div>

            <form className="mt-6 flex gap-5">
              <input
                type="search"
                placeholder="Search items..."
                className="h-[54px] min-w-0 flex-1 rounded-md border border-zinc-700 bg-zinc-900/80 px-5 text-base text-white outline-none transition placeholder:text-zinc-400 focus:border-yellow-400"
              />
              <button
                type="submit"
                className="flex h-[54px] w-[194px] shrink-0 items-center justify-center gap-3 rounded-md bg-yellow-400 font-bold text-black shadow-[0_0_24px_rgba(250,204,21,0.32)] transition hover:bg-yellow-300"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.4"
                >
                  <circle cx="11" cy="11" r="6" />
                  <path d="m20 20-4.2-4.2" />
                </svg>
                Search
              </button>
            </form>
          </div>
        </div>
      </section>
    );
  }
}
