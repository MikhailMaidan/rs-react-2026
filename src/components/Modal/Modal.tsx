import { useEffect, useRef, type KeyboardEvent, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  children: ReactNode;
  title: string;
  onClose: () => void;
}

const focusableSelector =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

export const Modal = ({ children, title, onClose }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    previousFocusRef.current = document.activeElement as HTMLElement;
    const firstInput = modalRef.current?.querySelector<HTMLElement>(
      focusableSelector
    );

    firstInput?.focus();

    const handleEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
      previousFocusRef.current?.focus();
    };
  }, [onClose]);

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Tab') {
      return;
    }

    const focusableItems = Array.from(
      modalRef.current?.querySelectorAll<HTMLElement>(focusableSelector) ?? []
    );

    if (focusableItems.length === 0) {
      return;
    }

    const firstItem = focusableItems[0];
    const lastItem = focusableItems[focusableItems.length - 1];

    if (event.shiftKey && document.activeElement === firstItem) {
      event.preventDefault();
      lastItem.focus();
    }

    if (!event.shiftKey && document.activeElement === lastItem) {
      event.preventDefault();
      firstItem.focus();
    }
  };

  return createPortal(
    <div className="modal-backdrop" onMouseDown={handleOverlayClick}>
      <div
        aria-modal="true"
        aria-labelledby="forms-modal-title"
        className="forms-modal"
        ref={modalRef}
        role="dialog"
        onKeyDown={handleKeyDown}
      >
        <div className="flex items-start justify-between gap-4">
          <h2 id="forms-modal-title" className="text-xl font-bold text-white">
            {title}
          </h2>
          <button
            type="button"
            className="details-close-button"
            aria-label="Close modal"
            onClick={onClose}
          >
            x
          </button>
        </div>
        <div className="mt-5">{children}</div>
      </div>
    </div>,
    document.body
  );
};
