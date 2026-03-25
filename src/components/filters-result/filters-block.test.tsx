import React from 'react';
import { render, screen } from '@testing-library/react';

import { FiltersBlock } from './filters-block';

describe('FiltersBlock', () => {
  it('renders nothing when isShow is false', () => {
    const { container } = render(
      <FiltersBlock label="Status" isShow={false}>
        <span>chip</span>
      </FiltersBlock>
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders content when isShow is true', () => {
    render(
      <FiltersBlock label="Status" isShow>
        <span>chip</span>
      </FiltersBlock>
    );
    expect(screen.getByText('Status')).toBeInTheDocument();
    expect(screen.getByText('chip')).toBeInTheDocument();
  });

  it('renders label', () => {
    render(
      <FiltersBlock label="Priority" isShow>
        <span>item</span>
      </FiltersBlock>
    );
    expect(screen.getByText('Priority')).toBeInTheDocument();
  });
});
