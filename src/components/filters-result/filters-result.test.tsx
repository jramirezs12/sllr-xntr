import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import { FiltersResult } from './filters-result';

jest.mock('../iconify', () => ({
  Iconify: ({ icon }: { icon: string }) => <span data-icon={icon} />,
}));

describe('FiltersResult', () => {
  it('renders total results count', () => {
    render(<FiltersResult totalResults={42}>{null}</FiltersResult>);
    expect(screen.getByText('42')).toBeInTheDocument();
    expect(screen.getByText('results found')).toBeInTheDocument();
  });

  it('renders Clear button', () => {
    render(<FiltersResult totalResults={5}>{null}</FiltersResult>);
    expect(screen.getByRole('button', { name: /clear/i })).toBeInTheDocument();
  });

  it('calls onReset when Clear is clicked', () => {
    const onReset = jest.fn();
    render(<FiltersResult totalResults={5} onReset={onReset}>{null}</FiltersResult>);
    fireEvent.click(screen.getByRole('button', { name: /clear/i }));
    expect(onReset).toHaveBeenCalledTimes(1);
  });

  it('renders children', () => {
    render(<FiltersResult totalResults={5}><span>Filter chip</span></FiltersResult>);
    expect(screen.getByText('Filter chip')).toBeInTheDocument();
  });
});
