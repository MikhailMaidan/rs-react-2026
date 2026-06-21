import { Suspense } from 'react';
import App from '../../App';

const HomePage = () => {
  return (
    <Suspense fallback={null}>
      <App />
    </Suspense>
  );
};

export default HomePage;
