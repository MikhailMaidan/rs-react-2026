import { useTranslations } from 'next-intl';

interface LoaderProps {
  place?: 'center' | 'results';
}

export const Loader = ({ place = 'results' }: LoaderProps) => {
  const t = useTranslations('Loader');
  const wrapperClass =
    place === 'center'
      ? 'absolute inset-x-0 top-24 z-20 flex items-center justify-center'
      : 'absolute inset-x-0 top-[54%] z-20 flex items-center justify-center';

  return (
    <div role="status" aria-label={t('label')} className={wrapperClass}>
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-zinc-700 border-t-yellow-400" />
    </div>
  );
};
