import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Header } from '../components/Header';
import '../index.css';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'Starforge Search',
  description: 'Star Wars character search app',
};

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
