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
        <div className="mx-auto grid max-w-[1800px] gap-6 rounded-[14px] border border-yellow-400 bg-black/85 p-6 shadow-[0_0_30px_rgba(250,204,21,0.08)] lg:grid-cols-[minmax(320px,0.8fr)_minmax(0,1.2fr)] lg:p-8">
          <div className="overflow-hidden rounded-[10px] border border-yellow-400/70 bg-zinc-950/80">
            <img
              src={getAssetUrl('about_page.png')}
              alt="Future"
              className="h-full min-h-[420px] w-full object-cover"
            />
          </div>

          <article className="rounded-[10px] border border-yellow-400/60 bg-zinc-950/80 p-6 text-[17px] leading-relaxed text-zinc-100 sm:p-8">
            <h1 className="text-[32px] font-bold leading-tight text-white [text-shadow:0_0_8px_rgba(250,204,21,0.9),0_0_22px_rgba(239,68,68,0.55)]">
              About the Creator
            </h1>
            <p className="mt-2 text-yellow-400">
              a.k.a. The Dark Lord of Half-Finished Pet Projects
            </p>

            <div className="mt-7 space-y-5">
              <p>Greetings, mortal visitor.</p>
              <p>
                You have stumbled into the lair of Future - a shadowy figure
                who lurks in the code mines of Novi Sad, wielding nothing but
                caffeine, questionable life choices, and a red lightsaber
                that&apos;s mostly for dramatic effect.
              </p>
              <p>
                I am the one who starts pet projects with the fury of a thousand
                exploding stars, only to abandon them somewhere between
                &quot;this is the best idea ever&quot; and &quot;why is this
                Docker container eating my RAM again.&quot; My galactic will
                is legendary. For example, the last time I attempted the sacred
                No Nut November (NNN) challenge, I heroically lasted a full 1
                day before the dark side tempted me back into the void. That
                single day of restraint still echoes through the Force as a
                testament to my unbreakable discipline. Truly, I am the Sith
                Lord of Delayed Gratification.
              </p>

              <h2 className="pt-3 text-[24px] font-bold text-white">
                My Origin Story (Patch Notes v1.0)
              </h2>
              <ul className="space-y-3">
                <li>
                  <span className="font-bold text-yellow-400">Born:</span> In a
                  server rack far, far away.
                </li>
                <li>
                  <span className="font-bold text-yellow-400">Alignment:</span>{' '}
                  Chaotic Neutral with strong Sith cosplay tendencies.
                </li>
                <li>
                  <span className="font-bold text-yellow-400">Superpower:</span>{' '}
                  Turning &quot;I&apos;ll just make a quick weekend tool&quot;
                  into month-long obsessions that somehow involve building my
                  own authentication system from scratch because &quot;the
                  existing ones feel icky.&quot;
                </li>
                <li>
                  <span className="font-bold text-yellow-400">Weakness:</span>{' '}
                  Shiny new JavaScript frameworks, energy drinks, and that one
                  YouTube video titled &quot;You need to see this.&quot;
                </li>
                <li>
                  <span className="font-bold text-yellow-400">
                    Current Quest:
                  </span>{' '}
                  Building this very website you&apos;re looking at. Will it be
                  finished? The prophecy is unclear. The code is strong with the
                  dark side, but so is my procrastination.
                </li>
              </ul>

              <h2 className="pt-3 text-[24px] font-bold text-white">
                What You&apos;ll Find Here
              </h2>
              <p>
                A chaotic collection of half-baked experiments, meme-fueled
                experiments, and experiments that started as jokes but
                accidentally became useful. Think of it as my digital fortress
                of solitude - except instead of solitude there&apos;s 47 browser
                tabs and a growing sense of impostor syndrome.
              </p>
              <p>If you&apos;re here looking for:</p>
              <ul className="space-y-3">
                <li>
                  Polished, production-grade software - Wrong corner of the
                  internet, friend.
                </li>
                <li>
                  Unhinged creativity and questionable life decisions turned
                  into code - Welcome home.
                </li>
              </ul>

              <h2 className="pt-3 text-[24px] font-bold text-white">
                Final Transmission from the Dark Side
              </h2>
              <p>
                I don&apos;t always finish what I start, but when I do, it usually
                has glowing red eyes and a lightsaber.
              </p>
              <p>
                Thank you for visiting my humble abyss. May your pull requests
                be ever in your favor, and may your node_modules folder never
                grow beyond 3 GB.
              </p>
              <p className="font-bold text-white">- Future</p>
              <p className="text-yellow-400">
                Galactic Procrastinator - 1-Day NNN Champion - Professional
                Overthinker
              </p>
            </div>

            <a
              href="https://rs.school/courses/reactjs"
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex h-12 items-center justify-center rounded-md border border-yellow-400 bg-zinc-950/80 px-6 font-bold text-white shadow-[0_0_20px_rgba(250,204,21,0.16)] transition hover:bg-yellow-400/10"
            >
              RS School React Course
            </a>
          </article>
        </div>
      </section>
    </main>
  );
}
