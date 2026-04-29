import { render, screen } from '@testing-library/react';
import { Nav } from '../Nav';

describe('Nav', () => {
  it('renders the brand name', () => {
    render(<Nav />);
    expect(screen.getByText('Metric House')).toBeInTheDocument();
  });

  it('renders Get in touch CTA with mailto href', () => {
    render(<Nav />);
    const cta = screen.getByRole('link', { name: /get in touch/i });
    expect(cta).toHaveAttribute('href', 'mailto:info@metric-house.com');
  });

  it('renders About anchor link', () => {
    render(<Nav />);
    expect(screen.getByRole('link', { name: /^about$/i })).toHaveAttribute('href', '#about');
  });

  it('renders Products anchor link', () => {
    render(<Nav />);
    expect(screen.getByRole('link', { name: /^products$/i })).toHaveAttribute('href', '#products');
  });

  it('renders Contact anchor link', () => {
    render(<Nav />);
    expect(screen.getByRole('link', { name: /^contact$/i })).toHaveAttribute('href', '#contact');
  });
});
