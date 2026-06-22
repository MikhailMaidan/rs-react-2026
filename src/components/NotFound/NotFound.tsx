import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '../../i18n/navigation';
import { getAssetUrl } from '../../utils/assets';

export const NotFound = () => {
  const t = useTranslations('NotFound');

  return (
    <section className="not-found-section relative overflow-hidden">
      <Image
        src={getAssetUrl('background-image.png')}
        alt=""
        fill
        sizes="100vw"
        className="pointer-events-none object-cover object-center"
      />
      <div className="not-found-content relative z-10">
        <Image
          src={getAssetUrl('plugpage.png')}
          alt={t('title')}
          width={900}
          height={520}
          className="not-found-image"
        />
        <h1 className="not-found-title">{t('title')}</h1>
        <p className="not-found-text">{t('text')}</p>
        <Link href="/" className="primary-small-link">
          {t('back')}
        </Link>
      </div>
    </section>
  );
};
