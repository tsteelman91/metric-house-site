import { render, screen } from '@testing-library/react';
import Home from '../../app/page';

describe('Home page', () => {
  it('has exactly one H1, the GEO headline', () => {
    render(<Home />);
    const h1s = screen.getAllByRole('heading', { level: 1 });
    expect(h1s).toHaveLength(1);
    expect(h1s[0]).toHaveTextContent(/does it name you/i);
  });

  it('orders the sections and keeps the anchor ids', () => {
    const { container } = render(<Home />);
    const ids = [...container.querySelectorAll('main > section')].map((s) => s.id);
    expect(ids).toEqual(['top', 'geo', 'about', 'products', 'contact']);
  });

  it('numbers the sections 01 to 04', () => {
    const { container } = render(<Home />);
    const labels = (container.textContent ?? '').match(/§0\d/g);
    expect(labels).toEqual(['§01', '§02', '§03', '§04']);
  });

  it('has exactly one form', () => {
    const { container } = render(<Home />);
    expect(container.querySelectorAll('form')).toHaveLength(1);
  });

  it('has no em dashes, geo@, info@ or old product copy', () => {
    const { container } = render(<Home />);
    expect(container.innerHTML).not.toMatch(/\u2014|info@|geo@|AI-powered|Three things|Three products/);
  });
});
