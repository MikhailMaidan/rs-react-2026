import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

process.env.BROWSER ??= 'chrome';

const nextIntlNavigationMock = fileURLToPath(
  new URL('./src/test-utils/nextIntlNavigationMock.tsx', import.meta.url)
);

export default defineConfig({
  resolve: {
    alias: {
      'next/image': 'next/image.js',
      'next/link': 'next/link.js',
      'next/navigation': 'next/navigation.js',
      'next-intl/navigation': nextIntlNavigationMock,
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/**/*.test.{ts,tsx}',
        'src/**/*.spec.{ts,tsx}',
        'src/setupTests.ts',
        'src/**/*.d.ts',
        'src/app/**/*.{ts,tsx}',
      ],
      thresholds: {
        statements: 80,
        branches: 50,
        functions: 50,
        lines: 50,
      },
    },
  },
});
