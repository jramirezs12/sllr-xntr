jest.mock('framer-motion', () => ({
  m: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    span: ({ children, ...props }: any) => <span {...props}>{children}</span>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
  useInView: jest.fn(() => true),
  useMotionValue: jest.fn((v: any) => ({ get: () => v, set: jest.fn() })),
  useTransform: jest.fn(() => ({ get: () => '0' })),
  animate: jest.fn(),
}));

import React from 'react';
import { render, screen } from '@testing-library/react';

import { MotionViewport } from './motion-viewport';

describe('MotionViewport', () => {
  it('renders children', () => {
    render(
      <MotionViewport>
        <span>Viewport content</span>
      </MotionViewport>
    );
    expect(screen.getByText('Viewport content')).toBeInTheDocument();
  });

  it('renders with disableAnimate=false', () => {
    render(
      <MotionViewport disableAnimate={false}>
        <span>Animated viewport</span>
      </MotionViewport>
    );
    expect(screen.getByText('Animated viewport')).toBeInTheDocument();
  });
});
