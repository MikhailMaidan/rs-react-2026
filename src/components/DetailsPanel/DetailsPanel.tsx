import { useOutletContext, useSearchParams } from 'react-router-dom';
import { skipToken } from '@reduxjs/toolkit/query';
import { useDispatch } from 'react-redux';
import {
  charactersQueryApi,
  useGetCharacterDetailsQuery,
} from '../../api/charactersQueryApi';
import { Loader } from '../Loader';
import type { AppDispatch } from '../../store';

interface DetailsOutletContext {
  onClose: () => void;
}

export const DetailsPanel = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [searchParams] = useSearchParams();
  const { onClose } = useOutletContext<DetailsOutletContext>();
  const detailsId = searchParams.get('details');
  const {
    data: character,
    error,
    isFetching,
  } = useGetCharacterDetailsQuery(detailsId ?? skipToken);
  const errorMessage =
    error && 'error' in error && typeof error.error === 'string'
      ? error.error
      : error
        ? 'Unable to load details. Please try again.'
        : '';

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
      {isFetching && <Loader place="center" />}

      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase text-yellow-400">
            Details
          </p>
          <h2 className="mt-2 text-[28px] font-bold leading-tight text-white">
            {character?.name ?? 'Loading...'}
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="pagination-button"
            disabled={isFetching}
            onClick={handleRefreshDetails}
          >
            Refresh details
          </button>
          <button
            type="button"
            className="details-close-button"
            aria-label="Close details"
            onClick={onClose}
          >
            x
          </button>
        </div>
      </div>

      {errorMessage ? (
        <p className="mt-8 text-red-400">{errorMessage}</p>
      ) : (
        character && (
          <dl className="mt-8 space-y-5 text-[17px]">
            <div>
              <dt className="font-bold text-yellow-400">Birth year</dt>
              <dd className="mt-1 text-zinc-100">{character.birth_year}</dd>
            </div>
            <div>
              <dt className="font-bold text-yellow-400">Gender</dt>
              <dd className="mt-1 text-zinc-100">{character.gender}</dd>
            </div>
            <div>
              <dt className="font-bold text-yellow-400">Height</dt>
              <dd className="mt-1 text-zinc-100">{character.height} cm</dd>
            </div>
            <div>
              <dt className="font-bold text-yellow-400">Mass</dt>
              <dd className="mt-1 text-zinc-100">{character.mass} kg</dd>
            </div>
          </dl>
        )
      )}
    </aside>
  );
};
