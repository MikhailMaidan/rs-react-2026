import { Component, type CSSProperties } from 'react';
import { ErrorButton } from '../ErrorButton/ErrorButton';

interface ErrorMessageProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  showErrorButton?: boolean;
}

const attentionIcon = '/attention-svgrepo-com.svg';
const magnifierIcon = '/magnifier-svgrepo-com.svg';
const updateIcon = '/update-svgrepo-com.svg';
const wifiIcon = '/wifi-slash-svgrepo-com.svg';

const getIconMask = (icon: string): CSSProperties => ({
  WebkitMask: `url(${icon}) center / contain no-repeat`,
  mask: `url(${icon}) center / contain no-repeat`,
});

export class ErrorMessage extends Component<ErrorMessageProps> {
  render() {
    const {
      title = 'Unable to load results',
      message = 'Something went wrong while fetching the data. This might be a temporary issue. Please try again.',
      onRetry,
      showErrorButton = true,
    } = this.props;

    return (
      <div className="relative overflow-hidden rounded-[10px] border border-red-500 bg-black px-6 py-10 text-center shadow-[0_0_28px_rgba(239,68,68,0.12)] sm:px-10">
        <img
          src="/error-component.png"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-45"
        />
        <div className="relative z-10 mx-auto max-w-[860px]">
          <span
            aria-hidden="true"
            className="mx-auto block h-16 w-16 bg-current text-red-500"
            style={getIconMask(attentionIcon)}
          />
          <h2 className="mt-5 text-[28px] font-bold text-white">{title}</h2>
          <p className="mx-auto mt-4 max-w-[720px] text-[18px] leading-snug text-red-400">
            {message}
          </p>

          <div className="my-7 h-px bg-red-500" />

          <div className="mx-auto max-w-[760px] rounded-[10px] border border-zinc-700 bg-zinc-950/80 p-6 text-left">
            <p className="text-[18px] font-semibold text-white">
              What you can try:
            </p>
            <ul className="mt-5 space-y-4 text-[16px] text-zinc-100">
              <li className="flex items-center gap-4">
                <span
                  aria-hidden="true"
                  className="h-6 w-6 shrink-0 bg-current text-red-500"
                  style={getIconMask(updateIcon)}
                />
                Click &quot;Try Again&quot; to reload the results
              </li>
              <li className="flex items-center gap-4">
                <span
                  aria-hidden="true"
                  className="h-6 w-6 shrink-0 bg-current text-red-500"
                  style={getIconMask(magnifierIcon)}
                />
                Try different search terms
              </li>
              <li className="flex items-center gap-4">
                <span
                  aria-hidden="true"
                  className="h-6 w-6 shrink-0 bg-current text-red-500"
                  style={getIconMask(wifiIcon)}
                />
                Check your internet connection
              </li>
            </ul>
          </div>

          {onRetry && (
            <button
              type="button"
              className="mx-auto mt-6 flex h-14 w-full max-w-[280px] items-center justify-center gap-3 rounded-lg border border-red-500 bg-zinc-950/80 text-[20px] font-bold text-white transition hover:bg-red-500/10"
              onClick={onRetry}
            >
              <span
                aria-hidden="true"
                className="h-6 w-6 bg-current text-red-500"
                style={getIconMask(updateIcon)}
              />
              Try Again
            </button>
          )}

          {showErrorButton && (
            <>
              <div className="mx-auto my-6 flex max-w-[280px] items-center gap-4 text-[16px] text-zinc-200">
                <span className="h-px flex-1 bg-zinc-700" />
                or
                <span className="h-px flex-1 bg-zinc-700" />
              </div>
              <ErrorButton />
            </>
          )}

          <p className="mt-6 text-[16px] text-zinc-200">
            If the problem persists, please{' '}
            <span className="text-red-400">contact support</span>.
          </p>
        </div>
      </div>
    );
  }
}
