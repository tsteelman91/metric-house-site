import { render, screen } from '@testing-library/react';
import { HowItWorks } from '../HowItWorks';

describe('HowItWorks', () => {
  it('is section 01 with the geo anchor', () => {
    const { container } = render(<HowItWorks />);
    expect(container.querySelector('section#geo')).toBeInTheDocument();
    expect(screen.getByText('§01 · How it works')).toBeInTheDocument();
  });

  it('renders the four steps and the report line', () => {
    render(<HowItWorks />);
    for (const name of ['Ask', 'Trace', 'Improve', 'Re-check']) {
      expect(screen.getByRole('heading', { level: 3, name })).toBeInTheDocument();
    }
    expect(screen.getByText(/you get a short written report/i)).toBeInTheDocument();
  });

  it('links to the contact form', () => {
    render(<HowItWorks />);
    expect(screen.getByRole('link', { name: /set up a call/i })).toHaveAttribute('href', '#contact');
  });

  it('has no form of its own', () => {
    const { container } = render(<HowItWorks />);
    expect(container.querySelector('form')).toBeNull();
  });
});
