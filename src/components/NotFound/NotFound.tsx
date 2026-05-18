import { Link } from 'react-router-dom';
import { Header } from '../Header/Header';
import { getAssetUrl } from '../../utils/assets';

export function NotFound() {
  const backgroundImage = `url("${getAssetUrl('background-image.png')}")`;

  return (
    <main className="min-h-screen bg-black text-slate-100">
      <Header />
      <section
        className="flex min-h-screen items-center justify-center bg-cover bg-center bg-fixed px-6 py-10"
        style={{ backgroundImage }}
      >
        <div className="w-full max-w-[1100px] text-center">
          <img
            src={getAssetUrl('plugpage.png')}
            alt="Page not found"
            className="mx-auto max-h-[68vh] w-full rounded-[10px] object-contain"
          />
          <h1 className="mt-8 text-[32px] font-bold text-white [text-shadow:0_0_6px_rgba(255,255,255,0.95),0_0_18px_rgba(59,130,246,0.95),0_0_34px_rgba(59,130,246,0.75)]">
            Page not found
          </h1>
          <p className="mx-auto mt-3 max-w-[620px] text-[18px] leading-snug text-white [text-shadow:0_0_5px_rgba(255,255,255,0.75),0_0_14px_rgba(239,68,68,0.85),0_0_26px_rgba(239,68,68,0.55)]">
            This route does not exist or has not been implemented yet.
          </p>
          <Link
            to="/"
            className="mx-auto mt-6 inline-flex h-12 items-center justify-center rounded-md bg-yellow-400 px-6 font-bold text-black transition hover:bg-yellow-300"
          >
            Back to Search
          </Link>
        </div>
      </section>
    </main>
  );
}
