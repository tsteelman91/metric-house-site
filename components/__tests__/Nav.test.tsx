import { render, screen } from '@testing-library/react';
import { Nav } from '../Nav';

describe('Nav', () => {
  it('renders the brand name', () => {
    render(<Nav />);
    expect(screen.getByText('Metric House')).toBeInTheDocument();
  });

  it.each([
    ['How it works', '#geo'],
    ['About', '#about'],
    ['Products', '#products'],
    ['Contact', '#contact'],
  ])('renders the %s link', (name, href) => {
    render(<Nav />);
    expect(screen.getByRole('link', { name: new RegExp(`^${name}$`, 'i') })).toHaveAttribute('href', href);
  });

  it('points the button at the contact form, not email', () => {
    render(<Nav />);
    expect(screen.getByRole('link', { name: /set up a call/i })).toHaveAttribute('href', '#contact');
  });
});
