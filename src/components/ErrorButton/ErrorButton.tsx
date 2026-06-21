import { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { getAssetUrl } from '../../utils/assets';

interface ErrorButtonProps {
  onTriggerError?: () => void;
  variant?: 'default' | 'error';
}

const attentionIcon = getAssetUrl('attention-svgrepo-com.svg');
const errorBackground = getAssetUrl('error-component.png');

export const ErrorButton = ({
  onTriggerError,
  variant = 'default',
}: ErrorButtonProps) => {
  const t = useTranslations('ErrorButton');
  const [hasError, setHasError] = useState(false);
  const isErrorVariant = variant === 'error';
  const buttonClasses = `${
    isErrorVariant ? 'error-button-danger' : 'error-button-default'
  } relative overflow-hidden`;

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
    <button type="button" className={buttonClasses} onClick={handleClick}>
      {isErrorVariant && (
        <Image
          src={errorBackground}
          alt=""
          fill
          sizes="280px"
          className="pointer-events-none object-cover"
        />
      )}
      <Image
        src={attentionIcon}
        alt=""
        width={16}
        height={16}
        unoptimized
        className="icon-gold h-4 w-4 shrink-0"
      />
      <span className="relative whitespace-nowrap">{t('label')}</span>
    </button>
  );
};
