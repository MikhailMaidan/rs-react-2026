import { Component, type CSSProperties } from 'react';

interface ErrorButtonState {
  hasError: boolean;
}

const attentionIcon = '/attention-svgrepo-com.svg';

const getIconMask = (icon: string): CSSProperties => ({
  WebkitMask: `url(${icon}) center / contain no-repeat`,
  mask: `url(${icon}) center / contain no-repeat`,
});

export class ErrorButton extends Component<object, ErrorButtonState> {
  state: ErrorButtonState = {
    hasError: false,
  };

  handleClick = () => {
    this.setState({ hasError: true });
  };

  render() {
    if (this.state.hasError) {
      throw new Error('Test application error');
    }

    return (
      <button
        type="button"
        className="mx-auto flex h-14 w-full max-w-[280px] items-center justify-center gap-3 rounded-lg border border-yellow-400 bg-zinc-950/80 text-[20px] font-bold text-white shadow-[0_0_20px_rgba(250,204,21,0.16)] transition hover:bg-yellow-400/10"
        onClick={this.handleClick}
      >
        <span
          aria-hidden="true"
          className="h-6 w-6 bg-current text-yellow-400"
          style={getIconMask(attentionIcon)}
        />
        Error Button
      </button>
    );
  }
}
