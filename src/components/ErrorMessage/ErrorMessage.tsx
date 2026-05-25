import { ErrorButton } from '../ErrorButton';
import { getAssetUrl } from '../../utils/assets';

interface ErrorMessageProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  showErrorButton?: boolean;
}

const attentionIcon = getAssetUrl('attention-svgrepo-com.svg');
const errorBackground = getAssetUrl('error-component.png');
const magnifierIcon = getAssetUrl('magnifier-svgrepo-com.svg');
const updateIcon = getAssetUrl('update-svgrepo-com.svg');
const wifiIcon = getAssetUrl('wifi-slash-svgrepo-com.svg');

export const ErrorMessage = ({
  title = 'Unable to load results',
  message = 'Something went wrong while fetching the data. This might be a temporary issue. Please try again.',
  onRetry,
  showErrorButton = true,
}: ErrorMessageProps) => {
  const backgroundImage = `url("${errorBackground}")`;

  return (
    <div
      className="error-message-card"
      style={{ backgroundImage }}
    >
      <div className="absolute inset-0 bg-black/45" />
      <div className="relative z-10 mx-auto max-w-[900px]">
        <img
          src={attentionIcon}
          alt=""
          aria-hidden="true"
          className="error-icon-red mx-auto block h-16 w-16"
        />
        <h2 className="mt-5 text-[28px] font-bold text-white">{title}</h2>
        <p className="mx-auto mt-4 max-w-[720px] text-[18px] leading-snug text-red-400">
          {message}
        </p>

        <div className="mx-auto my-7 h-px max-w-[860px] bg-red-500" />

        <div className="mx-auto max-w-[760px] rounded-[10px] border border-zinc-700 bg-zinc-950/80 p-6 text-left">
          <p className="text-[18px] font-semibold text-white">
            What you can try:
          </p>
          <ul className="mt-5 space-y-4 text-[16px] text-zinc-100">
            <li className="flex items-center gap-4">
              <img
                src={updateIcon}
                alt=""
                aria-hidden="true"
                className="error-icon-red h-6 w-6 shrink-0"
              />
              Click &quot;Try Again&quot; to reload the results
            </li>
            <li className="flex items-center gap-4">
              <img
                src={magnifierIcon}
                alt=""
                aria-hidden="true"
                className="error-icon-red h-6 w-6 shrink-0"
              />
              Try different search terms
            </li>
            <li className="flex items-center gap-4">
              <img
                src={wifiIcon}
                alt=""
                aria-hidden="true"
                className="error-icon-red h-6 w-6 shrink-0"
              />
              Check your internet connection
            </li>
          </ul>
        </div>

        {onRetry && (
          <button
            type="button"
            className="error-retry-button"
            onClick={onRetry}
          >
            <img
              src={updateIcon}
              alt=""
              aria-hidden="true"
              className="error-icon-red h-6 w-6"
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
            <ErrorButton variant="error" />
          </>
        )}

        <p className="mt-6 text-[16px] text-zinc-200">
          If the problem persists, please{' '}
          <span className="text-red-400">contact support</span>.
        </p>
      </div>
    </div>
  );
};
