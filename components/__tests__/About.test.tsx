import { render, screen } from '@testing-library/react';
import { About } from '../About';

describe('About', () => {
  it('renders the section label and headline', () => {
    render(<About />);
    expect(screen.getByText('§02 · About')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 2, name: /a small studio that measures carefully/i })
    ).toBeInTheDocument();
  });

  it('renders the three values with the corrected Independent copy', () => {
    render(<About />);
    expect(screen.getByRole('heading', { name: /specific over general/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /quiet by default/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /independent/i })).toBeInTheDocument();
    expect(screen.getByText(/move slowly on the things worth getting right/i)).toBeInTheDocument();
  });

  it('shows the headshot line', () => {
    render(<About />);
    expect(screen.getByAltText('Tyler Steelman')).toHaveAttribute('src', '/tyler-headshot.jpg');
    expect(screen.getByText(/you'll talk with tyler steelman/i)).toBeInTheDocument();
  });

  it('no longer shows the old section counter', () => {
    const { container } = render(<About />);
    expect(container.textContent).not.toMatch(/\/03/);
  });
});
