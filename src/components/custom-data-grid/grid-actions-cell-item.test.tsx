jest.mock('src/routes/components', () => ({
  RouterLink: 'a',
}));
jest.mock('minimal-shared/utils', () => ({
  mergeClasses: (...args: any[]) => args.flat().filter(Boolean).join(' '),
  isExternalLink: jest.fn((href: string) => href.startsWith('http')),
}));
jest.mock('@mui/x-data-grid', () => ({
  GridActionsCellItem: ({ label, showInMenu, ...props }: any) => (
    <button {...props}>{label}</button>
  ),
  menuItemClasses: { root: 'MuiMenuItem-root' },
}));

import React from 'react';
import { render, screen } from '@testing-library/react';

import { CustomGridActionsCellItem } from './grid-actions-cell-item';

describe('CustomGridActionsCellItem', () => {
  it('renders action item without href', () => {
    render(
      <CustomGridActionsCellItem
        label="Edit"
        icon={<span />}
        onClick={jest.fn()}
        showInMenu={false}
      />
    );
    expect(screen.getByRole('button', { name: 'Edit' })).toBeInTheDocument();
  });

  it('renders action item with showInMenu=false', () => {
    render(
      <CustomGridActionsCellItem
        label="Delete"
        icon={<span />}
        onClick={jest.fn()}
        showInMenu={false}
      />
    );
    expect(screen.getByText('Delete')).toBeInTheDocument();
  });
});
