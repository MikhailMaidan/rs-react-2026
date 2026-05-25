import { useEffect, useState } from 'react';
import { useOutletContext, useSearchParams } from 'react-router-dom';
import { fetchCharacterDetails } from '../../api/charactersApi';
import { Loader } from '../Loader';
import type { Character } from '../../types/character';

interface DetailsOutletContext {
  onClose: () => void;
}

export const DetailsPanel = () => {
  const [searchParams] = useSearchParams();
  const { onClose } = useOutletContext<DetailsOutletContext>();
  const detailsId = searchParams.get('details');
  const [character, setCharacter] = useState<Character | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [loadedDetailsId, setLoadedDetailsId] = useState('');
  const [failedDetailsId, setFailedDetailsId] = useState('');
  const isLoading =
    Boolean(detailsId) &&
    loadedDetailsId !== detailsId &&
    failedDetailsId !== detailsId;

  useEffect(() => {
    if (!detailsId) {
      return;
    }

    let isActualRequest = true;

    fetchCharacterDetails(detailsId)
      .then((data) => {
        if (!isActualRequest) {
          return;
        }

        setCharacter(data);
        setLoadedDetailsId(detailsId);
        setFailedDetailsId('');
        setErrorMessage('');
      })
      .catch((error: Error) => {
        if (!isActualRequest) {
          return;
        }

        setErrorMessage(error.message);
        setFailedDetailsId(detailsId);
      });

    return () => {
      isActualRequest = false;
    };
  }, [detailsId]);

  if (!detailsId) {
    return null;
  }

  return (
    <aside className="details-panel">
      {isLoading && <Loader place="center" />}

      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase text-yellow-400">
            Details
          </p>
          <h2 className="mt-2 text-[28px] font-bold leading-tight text-white">
            {character?.name ?? 'Loading...'}
          </h2>
        </div>
        <button
          type="button"
          className="details-close-button"
          aria-label="Close details"
          onClick={onClose}
        >
          x
        </button>
      </div>

      {errorMessage && failedDetailsId === detailsId ? (
        <p className="mt-8 text-red-400">{errorMessage}</p>
      ) : (
        character &&
        loadedDetailsId === detailsId && (
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
