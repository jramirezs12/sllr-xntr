import { render, screen } from '@testing-library/react';

import { AuthSplitLayout } from './layout';

jest.mock('./content', () => ({
  AuthSplitContent: ({ children, layoutQuery }: { children: React.ReactNode; layoutQuery: string }) => (
    <div data-testid="auth-split-content" data-layout-query={layoutQuery}>
      {children}
    </div>
  ),
}));

jest.mock('../core', () => ({
  HeaderSection: () => <header data-testid="auth-header" />,
  MainSection: ({ children }: { children: React.ReactNode }) => (
    <main data-testid="auth-main-section">{children}</main>
  ),
  LayoutSection: ({ children, headerSection, cssVars }: any) => (
    <div data-testid="auth-layout" data-css-vars={JSON.stringify(cssVars)}>
      {headerSection}
      {children}
    </div>
  ),
}));

describe('AuthSplitLayout', () => {
  it('renders children through AuthSplitContent', () => {
    render(<AuthSplitLayout>Auth body</AuthSplitLayout>);

    expect(screen.getByTestId('auth-split-content')).toHaveTextContent('Auth body');
    expect(screen.getByTestId('auth-main-section')).toBeInTheDocument();
  });

  it('sets default auth css vars and keeps custom vars', () => {
    render(<AuthSplitLayout>Auth body</AuthSplitLayout>);

    const cssVars = JSON.parse(screen.getByTestId('auth-layout').getAttribute('data-css-vars') || '{}');

    expect(cssVars['--layout-auth-content-width']).toBe('420px');
  });
});
