import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { routerMock, useMockPathname } from './nextNavigationMock';

type TestHref =
  | string
  | {
      pathname: string;
      query?: Record<string, string>;
    };

interface TestLinkProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  children?: ReactNode;
  href: TestHref;
  locale?: string;
}

const getPath = (href: TestHref) => {
  if (typeof href === 'string') {
    return href;
  }

  const queryString = href.query
    ? new URLSearchParams(href.query).toString()
    : '';

  return queryString ? `${href.pathname}?${queryString}` : href.pathname;
};

const withLocale = (path: string, locale = 'en') => {
  if (!path.startsWith('/')) {
    return path;
  }

  return path === '/' ? `/${locale}` : `/${locale}${path}`;
};

export const createNavigation = () => {
  return {
    Link: ({ href, locale, children, ...props }: TestLinkProps) => (
      <a href={withLocale(getPath(href), locale)} {...props}>
        {children}
      </a>
    ),
    getPathname: ({ href, locale }: { href: TestHref; locale?: string }) =>
      withLocale(getPath(href), locale),
    redirect: () => {
      throw new Error('redirect is not available in tests');
    },
    usePathname: useMockPathname,
    useRouter: () => routerMock,
  };
};
