import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ContactForm } from './ContactForm';

global.fetch = jest.fn();

describe('ContactForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('does not render when isOpen is false', () => {
    const { container } = render(<ContactForm isOpen={false} onCloseAction={jest.fn()} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders form when isOpen is true', () => {
    render(<ContactForm isOpen={true} onCloseAction={jest.fn()} />);
    const form = screen.getByRole('button', { name: /send/i });
    expect(form).toBeInTheDocument();
  });

  it('renders all form fields', () => {
    render(<ContactForm isOpen={true} onCloseAction={jest.fn()} />);
    const inputs = screen.getAllByRole('textbox');
    expect(inputs.length).toBeGreaterThanOrEqual(3);
  });

  it('updates form data when inputs change', () => {
    render(<ContactForm isOpen={true} onCloseAction={jest.fn()} />);
    const inputs = screen.getAllByRole('textbox');
    const nameInput = inputs[0] as HTMLInputElement;
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    expect(nameInput.value).toBe('John Doe');
  });

  it('renders submit and cancel buttons', () => {
    render(<ContactForm isOpen={true} onCloseAction={jest.fn()} />);
    expect(screen.getByRole('button', { name: /send/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
  });

  it('calls onCloseAction when cancel button is clicked', () => {
    const onCloseAction = jest.fn();
    render(<ContactForm isOpen={true} onCloseAction={onCloseAction} />);
    const buttons = screen.getAllByRole('button');
    const cancelButton = buttons.find(b => b.textContent?.toLowerCase().includes('cancel'));
    if (cancelButton) fireEvent.click(cancelButton);
    expect(onCloseAction).toHaveBeenCalled();
  });

  it('submits form with correct data', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({ ok: true });
    render(<ContactForm isOpen={true} onCloseAction={jest.fn()} />);

    const inputs = screen.getAllByRole('textbox');
    fireEvent.change(inputs[0], { target: { value: 'John' } });
    fireEvent.change(inputs[1], { target: { value: 'john@example.com' } });
    fireEvent.change(inputs[2], { target: { value: 'Hello' } });

    const submitButton = screen.getByRole('button', { name: /send/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/contact', expect.any(Object));
    });
  });

  it('disables submit button while loading', async () => {
    (global.fetch as jest.Mock).mockImplementation(
      () => new Promise((resolve) => setTimeout(() => resolve({ ok: true }), 1000))
    );
    render(<ContactForm isOpen={true} onCloseAction={jest.fn()} />);

    const inputs = screen.getAllByRole('textbox');
    fireEvent.change(inputs[0], { target: { value: 'John' } });
    fireEvent.change(inputs[1], { target: { value: 'john@example.com' } });
    fireEvent.change(inputs[2], { target: { value: 'Hello' } });

    const submitButton = screen.getByRole('button', { name: /send/i }) as HTMLButtonElement;
    fireEvent.click(submitButton);

    expect(submitButton.disabled).toBe(true);
  });
});
