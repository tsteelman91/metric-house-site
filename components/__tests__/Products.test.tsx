import { render, screen } from '@testing-library/react';
import { Products } from '../Products';

describe('Products', () => {
  it('renders section H2', () => {
    render(<Products />);
    expect(screen.getByRole('heading', { level: 2, name: /two things/i })).toBeInTheDocument();
  });

  it('renders two product article elements', () => {
    const { container } = render(<Products />);
    const articles = container.querySelectorAll('article');
    expect(articles).toHaveLength(2);
  });

  it('renders Knowmad H3 heading', () => {
    render(<Products />);
    expect(screen.getByRole('heading', { level: 3, name: /knowmad/i })).toBeInTheDocument();
  });

  it('renders Formulate H3 heading', () => {
    render(<Products />);
    expect(screen.getByRole('heading', { level: 3, name: /formulate/i })).toBeInTheDocument();
  });

  it('knowmad link has correct href and opens new tab', () => {
    render(<Products />);
    const link = screen.getByRole('link', { name: /visit knowmad\.work/i });
    expect(link).toHaveAttribute('href', 'https://knowmad.work');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener');
  });

  it('formulate link has correct href and opens new tab', () => {
    render(<Products />);
    const link = screen.getByRole('link', { name: /visit formulatesurveys\.com/i });
    expect(link).toHaveAttribute('href', 'https://formulatesurveys.com');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener');
  });

  it('product visuals are aria-hidden', () => {
    const { container } = render(<Products />);
    const visuals = container.querySelectorAll('[aria-hidden="true"]');
    expect(visuals.length).toBeGreaterThanOrEqual(2);
  });
});
