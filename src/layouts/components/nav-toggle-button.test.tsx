import { render, screen } from '@testing-library/react';

import { NavToggleButton } from './nav-toggle-button';

jest.mock('@mui/material/IconButton', () => ({
  __esModule: true,
  default: ({ children, ...props }: any) => <button {...props}>{children}</button>,
}));

jest.mock('minimal-shared/utils', () => ({
  varAlpha: () => 'rgba(0 0 0 / 0.12)',
}));

jest.mock('src/components/iconify', () => ({
  Iconify: ({ icon }: { icon: string }) => <span data-testid="toggle-icon" data-icon={icon} />,
}));

describe('NavToggleButton', () => {
  it('renders back icon when nav is expanded', () => {
    render(<NavToggleButton isNavMini={false} />);

    expect(screen.getByTestId('toggle-icon')).toHaveAttribute('data-icon', 'eva:arrow-ios-back-fill');
  });

  it('renders forward icon when nav is mini', () => {
    render(<NavToggleButton isNavMini />);

    expect(screen.getByTestId('toggle-icon')).toHaveAttribute(
      'data-icon',
      'eva:arrow-ios-forward-fill'
    );
  });
});
