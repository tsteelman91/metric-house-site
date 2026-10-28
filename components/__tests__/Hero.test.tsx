import { render, screen } from '@testing-library/react';
import { Hero } from '../Hero';

describe('Hero', () => {
  it('renders the GEO headline as the H1', () => {
    render(<Hero />);
    expect(screen.getByRole('heading', { level: 1, name: /does it name you/i })).toBeInTheDocument();
    expect(screen.getByText('Metric House · Chapel Hill, NC')).toBeInTheDocument();
  });

  it('renders the call and how-it-works buttons', () => {
    render(<Hero />);
    expect(screen.getByRole('link', { name: /set up a call/i })).toHaveAttribute('href', '#contact');
    expect(screen.getByRole('link', { name: /how it works/i })).toHaveAttribute('href', '#geo');
  });

  it('renders the example card', () => {
    render(<Hero />);
    expect(screen.getByRole('figure')).toHaveAttribute('aria-label', expect.stringMatching(/^Illustration/));
    expect(screen.getByText('named 3 of 20 asks')).toBeInTheDocument();
  });

  it('renders the four stats, with Also linking to products', () => {
    render(<Hero />);
    expect(screen.getByText('Local and small businesses')).toBeInTheDocument();
    expect(screen.getByText('A plain-English report')).toBeInTheDocument();
    expect(screen.getByText('Chapel Hill, NC')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /software for research teams/i })).toHaveAttribute('href', '#products');
  });

  it('drops the old hero copy', () => {
    const { container } = render(<Hero />);
    expect(container.textContent).not.toMatch(/actually want to work|three products|hiring/i);
  });
});
