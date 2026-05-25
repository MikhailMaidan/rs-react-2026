import { Link } from 'react-router-dom';
import { useTheme } from '../../context';
import { getAssetUrl } from '../../utils/assets';

export const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const nextTheme = theme === 'dark' ? 'Light' : 'Dark';

  return (
    <header className="relative h-[66px] overflow-hidden border-b border-zinc-900 bg-black sm:h-[70px]">
      <img
        src={getAssetUrl('header.png')}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/10" />

      <div className="relative z-10 mx-auto flex h-full max-w-[1500px] items-center justify-between gap-4 px-4 sm:px-6">
        <Link to="/" aria-label="Go to main page">
          <img
            src={getAssetUrl('logo.png')}
            alt="Starforge"
            className="h-auto w-[220px] max-w-[52vw] object-contain mix-blend-screen sm:w-[250px] sm:max-w-[70vw]"
          />
        </Link>
        <div className="flex items-center gap-2 sm:gap-3">
          <nav className="hidden items-center gap-3 sm:flex">
            <Link to="/plug" className="header-link min-w-[96px]">
              Plug
            </Link>
            <Link to="/about" className="header-link min-w-[110px]">
              About
            </Link>
          </nav>
          <button
            type="button"
            className="theme-button"
            onClick={toggleTheme}
          >
            {nextTheme}
          </button>
        </div>
      </div>
    </header>
  );
};
