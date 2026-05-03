import { Component } from 'react';

interface ErrorButtonState {
  hasError: boolean;
}

const attentionIcon = '/attention-svgrepo-com.svg';

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
        <img
          src={attentionIcon}
          alt=""
          className="icon-gold h-6 w-6"
        />
        Error Button
      </button>
    );
  }
}
