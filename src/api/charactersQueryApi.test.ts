import { afterEach, describe, expect, it, vi } from 'vitest';

describe('charactersQueryApi cache config', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
  });

  it('uses cache TTL from env', async () => {
    vi.stubEnv('VITE_API_CACHE_TTL_SECONDS', '45');
    vi.resetModules();

    const { apiCacheTtlSeconds } = await import('./charactersQueryApi');

    expect(apiCacheTtlSeconds).toBe(45);
  });

  it('uses default cache TTL when env value is not a number', async () => {
    vi.stubEnv('VITE_API_CACHE_TTL_SECONDS', 'abc');
    vi.resetModules();

    const { apiCacheTtlSeconds } = await import('./charactersQueryApi');

    expect(apiCacheTtlSeconds).toBe(300);
  });
});
