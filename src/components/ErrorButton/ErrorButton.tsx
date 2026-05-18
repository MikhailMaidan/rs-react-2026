import { useState } from 'react';
import { getAssetUrl } from '../../utils/assets';

interface ErrorButtonProps {
  onTriggerError?: () => void;
  variant?: 'default' | 'error';
}

const attentionIcon = getAssetUrl('attention-svgrepo-com.svg');
const errorBackground = getAssetUrl('error-component.png');

export function ErrorButton({
  onTriggerError,
  variant = 'default',
}: ErrorButtonProps) {
  const [hasError, setHasError] = useState<boolean>(false);
  const isErrorVariant = variant === 'error';
  const buttonClasses = isErrorVariant
    ? 'mx-auto flex h-14 w-full items-center justify-center gap-4 rounded-lg border border-red-500 bg-black/90 bg-cover bg-center px-5 text-[20px] font-bold text-white shadow-[0_0_20px_rgba(239,68,68,0.16)] transition hover:bg-red-500/10'
    : 'mx-auto flex h-14 w-full items-center justify-center gap-4 rounded-lg border border-yellow-400 bg-zinc-950/80 px-5 text-[20px] font-bold text-white shadow-[0_0_20px_rgba(250,204,21,0.16)] transition hover:bg-yellow-400/10';

  const handleClick = () => {
    if (onTriggerError) {
      onTriggerError();
      return;
    }

    setHasError(true);
  };

  if (hasError) {
    throw new Error('Test application error');
  }

  return (
    <button
      type="button"
      className={buttonClasses}
      style={
        isErrorVariant ? { backgroundImage: `url("${errorBackground}")` } : {}
      }
      onClick={handleClick}
    >
      <img
        src={attentionIcon}
        alt=""
        className="icon-gold h-6 w-6 shrink-0"
      />
      <span className="whitespace-nowrap">Error Button</span>
    </button>
  );
}
