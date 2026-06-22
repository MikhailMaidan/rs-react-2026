import { NextIntlClientProvider } from 'next-intl';
import { NotFound } from '../components/NotFound';
import { Header } from '../components/Header';
import { Providers } from './providers';
import messages from '../messages/en.json';

const NotFoundPage = () => {
  return (
    <NextIntlClientProvider locale="en" messages={messages}>
      <Providers>
        <Header />
        <main className="app-page">
          <NotFound />
        </main>
      </Providers>
    </NextIntlClientProvider>
  );
};

export default NotFoundPage;
