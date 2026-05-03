import { Component } from 'react';
import { Header } from './components/Header/Header';
import { Search } from './components/Search/Search';
import { Results } from './components/Results/Results';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';
import { fetchCharacters } from './api/charactersApi';
import { SEARCH_TERM_STORAGE_KEY } from './constants/localStorage';
import type { CharacterResult } from './types/character';

interface AppState {
  items: CharacterResult[];
  searchTerm: string;
  isLoading: boolean;
  errorMessage: string;
}

export default class App extends Component<object, AppState> {
  state: AppState = {
    items: [],
    searchTerm: localStorage.getItem(SEARCH_TERM_STORAGE_KEY) ?? '',
    isLoading: false,
    errorMessage: '',
  };

  componentDidMount() {
    this.loadCharacters(this.state.searchTerm);
  }

  handleSearch = (searchTerm: string) => {
    if (searchTerm === this.state.searchTerm) {
      return;
    }

    localStorage.setItem(SEARCH_TERM_STORAGE_KEY, searchTerm);
    this.setState({ searchTerm });
    this.loadCharacters(searchTerm);
  };

  handleRetry = () => {
    this.loadCharacters(this.state.searchTerm);
  };

  loadCharacters = (searchTerm: string) => {
    this.setState({ isLoading: true, errorMessage: '' });

    fetchCharacters(searchTerm)
      .then((items) => {
        this.setState({ items, isLoading: false });
      })
      .catch((error: Error) => {
        this.setState({
          errorMessage: error.message,
          isLoading: false,
          items: [],
        });
      });
  };

  render() {
    const { items, searchTerm, isLoading, errorMessage } = this.state;

    return (
      <main className="min-h-screen bg-black text-slate-100">
        <Header />
        <div className="min-h-[calc(100vh-96px)] space-y-5 bg-[url('/background-image.png')] bg-cover bg-center bg-fixed py-5">
          <Search onSearch={this.handleSearch} />
          <ErrorBoundary>
            <Results
              items={items}
              searchTerm={searchTerm}
              isLoading={isLoading}
              errorMessage={errorMessage}
              onRetry={this.handleRetry}
            />
          </ErrorBoundary>
        </div>
      </main>
    );
  }
}
