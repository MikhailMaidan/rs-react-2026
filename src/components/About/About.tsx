import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '../../i18n/navigation';
import { getAssetUrl } from '../../utils/assets';

export const About = () => {
  const t = useTranslations('About');

  return (
    <section className="about-section relative overflow-hidden">
      <Image
        src={getAssetUrl('background-image.png')}
        alt=""
        fill
        sizes="100vw"
        className="pointer-events-none object-cover object-center"
      />
      <div className="about-layout relative z-10">
        <div className="about-image-card">
          <Image
            src={getAssetUrl('about_page.png')}
            alt="Future"
            width={760}
            height={980}
            className="about-image"
          />
        </div>

        <article className="about-article">
          <h1 className="about-title">{t('title')}</h1>
          <p className="about-subtitle">{t('subtitle')}</p>

          <div className="about-content">
            <p>{t('greeting')}</p>
            <p>{t('paragraphOne')}</p>
            <p>{t('paragraphTwo')}</p>
            <p>{t('paragraphThree')}</p>

            <h2 className="about-small-title">{t('quickFacts')}</h2>
            <ul className="about-list">
              <li>
                <span className="font-bold text-yellow-400">
                  {t('superpowerLabel')}
                </span>{' '}
                {t('superpower')}
              </li>
              <li>
                <span className="font-bold text-yellow-400">
                  {t('weaknessLabel')}
                </span>{' '}
                {t('weakness')}
              </li>
              <li>
                <span className="font-bold text-yellow-400">
                  {t('statusLabel')}
                </span>{' '}
                {t('status')}
              </li>
            </ul>

            <p>{t('closing')}</p>
            <p className="font-bold text-white">{t('signature')}</p>
            <p className="text-yellow-400">{t('tagline')}</p>
          </div>

          <div className="about-actions">
            <a
              href="https://rs.school/courses/reactjs"
              target="_blank"
              rel="noreferrer"
              className="gold-outline-link"
            >
              {t('course')}
            </a>
            <Link href="/" className="gold-outline-link">
              {t('mainMenu')}
            </Link>
          </div>
        </article>
      </div>
    </section>
  );
};
