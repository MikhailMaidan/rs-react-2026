import { Link } from 'react-router-dom';
import { Header } from '../Header/Header';
import { getAssetUrl } from '../../utils/assets';

export function About() {
  const backgroundImage = `url("${getAssetUrl('background-image.png')}")`;

  return (
    <main className="min-h-screen bg-black text-slate-100">
      <Header />
      <section
        className="min-h-[calc(100vh-96px)] bg-cover bg-center bg-fixed px-6 py-8 sm:px-9"
        style={{ backgroundImage }}
      >
        <div className="mx-auto grid max-w-[1800px] items-stretch gap-6 rounded-[14px] border border-yellow-400 bg-black/85 p-6 shadow-[0_0_30px_rgba(250,204,21,0.08)] lg:grid-cols-[minmax(320px,0.8fr)_minmax(0,1.2fr)] lg:p-8">
          <div className="overflow-hidden rounded-[10px] border border-yellow-400/70 bg-zinc-950/80">
            <img
              src={getAssetUrl('about_page.png')}
              alt="Future"
              className="h-full min-h-[360px] w-full object-cover"
            />
          </div>

          <article className="rounded-[10px] border border-yellow-400/60 bg-zinc-950/80 p-6 text-[17px] leading-relaxed text-zinc-100 sm:p-8">
            <h1 className="text-[32px] font-bold leading-tight text-white [text-shadow:0_0_8px_rgba(250,204,21,0.9),0_0_22px_rgba(239,68,68,0.55)]">
              About the Creator
            </h1>
            <p className="mt-2 text-yellow-400">
              a.k.a. Future Hokage - The Dark Lord of Half-Finished Projects
            </p>

            <div className="mt-7 space-y-5">
              <p>Greetings, brave visitor.</p>
              <p>
                You have stumbled into the lair of Future - a shadowy figure
                who lurks in the code mines of Novi Sad, wielding nothing but
                caffeine, questionable life choices, and a red lightsaber
                that&apos;s mostly for dramatic effect.
              </p>
              <p>
                I am Future Hokage aka Master Baiter, a caffeine-fueled Sith
                cosplayer who&apos;s been called &quot;Future&quot; for over a
                decade but still hasn&apos;t managed to drop the
                &quot;Future&quot; and become a proper Hokage. I&apos;ve been
                hiding from the Russian-empire military obligation service in
                this parallel Novi Sad galaxy, only to discover they never even
                bothered to look for me. This glorious failure earned me the
                official title of Elusive Joe.
              </p>
              <p>
                Naturally, I start pet projects like a galactic conqueror and
                abandon them somewhere between &quot;this will change
                everything&quot; and &quot;why did I think this was a good idea
                again?&quot; Case in point: the last time I attempted the
                sacred No Nut November (NNN) challenge, I heroically lasted a
                full 1 day before the dark side tempted me back into the void.
                Truly, I am the Sith Lord of Delayed Gratification.
              </p>

              <h2 className="pt-3 text-[24px] font-bold text-white">
                Quick Facts
              </h2>
              <ul className="space-y-3">
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

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="https://rs.school/courses/reactjs"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-12 items-center justify-center rounded-md border border-yellow-400 bg-zinc-950/80 px-6 font-bold text-white shadow-[0_0_20px_rgba(250,204,21,0.16)] transition hover:bg-yellow-400/10"
              >
                RS School React Course
              </a>
              <Link
                to="/"
                className="inline-flex h-12 items-center justify-center rounded-md border border-yellow-400 bg-zinc-950/80 px-6 font-bold text-white shadow-[0_0_20px_rgba(250,204,21,0.16)] transition hover:bg-yellow-400/10"
              >
                Main Menu
              </Link>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
