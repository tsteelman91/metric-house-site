import { render, screen } from '@testing-library/react';
import { Hero } from '../Hero';

describe('Hero', () => {
  it('renders H1 with key text', () => {
    render(<Hero />);
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(screen.getByText(/software for the/i)).toBeInTheDocument();
  });

  it('renders the italic "actually" emphasis', () => {
    render(<Hero />);
    const em = document.querySelector('em');
    expect(em).toBeInTheDocument();
    expect(em?.textContent).toBe('actually');
  });

  it('renders See our products CTA pointing to #products', () => {
    render(<Hero />);
    const link = screen.getByRole('link', { name: /see our products/i });
    expect(link).toHaveAttribute('href', '#products');
  });

  it('renders ghost CTA with mailto href', () => {
    render(<Hero />);
    const link = screen.getByRole('link', { name: /info@metric-house\.com/i });
    expect(link).toHaveAttribute('href', 'mailto:info@metric-house.com');
  });

  it('renders meta: Chapel Hill NC', () => {
    render(<Hero />);
    expect(screen.getByText('Chapel Hill, NC')).toBeInTheDocument();
  });
});
