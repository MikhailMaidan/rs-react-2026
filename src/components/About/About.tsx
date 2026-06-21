import Link from 'next/link';
import { getAssetUrl } from '../../utils/assets';

export const About = () => {
  const backgroundImage = `url("${getAssetUrl('background-image.png')}")`;

  return (
    <section className="about-section" style={{ backgroundImage }}>
      <div className="about-layout">
        <div className="about-image-card">
          <img
            src={getAssetUrl('about_page.png')}
            alt="Future"
            className="about-image"
          />
        </div>

        <article className="about-article">
          <h1 className="about-title">About the Creator</h1>
          <p className="about-subtitle">
            a.k.a. Future Hokage - The Dark Lord of Half-Finished Projects
          </p>

          <div className="about-content">
            <p>Greetings, brave visitor.</p>
            <p>
              You have stumbled into the lair of Future - a shadowy figure who
              lurks in the code mines of Novi Sad, wielding nothing but
              caffeine, questionable life choices, and a red lightsaber
              that&apos;s mostly for dramatic effect.
            </p>
            <p>
              I am Future Hokage aka Master Baiter, a caffeine-fueled Sith
              cosplayer who&apos;s been called &quot;Future&quot; for over a
              decade but still hasn&apos;t managed to drop the
              &quot;Future&quot; and become a proper Hokage. I&apos;ve been
              hiding from the Russian-empire military obligation service in this
              parallel Novi Sad galaxy, only to discover they never even
              bothered to look for me. This glorious failure earned me the
              official title of Elusive Joe.
            </p>
            <p>
              Naturally, I start pet projects like a galactic conqueror and
              abandon them somewhere between &quot;this will change
              everything&quot; and &quot;why did I think this was a good idea
              again?&quot; Case in point: the last time I attempted the sacred
              No Nut November (NNN) challenge, I heroically lasted a full 1 day
              before the dark side tempted me back into the void. Truly, I am
              the Sith Lord of Delayed Gratification.
            </p>

            <h2 className="about-small-title">Quick Facts</h2>
            <ul className="about-list">
              <li>
                <span className="font-bold text-yellow-400">Superpower:</span>{' '}
                Turning &quot;just a quick weekend tool&quot; into month-long
                obsessions with custom auth systems.
              </li>
              <li>
                <span className="font-bold text-yellow-400">Weakness:</span>{' '}
                Shiny new frameworks, coffee, and clickbait YouTube titles.
              </li>
              <li>
                <span className="font-bold text-yellow-400">
                  Current status:
                </span>{' '}
                Building this very website. Will it be finished? The prophecy
                remains unclear.
              </li>
            </ul>

            <p>
              Here you&apos;ll find a glorious mess of chaotic experiments,
              meme-powered code, and questionable life decisions turned into
              software. No polished production apps - just pure unhinged
              creativity and running jokes with glowing red eyes.
            </p>
            <p className="font-bold text-white">
              - Future Hokage aka Master Baiter (Elusive Joe)
            </p>
            <p className="text-yellow-400">
              1-Day NNN Champion - Professional Overthinker - Sith Lord of
              Procrastination
            </p>
          </div>

          <div className="about-actions">
            <a
              href="https://rs.school/courses/reactjs"
              target="_blank"
              rel="noreferrer"
              className="gold-outline-link"
            >
              RS School React Course
            </a>
            <Link href="/" className="gold-outline-link">
              Main Menu
            </Link>
          </div>
        </article>
      </div>
    </section>
  );
};
