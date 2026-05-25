import { useState } from 'react';
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
  const [hasError, setHasError] = useState(false);
  const isErrorVariant = variant === 'error';
  const buttonClasses = isErrorVariant
    ? 'error-button-danger'
    : 'error-button-default';

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
        aria-hidden="true"
        className="icon-gold h-4 w-4 shrink-0"
      />
      <span className="whitespace-nowrap">Error Button</span>
    </button>
  );
};
