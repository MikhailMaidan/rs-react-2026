import { Link } from 'react-router-dom';
import { getAssetUrl } from '../../utils/assets';

export function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-6 py-10 text-white">
      <div className="w-full max-w-[920px] text-center">
        <img
          src={getAssetUrl('plugpage.png')}
          alt="Page not found"
          className="mx-auto max-h-[70vh] w-full rounded-[10px] border border-yellow-400 object-contain"
        />
        <Link
          to="/"
          className="mx-auto mt-6 inline-flex h-12 items-center justify-center rounded-md bg-yellow-400 px-6 font-bold text-black transition hover:bg-yellow-300"
        >
          Back to Search
        </Link>
      </div>
    </main>
  );
}
