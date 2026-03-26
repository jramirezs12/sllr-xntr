jest.mock('framer-motion', () => ({
  useScroll: jest.fn(() => ({
    scrollYProgress: { value: 0 },
    scrollXProgress: { value: 0 },
  })),
}));

import { renderHook } from '@testing-library/react';

import { useScrollProgress } from './use-scroll-progress';

describe('useScrollProgress', () => {
  it('returns elementRef, scrollXProgress and scrollYProgress', () => {
    const { result } = renderHook(() => useScrollProgress());
    expect(result.current.elementRef).toBeDefined();
    expect(result.current.scrollYProgress).toBeDefined();
    expect(result.current.scrollXProgress).toBeDefined();
  });

  it('defaults to document target', () => {
    const { useScroll } = require('framer-motion');
    renderHook(() => useScrollProgress('document'));
    expect(useScroll).toHaveBeenCalledWith(undefined);
  });

  it('uses container ref when target is container', () => {
    const { useScroll } = require('framer-motion');
    renderHook(() => useScrollProgress('container'));
    expect(useScroll).toHaveBeenCalledWith(expect.objectContaining({ container: expect.anything() }));
  });
});
