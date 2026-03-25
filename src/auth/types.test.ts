import type { AuthState, AuthContextValue, UserType } from './types';

describe('auth types', () => {
  it('AuthState has user and loading', () => {
    const state: AuthState = { user: null, loading: false };
    expect(state.user).toBeNull();
    expect(state.loading).toBe(false);
  });

  it('AuthContextValue has expected shape', () => {
    const ctx: AuthContextValue = {
      user: { id: '1' },
      loading: false,
      authenticated: true,
      unauthenticated: false,
    };
    expect(ctx.authenticated).toBe(true);
    expect(ctx.unauthenticated).toBe(false);
  });

  it('UserType can be null or record', () => {
    const u1: UserType = null;
    const u2: UserType = { id: '1', name: 'Test' };
    expect(u1).toBeNull();
    expect(u2).toHaveProperty('id');
  });
});
