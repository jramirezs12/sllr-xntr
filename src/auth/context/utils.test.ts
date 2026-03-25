jest.mock('src/routes/paths', () => ({
  paths: {
    auth: { signIn: '/auth/sign-in' },
  },
}));

const mockHref = jest.fn();
Object.defineProperty(window, 'location', {
  value: { get href() { return '/'; }, set href(v) { mockHref(v); } },
  writable: true,
});

describe('auth/context/utils', () => {
  beforeEach(() => {
    sessionStorage.clear();
    mockHref.mockReset();
    jest.resetModules();
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

    it('removes token and redirects when null passed', async () => {
      sessionStorage.setItem('access_token', 'abc');
      const { setSession } = await import('./utils');
      await setSession(null);
      expect(sessionStorage.getItem('access_token')).toBeNull();
      expect(mockHref).toHaveBeenCalledWith('/auth/sign-in');
    });
  });

  describe('validateSession', () => {
    it('redirects to sign-in when no token exists', async () => {
      const { validateSession } = await import('./utils');
      await validateSession();
      expect(mockHref).toHaveBeenCalledWith('/auth/sign-in');
    });

    it('does not redirect when valid non-expired token exists', async () => {
      sessionStorage.setItem('access_token', 'valid-token');
      // Store a recent time (just now), so not expired
      const now = Date.now() / 1000;
      sessionStorage.setItem('expiration_time', now.toString());
      const { validateSession } = await import('./utils');
      await validateSession();
      expect(mockHref).not.toHaveBeenCalled();
    });

    it('removes expired token and redirects', async () => {
      sessionStorage.setItem('access_token', 'old-token');
      // Store a time 2 hours ago (expired)
      const twoHoursAgo = Date.now() / 1000 - 7200;
      sessionStorage.setItem('expiration_time', twoHoursAgo.toString());
      const { validateSession } = await import('./utils');
      await validateSession();
      expect(sessionStorage.getItem('access_token')).toBeNull();
      expect(mockHref).toHaveBeenCalledWith('/auth/sign-in');
    });
  });
});
