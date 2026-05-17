import { Link } from 'react-router-dom';
import { Header } from '../Header/Header';
import { getAssetUrl } from '../../utils/assets';

export function NotFound() {
  const backgroundImage = `url("${getAssetUrl('background-image.png')}")`;

  return (
    <main className="min-h-screen bg-black text-slate-100">
      <Header />
      <div
        className="flex min-h-screen items-center justify-center bg-cover bg-center bg-fixed px-6 py-10"
        style={{ backgroundImage }}
      >
        <div className="w-full max-w-[1100px] text-center">
          <img
            src={getAssetUrl('plugpage.png')}
            alt="Page not found"
            className="mx-auto max-h-[82vh] w-full rounded-[10px] border border-yellow-400 object-contain shadow-[0_0_30px_rgba(250,204,21,0.12)]"
          />
          <Link
            to="/"
            className="mx-auto mt-6 inline-flex h-12 items-center justify-center rounded-md bg-yellow-400 px-6 font-bold text-black transition hover:bg-yellow-300"
          >
            Back to Search
          </Link>
        </div>
      </div>
    </main>
  );
}
