import { render } from '@testing-library/react';
import { SmoothScroll } from '../SmoothScroll';

describe('SmoothScroll', () => {
  it('renders nothing visible', () => {
    const { container } = render(<SmoothScroll />);
    expect(container.firstChild).toBeNull();
  });
});
