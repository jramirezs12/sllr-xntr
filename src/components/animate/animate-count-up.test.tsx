jest.mock('framer-motion', () => ({
  m: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    span: ({ children, ref, ...props }: any) => <span {...props}>{children}</span>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
  useInView: jest.fn(() => true),
  useMotionValue: jest.fn((v: any) => {
    const motionValue = { current: v, get: () => motionValue.current, set: (val: any) => { motionValue.current = val; } };
    return motionValue;
  }),
  useTransform: jest.fn((_value: any, transform: any) => {
    const result = { get: () => transform ? transform(0) : '0' };
    return result;
  }),
  animate: jest.fn(),
}));

import React from 'react';
import { render, screen } from '@testing-library/react';

import { AnimateCountUp } from './animate-count-up';

describe('AnimateCountUp', () => {
  it('renders a typography element', () => {
    render(<AnimateCountUp to={1000} />);
    const el = screen.getByRole('paragraph');
    expect(el).toBeInTheDocument();
  });

  it('renders with unit suffix for large numbers', () => {
    render(<AnimateCountUp to={5000} />);
    expect(screen.getByText('k')).toBeInTheDocument();
  });

  it('renders with custom unit', () => {
    render(<AnimateCountUp to={42} unit="%" />);
    expect(screen.getByText('%')).toBeInTheDocument();
  });

  it('renders without unit for small numbers', () => {
    const { container } = render(<AnimateCountUp to={42} />);
    expect(container).toBeInTheDocument();
  });
});
