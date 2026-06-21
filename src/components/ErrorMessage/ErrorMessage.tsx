import Image from 'next/image';
import { useTranslations } from 'next-intl';
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
  title,
  message,
  onRetry,
  showErrorButton = true,
}: ErrorMessageProps) => {
  const t = useTranslations('ErrorMessage');
  const titleText = title ?? t('title');
  const messageText = message ?? t('message');

  return (
    <div className="error-message-card">
      <Image
        src={errorBackground}
        alt=""
        fill
        sizes="100vw"
        className="pointer-events-none object-cover"
      />
      <div className="absolute inset-0 bg-black/45" />
      <div className="relative z-10 mx-auto max-w-[900px]">
        <Image
          src={attentionIcon}
          alt=""
          width={64}
          height={64}
          unoptimized
          className="error-icon-red mx-auto block h-16 w-16"
        />
        <h2 className="mt-5 text-[28px] font-bold text-white">{titleText}</h2>
        <p className="mx-auto mt-4 max-w-[720px] text-[18px] leading-snug text-red-400">
          {messageText}
        </p>

        <div className="mx-auto my-7 h-px max-w-[860px] bg-red-500" />

        <div className="mx-auto max-w-[760px] rounded-[10px] border border-zinc-700 bg-zinc-950/80 p-6 text-left">
          <p className="text-[18px] font-semibold text-white">
            {t('tryTitle')}
          </p>
          <ul className="mt-5 space-y-4 text-[16px] text-zinc-100">
            <li className="flex items-center gap-4">
              <Image
                src={updateIcon}
                alt=""
                width={24}
                height={24}
                unoptimized
                className="error-icon-red h-6 w-6 shrink-0"
              />
              {t('tryAgainText')}
            </li>
            <li className="flex items-center gap-4">
              <Image
                src={magnifierIcon}
                alt=""
                width={24}
                height={24}
                unoptimized
                className="error-icon-red h-6 w-6 shrink-0"
              />
              {t('differentSearch')}
            </li>
            <li className="flex items-center gap-4">
              <Image
                src={wifiIcon}
                alt=""
                width={24}
                height={24}
                unoptimized
                className="error-icon-red h-6 w-6 shrink-0"
              />
              {t('checkInternet')}
            </li>
          </ul>
        </div>

        {onRetry && (
          <button
            type="button"
            className="error-retry-button"
            onClick={onRetry}
          >
            <Image
              src={updateIcon}
              alt=""
              width={24}
              height={24}
              unoptimized
              className="error-icon-red h-6 w-6"
            />
            {t('tryAgainButton')}
          </button>
        )}

        {showErrorButton && (
          <>
            <div className="mx-auto my-6 flex max-w-[280px] items-center gap-4 text-[16px] text-zinc-200">
              <span className="h-px flex-1 bg-zinc-700" />
              {t('or')}
              <span className="h-px flex-1 bg-zinc-700" />
            </div>
            <ErrorButton variant="error" />
          </>
        )}

        <p className="mt-6 text-[16px] text-zinc-200">
          {t('supportPrefix')}{' '}
          <span className="text-red-400">{t('supportLink')}</span>.
        </p>
      </div>
    </div>
  );
};
