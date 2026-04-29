import { render, screen } from '@testing-library/react';
import Home from '../../app/page';

describe('Home page', () => {
  it('renders without crashing', () => {
    render(<Home />);
  });

  it('has exactly one H1', () => {
    render(<Home />);
    const h1s = screen.getAllByRole('heading', { level: 1 });
    expect(h1s).toHaveLength(1);
  });

  it('has H2 headings for About, Products, Contact sections', () => {
    render(<Home />);
    expect(screen.getByRole('heading', { level: 2, name: /small studio/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: /two things/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: /hear from you/i })).toBeInTheDocument();
  });
});
