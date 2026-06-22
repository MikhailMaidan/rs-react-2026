import { skipToken } from '@reduxjs/toolkit/query';
import { useTranslations } from 'next-intl';
import { useDispatch } from 'react-redux';
import {
  charactersQueryApi,
  useGetCharacterDetailsQuery,
} from '../../api/charactersQueryApi';
import { Loader } from '../Loader';
import type { AppDispatch } from '../../store';
import type { Character } from '../../types/character';

interface DetailsPanelProps {
  detailsId: string | null;
  initialDetailsId?: string | null;
  initialCharacter?: Character | null;
  onClose: () => void;
}

export const DetailsPanel = ({
  detailsId,
  initialDetailsId = null,
  initialCharacter = null,
  onClose,
}: DetailsPanelProps) => {
  const t = useTranslations('Details');
  const dispatch = useDispatch<AppDispatch>();
  const {
    data: character,
    error,
    isFetching,
  } = useGetCharacterDetailsQuery(detailsId ?? skipToken);
  const errorMessage =
    error && 'error' in error && typeof error.error === 'string'
      ? error.error
      : error
        ? t('fallbackError')
        : '';
  const visibleCharacter =
    character ?? (detailsId === initialDetailsId ? initialCharacter : null);

  const handleRefreshDetails = () => {
    if (detailsId) {
      dispatch(
        charactersQueryApi.util.invalidateTags([
          { type: 'Character', id: detailsId },
        ])
      );
    }
  };

  if (!detailsId) {
    return null;
  }

  return (
    <aside className="details-panel">
      {isFetching && !visibleCharacter && <Loader place="center" />}

      <div className="flex items-center gap-2">
        <p className="min-w-0 flex-1 text-sm font-semibold uppercase text-yellow-400">
          {t('title')}
        </p>
        <button
          type="button"
          className="details-refresh-button"
          disabled={isFetching}
          onClick={handleRefreshDetails}
        >
          {t('refresh')}
        </button>
        <button
          type="button"
          className="details-close-button"
          aria-label={t('close')}
          onClick={onClose}
        >
          x
        </button>
      </div>

      <h2 className="mt-3 break-words text-[28px] font-bold leading-tight text-white">
        {visibleCharacter?.name ?? t('loading')}
      </h2>

      {errorMessage ? (
        <p className="mt-8 text-red-400">{errorMessage}</p>
      ) : (
        visibleCharacter && (
          <dl className="mt-8 space-y-5 text-[17px]">
            <div>
              <dt className="font-bold text-yellow-400">{t('birthYear')}</dt>
              <dd className="mt-1 text-zinc-100">
                {visibleCharacter.birth_year}
              </dd>
            </div>
            <div>
              <dt className="font-bold text-yellow-400">{t('gender')}</dt>
              <dd className="mt-1 text-zinc-100">{visibleCharacter.gender}</dd>
            </div>
            <div>
              <dt className="font-bold text-yellow-400">{t('height')}</dt>
              <dd className="mt-1 text-zinc-100">
                {visibleCharacter.height} cm
              </dd>
            </div>
            <div>
              <dt className="font-bold text-yellow-400">{t('mass')}</dt>
              <dd className="mt-1 text-zinc-100">{visibleCharacter.mass} kg</dd>
            </div>
          </dl>
        )
      )}
    </aside>
  );
};
