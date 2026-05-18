import { Link } from 'react-router-dom';
import { getAssetUrl } from '../../utils/assets';

export function Header() {
  return (
    <header className="relative h-[92px] overflow-hidden border-b border-zinc-900 bg-black sm:h-[96px]">
      <img
        src={getAssetUrl('header.png')}
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/10" />

      <div className="relative z-10 mx-auto flex h-full max-w-[1800px] items-start justify-between gap-5 px-6 pt-4 sm:px-9">
        <img
          src={getAssetUrl('logo.png')}
          alt="Starforge"
          className="h-auto w-[310px] max-w-[70vw] object-contain mix-blend-screen sm:w-[330px]"
        />
        <nav className="mt-2 hidden items-center gap-4 sm:flex">
          <Link
            to="/plug"
            className="flex h-14 min-w-[150px] items-center justify-center rounded-lg border border-yellow-400 bg-zinc-950/80 px-5 text-[20px] font-bold text-white shadow-[0_0_20px_rgba(250,204,21,0.16)] transition hover:bg-yellow-400/10"
          >
            Plug
          </Link>
          <Link
            to="/about"
            className="flex h-14 min-w-[170px] items-center justify-center rounded-lg border border-yellow-400 bg-zinc-950/80 px-5 text-[20px] font-bold text-white shadow-[0_0_20px_rgba(250,204,21,0.16)] transition hover:bg-yellow-400/10"
          >
            About
          </Link>
        </nav>
      </div>
    </header>
  );
}
