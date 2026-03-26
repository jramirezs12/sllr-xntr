import { render, screen, fireEvent } from '@testing-library/react';

import { MainLayout } from './layout';

const mockOnOpen = jest.fn();
const mockOnClose = jest.fn();
const mockUsePathname = jest.fn();

jest.mock('minimal-shared/hooks', () => ({
  useBoolean: () => ({ value: false, onTrue: mockOnOpen, onFalse: mockOnClose }),
}));

jest.mock('src/routes/hooks', () => ({
  usePathname: () => mockUsePathname(),
}));

jest.mock('src/components/logo', () => ({
  Logo: () => <div data-testid="main-logo" />,
}));

jest.mock('./nav/mobile', () => ({
  NavMobile: ({ open }: { open: boolean }) => <div data-testid="nav-mobile" data-open={String(open)} />,
}));

jest.mock('./nav/desktop', () => ({
  NavDesktop: () => <div data-testid="nav-desktop" />,
}));

jest.mock('./footer', () => ({
  Footer: () => <footer data-testid="footer" />,
  HomeFooter: () => <footer data-testid="home-footer" />,
}));

jest.mock('../components/menu-button', () => ({
  MenuButton: ({ onClick }: { onClick?: () => void }) => (
    <button type="button" onClick={onClick}>
      menu
    </button>
  ),
}));

jest.mock('../components/sign-in-button', () => ({
  SignInButton: () => <button type="button">sign in</button>,
}));

jest.mock('../components/settings-button', () => ({
  SettingsButton: () => <button type="button">settings</button>,
}));

jest.mock('../nav-config-main', () => ({
  navData: [],
}));

jest.mock('../core', () => ({
  HeaderSection: ({ slots }: { slots?: any }) => (
    <header>
      {slots?.topArea}
      {slots?.leftArea}
      {slots?.rightArea}
    </header>
  ),
  MainSection: ({ children }: { children: React.ReactNode }) => (
    <main data-testid="main-layout-content">{children}</main>
  ),
  LayoutSection: ({ children, headerSection, footerSection }: any) => (
    <div>
      {headerSection}
      {children}
      {footerSection}
    </div>
  ),
}));

describe('MainLayout', () => {
  beforeEach(() => {
    mockOnOpen.mockReset();
    mockOnClose.mockReset();
    mockUsePathname.mockReset();
  });

  it('renders HomeFooter on home path', () => {
    mockUsePathname.mockReturnValue('/');

    render(<MainLayout>Body</MainLayout>);

    expect(screen.getByTestId('home-footer')).toBeInTheDocument();
    expect(screen.queryByTestId('footer')).not.toBeInTheDocument();
  });

  it('renders Footer on non-home path', () => {
    mockUsePathname.mockReturnValue('/returns');

    render(<MainLayout>Body</MainLayout>);

    expect(screen.getByTestId('footer')).toBeInTheDocument();
    expect(screen.queryByTestId('home-footer')).not.toBeInTheDocument();
  });

  it('opens mobile nav when menu button is clicked', () => {
    mockUsePathname.mockReturnValue('/');

    render(<MainLayout>Body</MainLayout>);

    fireEvent.click(screen.getByRole('button', { name: 'menu' }));
    expect(mockOnOpen).toHaveBeenCalledTimes(1);
  });
});
