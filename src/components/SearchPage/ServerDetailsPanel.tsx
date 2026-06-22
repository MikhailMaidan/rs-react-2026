import { useTranslations } from 'next-intl';
import { Link } from '../../i18n/navigation';
import { RefreshPageButton } from './RefreshPageButton';
import type { Character } from '../../types/character';

interface ServerDetailsPanelProps {
  character: Character | null;
  closeHref: string;
  errorMessage: string;
  hasDetails: boolean;
}

export const ServerDetailsPanel = ({
  character,
  closeHref,
  errorMessage,
  hasDetails,
}: ServerDetailsPanelProps) => {
  const t = useTranslations('Details');

  return (
    <aside className="details-panel min-h-[230px]">
      <div className="flex items-center gap-2">
        <p className="min-w-0 flex-1 text-sm font-semibold uppercase text-yellow-400">
          {t('title')}
        </p>
        {hasDetails && (
          <>
            <RefreshPageButton
              className="details-refresh-button"
              label={t('refresh')}
            />
            <Link
              href={closeHref}
              className="details-close-button"
              aria-label={t('close')}
            >
              x
            </Link>
          </>
        )}
      </div>

      {hasDetails && (
        <>
          <h2 className="mt-3 break-words text-[28px] font-bold leading-tight text-white">
            {character?.name ?? t('loading')}
          </h2>

          {errorMessage ? (
            <p className="mt-8 text-red-400">{errorMessage}</p>
          ) : (
            character && (
              <dl className="mt-8 space-y-5 text-[17px]">
                <div>
                  <dt className="font-bold text-yellow-400">
                    {t('birthYear')}
                  </dt>
                  <dd className="mt-1 text-zinc-100">{character.birth_year}</dd>
                </div>
                <div>
                  <dt className="font-bold text-yellow-400">{t('gender')}</dt>
                  <dd className="mt-1 text-zinc-100">{character.gender}</dd>
                </div>
                <div>
                  <dt className="font-bold text-yellow-400">{t('height')}</dt>
                  <dd className="mt-1 text-zinc-100">{character.height} cm</dd>
                </div>
                <div>
                  <dt className="font-bold text-yellow-400">{t('mass')}</dt>
                  <dd className="mt-1 text-zinc-100">{character.mass} kg</dd>
                </div>
              </dl>
            )
          )}
        </>
      )}
    </aside>
  );
};
