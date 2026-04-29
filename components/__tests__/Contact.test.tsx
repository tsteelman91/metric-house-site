import { render, screen } from '@testing-library/react';
import { Contact } from '../Contact';

describe('Contact', () => {
  it('renders H2 with key text', () => {
    render(<Contact />);
    expect(screen.getByRole('heading', { level: 2, name: /hear from you/i })).toBeInTheDocument();
  });

  it('renders italic span in H2', () => {
    const { container } = render(<Contact />);
    const h2 = screen.getByRole('heading', { level: 2 });
    expect(h2.querySelector('em')).toBeInTheDocument();
  });

  it('renders mailto link', () => {
    render(<Contact />);
    const link = screen.getByRole('link', { name: /info@metric-house\.com/i });
    expect(link).toHaveAttribute('href', 'mailto:info@metric-house.com');
  });

  it('renders WRITE TO US label', () => {
    render(<Contact />);
    expect(screen.getByText('WRITE TO US')).toBeInTheDocument();
  });
});
