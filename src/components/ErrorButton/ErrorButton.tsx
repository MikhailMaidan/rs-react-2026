import { useState } from 'react';
import { getAssetUrl } from '../../utils/assets';

interface ErrorButtonProps {
  onTriggerError?: () => void;
}

const attentionIcon = getAssetUrl('attention-svgrepo-com.svg');

export function ErrorButton({ onTriggerError }: ErrorButtonProps) {
  const [hasError, setHasError] = useState<boolean>(false);

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
      className="mx-auto flex h-14 w-full min-w-[230px] max-w-[280px] items-center justify-center gap-4 rounded-lg border border-yellow-400 bg-zinc-950/80 px-5 text-[20px] font-bold text-white shadow-[0_0_20px_rgba(250,204,21,0.16)] transition hover:bg-yellow-400/10"
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
