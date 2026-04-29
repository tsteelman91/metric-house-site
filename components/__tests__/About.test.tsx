import { render, screen } from '@testing-library/react';
import { About } from '../About';

describe('About', () => {
  it('renders section H2', () => {
    render(<About />);
    expect(
      screen.getByRole('heading', { level: 2, name: /small studio/i })
    ).toBeInTheDocument();
  });

  it('renders section number 01', () => {
    const { container } = render(<About />);
    const sectionNum = container.querySelector('.numBig');
    expect(sectionNum).toHaveTextContent('01');
  });

  it('renders all three principle titles', () => {
    render(<About />);
    expect(screen.getByRole('heading', { name: /specific over general/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /quiet by default/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /independent/i })).toBeInTheDocument();
  });

  it('renders italic product names in prose', () => {
    const { container } = render(<About />);
    const ems = container.querySelectorAll('[class*="productName"]');
    expect(ems.length).toBeGreaterThanOrEqual(2);
  });
});
