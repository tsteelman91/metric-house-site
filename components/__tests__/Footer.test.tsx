import { render, screen } from '@testing-library/react';
import { Footer } from '../Footer';

describe('Footer', () => {
  it('renders the new tagline and copyright', () => {
    render(<Footer />);
    expect(screen.getByText(/careful measurement for local businesses/i)).toBeInTheDocument();
    expect(screen.getByText(/© 2026 Metric House/i)).toBeInTheDocument();
    expect(screen.getByText(/made in nc/i)).toBeInTheDocument();
  });

  it.each([
    ['Knowmad', 'https://knowmad.work'],
    ['Formulate', 'https://formulatesurveys.com'],
    ['Recruit', 'https://recruit.metric-house.com'],
  ])('renders %s link with noopener', (name, href) => {
    render(<Footer />);
    const link = screen.getByRole('link', { name: new RegExp(`${name} ↗`, 'i') });
    expect(link).toHaveAttribute('href', href);
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders the GEO and company links', () => {
    render(<Footer />);
    expect(screen.getByRole('link', { name: 'How it works' })).toHaveAttribute('href', '#geo');
    expect(screen.getByRole('link', { name: 'Set up a call' })).toHaveAttribute('href', '#contact');
    expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute('href', '#about');
    expect(screen.getByRole('link', { name: 'Contact' })).toHaveAttribute('href', '#contact');
  });

  it('renders the info@ mailto link', () => {
    render(<Footer />);
    const link = screen.getByRole('link', { name: /info@metric-house\.com/i });
    expect(link).toHaveAttribute('href', 'mailto:info@metric-house.com');
  });
});
