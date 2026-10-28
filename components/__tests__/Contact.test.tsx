import { fireEvent, render, screen } from '@testing-library/react';
import { Contact } from '../Contact';

const type = (placeholder: string, value: string) =>
  fireEvent.input(screen.getByPlaceholderText(placeholder), { target: { value } });

const pickTopic = (label: RegExp) => fireEvent.click(screen.getByRole('radio', { name: label }));

function sentBody(fetchMock: jest.Mock) {
  const body = fetchMock.mock.calls[0][1].body as FormData;
  return Object.fromEntries(body.entries());
}

describe('Contact', () => {
  const originalFetch = global.fetch;
  afterEach(() => {
    global.fetch = originalFetch;
  });

  it('renders the label, headline and intro', () => {
    render(<Contact />);
    expect(screen.getByText('§04 · Contact')).toBeInTheDocument();
    const h2 = screen.getByRole('heading', { level: 2, name: /start with a conversation/i });
    expect(h2.querySelector('em')).toHaveTextContent('a conversation');
    expect(screen.getByText(/we read everything and reply ourselves/i)).toBeInTheDocument();
  });

  it('posts to the existing Formspree form without JS', () => {
    const { container } = render(<Contact />);
    const form = container.querySelector('form');
    expect(form).toHaveAttribute('method', 'post');
    expect(form).toHaveAttribute('action', 'https://formspree.io/f/mkjjbern');
  });

  it('uses the gmail contact address and never geo@ or info@', () => {
    const { container } = render(<Contact />);
    expect(screen.getByRole('link', { name: 'metrichousellc@gmail.com' })).toHaveAttribute(
      'href',
      'mailto:metrichousellc@gmail.com'
    );
    expect(container.innerHTML).not.toMatch(/geo@|info@/);
  });

  it('defaults to the GEO topic with business and town shown', () => {
    render(<Contact />);
    expect(screen.getByRole('radio', { name: /my business and ai search/i })).toBeChecked();
    expect(screen.getByPlaceholderText('Your business')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('e.g. Carrboro')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /set up a call/i })).toBeInTheDocument();
  });

  it('hides business and town for the other topics and relabels the button', () => {
    render(<Contact />);
    pickTopic(/one of the products/i);
    expect(screen.queryByPlaceholderText('Your business')).toBeNull();
    expect(screen.queryByPlaceholderText('e.g. Carrboro')).toBeNull();
    expect(screen.getByRole('button', { name: /^send/i })).toBeInTheDocument();
    pickTopic(/something else/i);
    expect(screen.queryByPlaceholderText('Your business')).toBeNull();
  });

  it('requires business and town on the GEO topic', () => {
    global.fetch = jest.fn();
    render(<Contact />);
    type('First and last', 'Pat');
    type('you@example.com', 'pat@example.com');
    fireEvent.click(screen.getByRole('button', { name: /set up a call/i }));
    expect(screen.getByText('Please add your business name.')).toBeInTheDocument();
    expect(screen.getByText('Please add your town.')).toBeInTheDocument();
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('requires a message on Something else', () => {
    global.fetch = jest.fn();
    render(<Contact />);
    pickTopic(/something else/i);
    type('First and last', 'Pat');
    type('you@example.com', 'pat@example.com');
    fireEvent.click(screen.getByRole('button', { name: /send/i }));
    expect(screen.getByText('Please add a short message.')).toBeInTheDocument();
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('sends the GEO subject and topic, and thanks on 2xx', async () => {
    const fetchMock = jest.fn().mockResolvedValue({ ok: true });
    global.fetch = fetchMock;
    render(<Contact />);
    type('First and last', 'Pat');
    type('you@example.com', 'pat@example.com');
    type('Your business', 'Corner Cafe');
    type('e.g. Carrboro', 'Carrboro');
    fireEvent.click(screen.getByRole('button', { name: /set up a call/i }));
    expect(await screen.findByText(/reply within one business day/i)).toBeInTheDocument();
    expect(fetchMock.mock.calls[0][0]).toBe('https://formspree.io/f/mkjjbern');
    expect(sentBody(fetchMock)).toMatchObject({
      topic: 'My business and AI search',
      _subject: 'GEO call: Corner Cafe (Carrboro)',
    });
  });

  it('sends the product subject without business fields', async () => {
    const fetchMock = jest.fn().mockResolvedValue({ ok: true });
    global.fetch = fetchMock;
    render(<Contact />);
    pickTopic(/one of the products/i);
    type('First and last', 'Pat');
    type('you@example.com', 'pat@example.com');
    fireEvent.click(screen.getByRole('button', { name: /send/i }));
    await screen.findByText(/reply within one business day/i);
    const body = sentBody(fetchMock);
    expect(body).toMatchObject({ topic: 'One of the products', _subject: 'Product question from Pat' });
    expect(body).not.toHaveProperty('biz');
  });

  it('sends the something-else subject', async () => {
    const fetchMock = jest.fn().mockResolvedValue({ ok: true });
    global.fetch = fetchMock;
    render(<Contact />);
    pickTopic(/something else/i);
    type('First and last', 'Pat');
    type('you@example.com', 'pat@example.com');
    type("Anything you'd like us to know.", 'Hello');
    fireEvent.click(screen.getByRole('button', { name: /send/i }));
    await screen.findByText(/reply within one business day/i);
    expect(sentBody(fetchMock)).toMatchObject({ topic: 'Something else', _subject: 'Message from Pat' });
  });

  it('shows the error with the email link when Formspree rejects', async () => {
    global.fetch = jest.fn().mockResolvedValue({ ok: false });
    render(<Contact />);
    pickTopic(/one of the products/i);
    type('First and last', 'Pat');
    type('you@example.com', 'pat@example.com');
    fireEvent.click(screen.getByRole('button', { name: /send/i }));
    const alert = await screen.findByRole('alert');
    expect(alert).toHaveTextContent("That didn't go through. You can write metrichousellc@gmail.com directly.");
    expect(screen.queryByText(/reply within one business day/i)).toBeNull();
  });
});
