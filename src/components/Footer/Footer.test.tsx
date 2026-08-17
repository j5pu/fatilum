import { render, screen, fireEvent } from '@testing-library/react'
import { Footer } from '@/components/Footer'

// Mock next-intl
jest.mock('next-intl', () => ({
  useTranslations: () => {
    const t = (key: string) => key
    t.raw = (key: string) => key
    return t
  },
  useLocale: () => 'en',
}))

// Mock next/image with proper prop handling
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    const { src, alt, fetchPriority, ...rest } = props
    return <img src={src} alt={alt} {...rest} />
  },
}))

// Mock next/link
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href, ...props }: any) => <a href={href} {...props}>{children}</a>,
}))

// Mock child components
jest.mock('@/components/Reveal', () => ({
  Reveal: ({ children }: any) => <>{children}</>,
}))

describe('Footer Component', () => {
  const mockInfo = {
    domain: 'mnopi.com',
    headers: new Map([['host', 'localhost:3000']]) as any,
    host: 'localhost:3000',
    name: 'mnopi',
    url: 'https://localhost:3000',
  }

  it('renders footer container', () => {
    render(<Footer icon="/assets/mnopi.png" info={mockInfo} />)
    const footer = document.querySelector('div[class*="mx-auto"]')
    expect(footer).toBeInTheDocument()
  })

  it('includes company name in copyright', () => {
    const { container } = render(<Footer icon="/assets/mnopi.png" info={mockInfo} />)
    const text = container.textContent
    expect(text).toContain('fatilum OÜ')
  })

  it('includes current year in copyright', () => {
    const currentYear = new Date().getFullYear().toString()
    const { container } = render(<Footer icon="/assets/mnopi.png" info={mockInfo} />)
    const text = container.textContent
    expect(text).toContain(currentYear)
  })

  it('opens contact form modal when email icon clicked', () => {
    render(<Footer icon="/assets/mnopi.png" info={mockInfo} />)
    const emailButton = screen.getAllByRole('button')[0]
    fireEvent.click(emailButton)
    expect(screen.getByText('title')).toBeInTheDocument()
  })

  it('links to LinkedIn company page', () => {
    const { container } = render(<Footer icon="/assets/mnopi.png" info={mockInfo} />)
    const linkedInLink = container.querySelector('a[href="https://linkedin.com/company/fatilum"]')
    expect(linkedInLink).toBeInTheDocument()
  })
})
