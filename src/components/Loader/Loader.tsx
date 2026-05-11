import { Component } from 'react';

export class Loader extends Component {
  render() {
    return (
      <div
        role="status"
        aria-label="Loading results"
        className="absolute inset-0 z-20 flex items-center justify-center rounded-[10px] bg-black/70 backdrop-blur-sm"
      >
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-zinc-700 border-t-yellow-400" />
      </div>
    );
  }
}
