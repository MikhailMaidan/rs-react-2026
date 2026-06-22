'use client';

import { useRouter } from 'next/navigation';

interface RefreshPageButtonProps {
  className: string;
  label: string;
}

export const RefreshPageButton = ({
  className,
  label,
}: RefreshPageButtonProps) => {
  const router = useRouter();

  return (
    <button
      type="button"
      className={className}
      onClick={() => router.refresh()}
    >
      {label}
    </button>
  );
};
