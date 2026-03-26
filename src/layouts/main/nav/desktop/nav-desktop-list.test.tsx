import { render, screen, fireEvent } from '@testing-library/react';

import { NavList } from './nav-desktop-list';

const mockOnOpen = jest.fn();
const mockOnClose = jest.fn();
const mockUseBoolean = jest.fn();
const mockUsePathname = jest.fn();

jest.mock('minimal-shared/hooks', () => ({
  useBoolean: () => mockUseBoolean(),
}));

jest.mock('minimal-shared/utils', () => ({
  isEqualPath: (a: string, b: string) => a === b,
  isActiveLink: () => true,
  isExternalLink: (path: string) => path.startsWith('http'),
}));

jest.mock('src/routes/hooks', () => ({
  usePathname: () => mockUsePathname(),
}));

jest.mock('./nav-desktop-item', () => ({
  NavItem: ({ title, onMouseEnter, hasChild }: any) => (
    <button type="button" data-has-child={String(Boolean(hasChild))} onMouseEnter={onMouseEnter}>
      {title}
    </button>
  ),
}));

jest.mock('./nav-desktop-item-dashboard', () => ({
  NavItemDashboard: ({ path }: { path: string }) => <a href={path}>dashboard-preview</a>,
}));

jest.mock('../components', () => ({
  Nav: ({ children }: { children: React.ReactNode }) => <nav>{children}</nav>,
  NavLi: ({ children }: { children: React.ReactNode }) => <li>{children}</li>,
  NavUl: ({ children }: { children: React.ReactNode }) => <ul>{children}</ul>,
  NavDropdown: ({ children, open }: { children: React.ReactNode; open: boolean }) => (
    <div data-testid="desktop-dropdown" data-open={String(open)}>
      {children}
    </div>
  ),
}));

describe('NavList (desktop)', () => {
  beforeEach(() => {
    mockOnOpen.mockReset();
    mockOnClose.mockReset();
    mockUsePathname.mockReset();
    mockUseBoolean.mockReset();

    mockUsePathname.mockReturnValue('/dashboard');
    mockUseBoolean.mockReturnValue({ value: false, onFalse: mockOnClose, onTrue: mockOnOpen });
  });

  it('opens menu on mouse enter only when has children', () => {
    const data = {
      title: 'Products',
      path: '/products',
      children: [{ subheader: 'Shop', items: [{ title: 'All', path: '/products/all' }] }],
    };

    render(<NavList data={data} />);

    fireEvent.mouseEnter(screen.getByRole('button', { name: 'Products' }));
    expect(mockOnOpen).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId('desktop-dropdown')).toBeInTheDocument();
  });

  it('renders dashboard child using NavItemDashboard', () => {
    const data = {
      title: 'Overview',
      path: '/overview',
      children: [
        {
          subheader: 'Dashboard',
          items: [{ title: 'Main dashboard', path: '/overview/app' }],
        },
      ],
    };

    render(<NavList data={data} />);

    expect(screen.getByRole('link', { name: 'dashboard-preview' })).toHaveAttribute(
      'href',
      '/overview/app'
    );
  });
});
