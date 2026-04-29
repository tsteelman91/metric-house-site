import { render, screen } from '@testing-library/react';
import { LogoMark } from '../LogoMark';

describe('LogoMark', () => {
  it('renders an SVG element', () => {
    const { container } = render(<LogoMark />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('SVG is aria-hidden', () => {
    const { container } = render(<LogoMark />);
    expect(container.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
  });
});
