import { render, screen } from '@testing-library/react';
import { About } from './About';

jest.mock('../BackgroundRadialRight', () => ({
  BackgroundRadialRight: () => <div data-testid="background-radial-right" />,
}));

jest.mock('../MotionTransition', () => ({
  MotionTransition: ({ children }: any) => <div data-testid="motion-transition">{children}</div>,
}));

jest.mock('../Reveal', () => ({
  Reveal: ({ children }: any) => <div data-testid="reveal">{children}</div>,
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

describe('About', () => {
  it('renders About section with correct id', () => {
    render(<About />);
    const section = document.querySelector('#about');
    expect(section).toBeInTheDocument();
  });

  it('renders h1 heading', () => {
    render(<About />);
    const headings = screen.getAllByRole('heading', { level: 1 });
    expect(headings.length).toBeGreaterThan(0);
  });

  it('renders button for navigation', () => {
    render(<About />);
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);
  });

  it('renders handshake image', () => {
    render(<About />);
    const image = screen.getByAltText('Card');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/assets/Handshake.svg');
  });

  it('applies correct CSS classes to handshake image', () => {
    render(<About />);
    const image = screen.getByAltText('Card');
    expect(image).toHaveClass('w-64', 'md:w-80', 'h-auto');
  });

  it('renders motion transition component', () => {
    render(<About />);
    expect(screen.getByTestId('motion-transition')).toBeInTheDocument();
  });

  it('renders background radial right component', () => {
    render(<About />);
    expect(screen.getByTestId('background-radial-right')).toBeInTheDocument();
  });

  it('renders content inside reveal components', () => {
    render(<About />);
    const reveals = screen.getAllByTestId('reveal');
    expect(reveals.length).toBeGreaterThan(0);
  });
});
