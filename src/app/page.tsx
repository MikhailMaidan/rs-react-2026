import { redirect } from 'next/navigation';
import { routing } from '../i18n/routing';

const HomePage = () => {
  redirect(`/${routing.defaultLocale}`);
};

export default HomePage;
