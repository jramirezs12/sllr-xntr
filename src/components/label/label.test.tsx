jest.mock('minimal-shared/utils', () => ({
  mergeClasses: (...args: any[]) => args.flat().filter(Boolean).join(' '),
  varAlpha: jest.fn(() => 'rgba(0,0,0,0.1)'),
}));
jest.mock('src/theme/core', () => ({
  colorKeys: {
    palette: ['primary', 'secondary', 'info', 'success', 'warning', 'error'],
    common: ['black', 'white'],
  },
}));

import React from 'react';
import { render, screen } from '@testing-library/react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { Label } from './label';

const theme = createTheme({
  cssVariables: true,
  mixins: { filledStyles: () => ({}) } as any,
});
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

describe('Label', () => {
  it('renders children text', () => {
    render(<Label>active</Label>, { wrapper });
    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  it('renders non-string children as-is', () => {
    render(<Label><span data-testid="icon">*</span></Label>, { wrapper });
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('renders startIcon when provided', () => {
    render(<Label startIcon={<span data-testid="start-icon" />}>label</Label>, { wrapper });
    expect(screen.getByTestId('start-icon')).toBeInTheDocument();
  });

  it('renders endIcon when provided', () => {
    render(<Label endIcon={<span data-testid="end-icon" />}>label</Label>, { wrapper });
    expect(screen.getByTestId('end-icon')).toBeInTheDocument();
  });

  it('does not render startIcon when not provided', () => {
    render(<Label>label</Label>, { wrapper });
    expect(screen.queryByTestId('start-icon')).not.toBeInTheDocument();
  });
});
