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

// Mock react-icons for testing
jest.mock('react-icons/ri', () => ({
  RiMenu3Line: ({ ...props }: any) => <div data-testid="menu-icon" {...props} />,
  RiGlobalLine: ({ ...props }: any) => <div data-testid="globe-icon" {...props} />,
}))

// Mock next/image with better prop handling
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
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

  it('navigation links point to correct anchors', () => {
    render(<Header icon="/assets/mnopi.png" info={mockInfo} />)
    
    const aboutLink = screen.getByText('About').closest('a')
    const companiesLink = screen.getByText('Companies').closest('a')
    
    // Verify links use hardcoded English IDs (work in all languages)
    expect(aboutLink).toHaveAttribute('href', '#about')
    expect(companiesLink).toHaveAttribute('href', '#companies')
  })

  it('opens contact form modal when Contact button clicked', () => {
    render(<Header icon="/assets/mnopi.png" info={mockInfo} />)

    const contactButton = screen.getByText('Contact')
    expect(contactButton.tagName).toBe('BUTTON')

    fireEvent.click(contactButton)
    expect(screen.getByText('title')).toBeInTheDocument()
  })
})
