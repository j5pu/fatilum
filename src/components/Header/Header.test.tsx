import { render, screen } from '@testing-library/react'
import { Header } from '@/components/Header'

// Mock next-intl
jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      'About': 'About',
      'Companies': 'Companies',
      'Contact': 'Contact',
    }
    return translations[key] || key
  },
}))

// Mock MotionTransition to avoid framer-motion complexity
jest.mock('@/components/MotionTransition', () => ({
  MotionTransition: ({ children }: any) => <>{children}</>,
}))

// Mock next/image with better prop handling
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    const { src, alt, fetchPriority, ...rest } = props
    return <img src={src} alt={alt} {...rest} />
  },
}))

describe('Header Component', () => {
  const mockInfo = {
    domain: 'mnopi.com',
    headers: new Map([['host', 'localhost:3000']]) as any,
    host: 'localhost:3000',
    name: 'mnopi',
    url: 'https://localhost:3000',
  }

  it('renders navigation links', () => {
    render(<Header icon="/assets/mnopi.png" info={mockInfo} locale="en" />)
    
    // Should have navigation items
    expect(screen.getByText('About')).toBeInTheDocument()
    expect(screen.getByText('Companies')).toBeInTheDocument()
    expect(screen.getByText('Contact')).toBeInTheDocument()
  })

  it('displays correct locale switcher for English', () => {
    render(<Header icon="/assets/mnopi.png" info={mockInfo} locale="en" />)
    
    // Should show Spanish option when on English
    expect(screen.getByText('Español')).toBeInTheDocument()
  })

  it('displays correct locale switcher for Spanish', () => {
    render(<Header icon="/assets/mnopi.png" info={mockInfo} locale="es" />)
    
    // Should show English option when on Spanish
    expect(screen.getByText('English')).toBeInTheDocument()
  })

  it('has email link for contact', () => {
    render(<Header icon="/assets/mnopi.png" info={mockInfo} locale="en" />)
    
    const contactLink = screen.getByText('Contact')
    expect(contactLink.closest('a')).toHaveAttribute('href', 'mailto:jose@mnopi.com')
  })
})
