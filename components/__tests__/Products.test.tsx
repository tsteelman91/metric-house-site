import { render, screen } from '@testing-library/react';
import { Products } from '../Products';

describe('Products', () => {
  it('renders the section label and headline', () => {
    render(<Products />);
    expect(screen.getByText('§03 · Also from Metric House')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: /we also build software/i })).toBeInTheDocument();
  });

  it.each([
    ['Knowmad', 'https://knowmad.work', 'Live in the Triangle'],
    ['Formulate', 'https://formulatesurveys.com', 'Live'],
    ['Recruit', 'https://recruit.metric-house.com', 'Piloting'],
  ])('renders %s with its link and stage', (name, href, stage) => {
    render(<Products />);
    expect(screen.getByRole('heading', { level: 3, name })).toBeInTheDocument();
    const host = href.replace('https://', '');
    const link = screen.getByRole('link', { name: new RegExp(host.replace(/\./g, '\\.')) });
    expect(link).toHaveAttribute('href', href);
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    expect(screen.getByText(stage)).toBeInTheDocument();
  });

  it('has no screenshots or old product copy', () => {
    const { container } = render(<Products />);
    expect(container.querySelector('img')).toBeNull();
    expect(container.textContent).not.toMatch(/AI-powered|PhD-level|three things/i);
  });
});
