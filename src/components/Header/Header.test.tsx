import { render, screen, fireEvent } from '@testing-library/react'
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
  useLocale: () => 'en',
}))

// Mock navigation from @/navigation
jest.mock('@/navigation', () => ({
  Link: ({ children, href, ...props }: any) => <a href={href} {...props}>{children}</a>,
  usePathname: () => '/',
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
    render(<Header icon="/assets/mnopi.png" info={mockInfo} />)
    
    // Should have navigation items
    expect(screen.getByText('About')).toBeInTheDocument()
    expect(screen.getByText('Companies')).toBeInTheDocument()
    expect(screen.getByText('Contact')).toBeInTheDocument()
  })

  it('displays correct locale switcher for English', () => {
    render(<Header icon="/assets/mnopi.png" info={mockInfo} />)
    
    // Should show Spanish option when on English
    expect(screen.getByText('Español')).toBeInTheDocument()
  })

  it('opens contact form modal when Contact button clicked', () => {
    render(<Header icon="/assets/mnopi.png" info={mockInfo} />)

    const contactButton = screen.getByText('Contact')
    expect(contactButton.tagName).toBe('BUTTON')

    fireEvent.click(contactButton)
    expect(screen.getByText('title')).toBeInTheDocument()
  })
})
