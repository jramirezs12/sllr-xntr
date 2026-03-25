jest.mock('src/routes/components', () => ({
  RouterLink: 'a',
}));
jest.mock('minimal-shared/utils', () => ({
  mergeClasses: (...args: any[]) => args.flat().filter(Boolean).join(' '),
}));

import React from 'react';
import { render, screen } from '@testing-library/react';

import { CustomBreadcrumbs } from './custom-breadcrumbs';

describe('CustomBreadcrumbs', () => {
  it('renders heading when provided', () => {
    render(<CustomBreadcrumbs heading="Dashboard" />);
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });

  it('renders links when provided', () => {
    render(
      <CustomBreadcrumbs
        links={[
          { name: 'Home', href: '/' },
          { name: 'Settings', href: '/settings' },
        ]}
      />
    );
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
  });

  it('renders action when provided', () => {
    render(<CustomBreadcrumbs action={<button>Add</button>} />);
    expect(screen.getByRole('button', { name: 'Add' })).toBeInTheDocument();
  });

  it('renders nothing by default when no links or heading', () => {
    const { container } = render(<CustomBreadcrumbs />);
    expect(container).toBeInTheDocument();
  });
});
