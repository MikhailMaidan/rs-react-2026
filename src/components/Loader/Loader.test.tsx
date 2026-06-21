import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { renderWithIntl } from '../../test-utils/renderWithIntl';
import { Loader } from './Loader';

describe('Loader', () => {
  it('renders loading status', () => {
    renderWithIntl(<Loader />);

    expect(
      screen.getByRole('status', { name: /loading results/i })
    ).toBeInTheDocument();
  });
});
