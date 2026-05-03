import { Component } from 'react';
import { Header } from './components/Header/Header';
import { Search } from './components/Search/Search';

export default class App extends Component {
  render() {
    return (
      <main className="min-h-screen bg-black text-slate-100">
        <Header />
        <div className="mt-5">
          <Search />
        </div>
      </main>
    );
  }
}
