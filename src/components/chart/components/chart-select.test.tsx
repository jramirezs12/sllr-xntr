jest.mock('minimal-shared/hooks', () => ({
  usePopover: jest.fn(() => ({
    open: false,
    anchorEl: null,
    onClose: jest.fn(),
    onOpen: jest.fn(),
  })),
}));
jest.mock('minimal-shared/utils', () => ({
  varAlpha: jest.fn(() => 'rgba(0,0,0,0.1)'),
}));
jest.mock('../../iconify', () => ({
  Iconify: ({ icon }: { icon: string }) => <span data-icon={icon} />,
}));
jest.mock('../../custom-popover', () => ({
  CustomPopover: ({ children, open }: any) => open ? <div>{children}</div> : null,
}));

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import { ChartSelect } from './chart-select';

describe('ChartSelect', () => {
  const options = ['Monthly', 'Weekly', 'Daily'];

  it('renders the current value', () => {
    render(<ChartSelect options={options} value="Monthly" onChange={jest.fn()} />);
    expect(screen.getByText('Monthly')).toBeInTheDocument();
  });

  it('calls onOpen when button is clicked', () => {
    const { usePopover } = require('minimal-shared/hooks');
    const onOpen = jest.fn();
    usePopover.mockReturnValueOnce({ open: false, anchorEl: null, onClose: jest.fn(), onOpen });

    render(<ChartSelect options={options} value="Monthly" onChange={jest.fn()} />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(onOpen).toHaveBeenCalled();
  });
});
