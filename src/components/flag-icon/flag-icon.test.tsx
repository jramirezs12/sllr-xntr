jest.mock('minimal-shared/utils', () => ({
  mergeClasses: (...args: any[]) => args.flat().filter(Boolean).join(' '),
}));

import React from 'react';
import { render, screen } from '@testing-library/react';

import { FlagIcon } from './flag-icon';

describe('FlagIcon', () => {
  it('renders nothing when no code provided', () => {
    const { container } = render(<FlagIcon />);
    expect(container.firstChild).toBeNull();
  });

  it('renders flag image for a country code', () => {
    render(<FlagIcon code="US" />);
    const img = screen.getByAltText('US');
    expect(img).toBeInTheDocument();
    expect(img.getAttribute('src')).toContain('US');
  });

  it('uppercases the country code in image src', () => {
    render(<FlagIcon code="gb" />);
    const img = screen.getByAltText('gb');
    expect(img.getAttribute('src')).toContain('GB');
  });
});
