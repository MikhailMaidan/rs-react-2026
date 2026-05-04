import { Component } from 'react';
import { Header } from './components/Header/Header';
import { Search } from './components/Search/Search';
import { Results } from './components/Results/Results';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';
import { fetchCharacters } from './api/charactersApi';
import { SEARCH_TERM_STORAGE_KEY } from './constants/localStorage';
import { getAssetUrl } from './utils/assets';
import type { CharacterResult } from './types/character';

interface AppState {
  items: CharacterResult[];
  searchTerm: string;
  currentPage: number;
  totalItems: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  isLoading: boolean;
  errorMessage: string;
  shouldThrowResultsError: boolean;
}

export default class App extends Component<object, AppState> {
  state: AppState = {
    items: [],
    searchTerm: localStorage.getItem(SEARCH_TERM_STORAGE_KEY) ?? '',
    currentPage: 1,
    totalItems: 0,
    hasNextPage: false,
    hasPreviousPage: false,
    isLoading: false,
    errorMessage: '',
    shouldThrowResultsError: false,
  };

  componentDidMount() {
    this.loadCharacters(this.state.searchTerm, 1);
  }

  handleSearch = (searchTerm: string) => {
    if (searchTerm === this.state.searchTerm) {
      return;
    }

    localStorage.setItem(SEARCH_TERM_STORAGE_KEY, searchTerm);
    this.setState({ searchTerm, currentPage: 1 });
    this.loadCharacters(searchTerm, 1);
  };

  handleErrorButtonClick = () => {
    this.setState({ shouldThrowResultsError: true });
  };

  handleResultsBoundaryReset = () => {
    this.setState({ shouldThrowResultsError: false });
  };

  handleRetry = () => {
    this.loadCharacters(this.state.searchTerm, this.state.currentPage);
  };

  handlePageChange = (page: number) => {
    if (page === this.state.currentPage) {
      return;
    }

    this.setState({ currentPage: page });
    this.loadCharacters(this.state.searchTerm, page);
  };

  handleNextPage = () => {
    const nextPage = this.state.currentPage + 1;

    this.setState({ currentPage: nextPage });
    this.loadCharacters(this.state.searchTerm, nextPage);
  };

  handlePreviousPage = () => {
    const previousPage = this.state.currentPage - 1;

    this.setState({ currentPage: previousPage });
    this.loadCharacters(this.state.searchTerm, previousPage);
  };

  loadCharacters = (searchTerm: string, page: number) => {
    this.setState({ isLoading: true, errorMessage: '' });

    fetchCharacters(searchTerm, page)
      .then((data) => {
        this.setState({
          items: data.items,
          totalItems: data.totalItems,
          hasNextPage: data.hasNextPage,
          hasPreviousPage: data.hasPreviousPage,
          isLoading: false,
        });
      })
      .catch((error: Error) => {
        this.setState({
          errorMessage: error.message,
          isLoading: false,
          items: [],
          totalItems: 0,
          hasNextPage: false,
          hasPreviousPage: false,
        });
      });
  };

  render() {
    const {
      items,
      searchTerm,
      currentPage,
      totalItems,
      hasNextPage,
      hasPreviousPage,
      isLoading,
      errorMessage,
      shouldThrowResultsError,
    } = this.state;
    const backgroundImage = `url("${getAssetUrl('background-image.png')}")`;

    return (
      <main className="min-h-screen bg-black text-slate-100">
        <Header />
        <div
          className="min-h-[calc(100vh-96px)] space-y-5 bg-cover bg-center bg-fixed py-5"
          style={{ backgroundImage }}
        >
          <Search
            onSearch={this.handleSearch}
            onErrorButtonClick={this.handleErrorButtonClick}
          />
          <ErrorBoundary onReset={this.handleResultsBoundaryReset}>
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
              onRetry={this.handleRetry}
              onPageChange={this.handlePageChange}
              onNextPage={this.handleNextPage}
              onPreviousPage={this.handlePreviousPage}
            />
          </ErrorBoundary>
        </div>
      </main>
    );
  }
}
