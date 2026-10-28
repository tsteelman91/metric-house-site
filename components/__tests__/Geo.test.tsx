import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Geo } from '../Geo';

function fillForm({ email = 'owner@example.com' } = {}) {
  fireEvent.input(screen.getByPlaceholderText('First and last'), { target: { value: 'Pat Owner' } });
  fireEvent.input(screen.getByPlaceholderText('Your business'), { target: { value: 'Corner Cafe' } });
  fireEvent.input(screen.getByPlaceholderText('e.g. Carrboro'), { target: { value: 'Carrboro' } });
  fireEvent.input(screen.getByPlaceholderText('you@yourbusiness.com'), { target: { value: email } });
}

function submit() {
  fireEvent.click(screen.getByRole('button', { name: /set up a call/i }));
}

describe('Geo', () => {
  const originalFetch = global.fetch;

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it('renders the section heading and number', () => {
    render(<Geo />);
    expect(screen.getByRole('heading', { level: 2, name: /does it name you/i })).toBeInTheDocument();
    expect(screen.getByText(/§03 · GEO · AI search/)).toBeInTheDocument();
  });

  it('has the geo anchor id', () => {
    const { container } = render(<Geo />);
    expect(container.querySelector('section#geo')).toBeInTheDocument();
  });

  it('renders the example card as a labelled illustration with all three rows', () => {
    render(<Geo />);
    const card = screen.getByRole('figure');
    expect(card).toHaveAttribute('aria-label', expect.stringMatching(/^Illustration/));
    expect(screen.getByText('named 17 of 20 asks')).toBeInTheDocument();
    expect(screen.getByText('named 11 of 20 asks')).toBeInTheDocument();
    expect(screen.getByText('named 3 of 20 asks')).toBeInTheDocument();
    expect(screen.getByText(/numbers are examples/i)).toBeInTheDocument();
  });

  it('renders the four process steps', () => {
    render(<Geo />);
    for (const name of ['Ask', 'Trace', 'Improve', 'Re-check']) {
      expect(screen.getByRole('heading', { level: 4, name })).toBeInTheDocument();
    }
  });

  it('never mentions price', () => {
    const { container } = render(<Geo />);
    expect(container.textContent).not.toMatch(/price|free|cost|\$\d/i);
  });

  it('has no em dashes', () => {
    const { container } = render(<Geo />);
    expect(container.textContent).not.toContain('—');
  });

  it('shows the headshot and person line', () => {
    render(<Geo />);
    expect(screen.getByAltText('Tyler Steelman')).toHaveAttribute('src', '/tyler-headshot.jpg');
    expect(screen.getByText(/you'll talk with tyler steelman/i)).toBeInTheDocument();
  });

  it('points the form at Formspree and links the fallback email', () => {
    const { container } = render(<Geo />);
    const form = container.querySelector('form');
    expect(form).toHaveAttribute('method', 'post');
    expect(form).toHaveAttribute('action', 'https://formspree.io/f/mkjjbern');
    expect(screen.getByRole('link', { name: 'metrichousellc@gmail.com' })).toHaveAttribute(
      'href',
      'mailto:metrichousellc@gmail.com'
    );
  });

  it('shows an inline error and does not send when email is empty', () => {
    const fetchMock = jest.fn();
    global.fetch = fetchMock;
    render(<Geo />);
    fillForm({ email: '' });
    submit();
    expect(screen.getByText('Please add your email.')).toBeInTheDocument();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('shows the thank-you message only after Formspree accepts', async () => {
    global.fetch = jest.fn().mockResolvedValue({ ok: true });
    render(<Geo />);
    fillForm();
    submit();
    expect(await screen.findByText(/reply within one business day/i)).toBeInTheDocument();
    expect(global.fetch).toHaveBeenCalledWith(
      'https://formspree.io/f/mkjjbern',
      expect.objectContaining({ method: 'POST' })
    );
  });

  it('shows the error message when Formspree rejects', async () => {
    global.fetch = jest.fn().mockResolvedValue({ ok: false });
    render(<Geo />);
    fillForm();
    submit();
    expect(await screen.findByRole('alert')).toHaveTextContent(/didn't go through/i);
    await waitFor(() => expect(screen.queryByText(/reply within one business day/i)).not.toBeInTheDocument());
  });
});
