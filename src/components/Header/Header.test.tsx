import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ThemeProvider } from '../../context';
import { resetMockNavigation } from '../../test-utils/nextNavigationMock';
import { renderWithIntl } from '../../test-utils/renderWithIntl';
import { Header } from './Header';

vi.mock('next/navigation', async () => {
  const navigationMock = await import('../../test-utils/nextNavigationMock');

  return {
    useSearchParams: navigationMock.useMockSearchParams,
  };
});

vi.mock('../../i18n/navigation', async () => {
  const actual = await vi.importActual<typeof import('../../i18n/navigation')>(
    '../../i18n/navigation'
  );
  const navigationMock = await import('../../test-utils/nextNavigationMock');

  return {
    ...actual,
    useRouter: () => navigationMock.routerMock,
    usePathname: navigationMock.useMockPathname,
  };
});

describe('Header', () => {
  beforeEach(() => {
    resetMockNavigation();
  });

  const renderHeader = () => {
    renderWithIntl(
      <ThemeProvider>
        <Header />
      </ThemeProvider>
    );
  };

  it('renders logo image', () => {
    renderHeader();

    expect(screen.getByRole('img', { name: 'Starforge' })).toBeInTheDocument();
    expect(screen.getByLabelText(/go to main page/i)).toHaveAttribute(
      'href',
      '/en'
    );
    expect(screen.getByRole('link', { name: /plug/i })).toHaveAttribute(
      'href',
      '/en/plug'
    );
    expect(screen.getByRole('link', { name: /about/i })).toHaveAttribute(
      'href',
      '/en/about'
    );
  });

  it('changes theme after button click', async () => {
    const user = userEvent.setup();

    renderHeader();

    expect(document.documentElement.dataset.theme).toBe('dark');

    await user.click(screen.getByRole('button', { name: /light/i }));

    expect(document.documentElement.dataset.theme).toBe('light');
    expect(screen.getByRole('button', { name: /dark/i })).toBeInTheDocument();
  });
});
