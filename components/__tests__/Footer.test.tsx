import { render, screen } from '@testing-library/react';
import { Footer } from '../Footer';

describe('Footer', () => {
  it('renders copyright text', () => {
    render(<Footer />);
    expect(screen.getByText(/© 2026 Metric House/i)).toBeInTheDocument();
  });

  it('renders Knowmad footer link with noopener', () => {
    render(<Footer />);
    const link = screen.getByRole('link', { name: /knowmad ↗/i });
    expect(link).toHaveAttribute('href', 'https://knowmad.work');
    expect(link).toHaveAttribute('rel', 'noopener');
  });

  it('renders Formulate footer link with noopener', () => {
    render(<Footer />);
    const link = screen.getByRole('link', { name: /formulate ↗/i });
    expect(link).toHaveAttribute('href', 'https://formulatesurveys.com');
    expect(link).toHaveAttribute('rel', 'noopener');
  });

  it('renders mailto link', () => {
    render(<Footer />);
    const link = screen.getByRole('link', { name: /info@metric-house\.com/i });
    expect(link).toHaveAttribute('href', 'mailto:info@metric-house.com');
  });

  it('renders brand tagline', () => {
    render(<Footer />);
    expect(screen.getByText(/independent software studio/i)).toBeInTheDocument();
  });
});
