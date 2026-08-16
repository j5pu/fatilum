import { render, screen, fireEvent } from '@testing-library/react';
import { LanguageSelector } from './LanguageSelector';

describe('LanguageSelector', () => {
  it('renders language selector button with globe icon', () => {
    render(<LanguageSelector />);
    const button = screen.getByRole('button', { name: /select language/i });
    expect(button).toBeInTheDocument();
  });

  it('opens dropdown when button is clicked', () => {
    render(<LanguageSelector />);
    const button = screen.getByRole('button', { name: /select language/i });
    fireEvent.click(button);
    expect(screen.getByText('EN - English')).toBeInTheDocument();
    expect(screen.getByText('ES - Español')).toBeInTheDocument();
  });

  it('closes dropdown when button is clicked again', () => {
    render(<LanguageSelector />);
    const button = screen.getByRole('button', { name: /select language/i });
    fireEvent.click(button);
    expect(screen.getByText('EN - English')).toBeInTheDocument();
    fireEvent.click(button);
    expect(screen.queryByText('EN - English')).not.toBeInTheDocument();
  });

  it('renders both language options in dropdown', () => {
    render(<LanguageSelector />);
    const button = screen.getByRole('button', { name: /select language/i });
    fireEvent.click(button);
    expect(screen.getByText('EN - English')).toBeInTheDocument();
    expect(screen.getByText('ES - Español')).toBeInTheDocument();
  });

  it('passes correct locale to language links', () => {
    render(<LanguageSelector />);
    const button = screen.getByRole('button', { name: /select language/i });
    fireEvent.click(button);
    const enLink = screen.getByText('EN - English').closest('a');
    const esLink = screen.getByText('ES - Español').closest('a');
    expect(enLink).toHaveAttribute('data-locale', 'en');
    expect(esLink).toHaveAttribute('data-locale', 'es');
  });
});
