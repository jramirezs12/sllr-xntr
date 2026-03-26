jest.mock('src/routes/paths', () => ({
  paths: { auth: { signIn: '/auth/sign-in' } },
}));

describe('auth/context/utils', () => {
  beforeEach(() => {
    sessionStorage.clear();
    jest.resetModules();
    jest.clearAllMocks();
  });

  describe('getSession', () => {
    it('returns null when no token in sessionStorage', async () => {
      const { getSession } = await import('./utils');
      expect(getSession()).toBeNull();
    });

    it('returns the stored token', async () => {
      sessionStorage.setItem('access_token', 'my-token');
      const { getSession } = await import('./utils');
      expect(getSession()).toBe('my-token');
    });
  });

  describe('setSession', () => {
    it('stores the token in sessionStorage', async () => {
      const { setSession } = await import('./utils');
      await setSession('abc-123');
      expect(sessionStorage.getItem('access_token')).toBe('abc-123');
    });

    it('removes token when null passed', async () => {
      sessionStorage.setItem('access_token', 'abc');
      const { setSession } = await import('./utils');
      await setSession(null);
      expect(sessionStorage.getItem('access_token')).toBeNull();
    });
  });

  describe('validateSession', () => {
    it('clears token when no token exists', async () => {
      const { validateSession } = await import('./utils');
      await validateSession();
      expect(sessionStorage.getItem('access_token')).toBeNull();
    });

    it('keeps token when valid non-expired token exists', async () => {
      sessionStorage.setItem('access_token', 'valid-token');
      sessionStorage.setItem('expiration_time', (Date.now() / 1000).toString());

      const { validateSession } = await import('./utils');
      await validateSession();

      expect(sessionStorage.getItem('access_token')).toBe('valid-token');
    });

    it('removes expired token', async () => {
      sessionStorage.setItem('access_token', 'old-token');
      sessionStorage.setItem('expiration_time', (Date.now() / 1000 - 7200).toString());

      const { validateSession } = await import('./utils');
      await validateSession();

      expect(sessionStorage.getItem('access_token')).toBeNull();
    });
  });
});
