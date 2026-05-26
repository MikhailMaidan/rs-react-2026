import { Link } from 'react-router-dom';
import { Header } from '../Header';
import { getAssetUrl } from '../../utils/assets';

export const NotFound = () => {
  const backgroundImage = `url("${getAssetUrl('background-image.png')}")`;

  return (
    <main className="app-page">
      <Header />
      <section
        className="not-found-section"
        style={{ backgroundImage }}
      >
        <div className="not-found-content">
          <img
            src={getAssetUrl('plugpage.png')}
            alt="Page not found"
            className="not-found-image"
          />
          <h1 className="not-found-title">Page not found</h1>
          <p className="not-found-text">
            This route does not exist or has not been implemented yet.
          </p>
          <Link to="/" className="primary-small-link">
            Back to Search
          </Link>
        </div>
      </section>
    </main>
  );
};
