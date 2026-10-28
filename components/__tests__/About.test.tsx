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

  it('no longer shows the three values', () => {
    const { container } = render(<About />);
    expect(container.textContent).not.toMatch(/specific over general|quiet by default|move slowly/i);
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
