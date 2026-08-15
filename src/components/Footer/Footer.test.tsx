import { render } from '@testing-library/react'
import { Footer } from '@/components/Footer'

// Mock next-intl
jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      'rights': 'All rights reserved.',
    }
    return translations[key] || key
  },
}))

// Mock next/image with proper prop handling
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
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

  it('displays logo image', () => {
    const { container } = render(<Footer icon="/assets/mnopi.png" info={mockInfo} />)
    const img = container.querySelector('img')
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src', '/assets/mnopi.png')
  })

  it('includes company name in copyright', () => {
    const { container } = render(<Footer icon="/assets/mnopi.png" info={mockInfo} />)
    const text = container.textContent
    expect(text).toContain('mnopi')
  })

  it('includes rights reserved text', () => {
    const { container } = render(<Footer icon="/assets/mnopi.png" info={mockInfo} />)
    const text = container.textContent
    expect(text).toContain('rights reserved')
  })

  it('includes current year in copyright', () => {
    const currentYear = new Date().getFullYear().toString()
    const { container } = render(<Footer icon="/assets/mnopi.png" info={mockInfo} />)
    const text = container.textContent
    expect(text).toContain(currentYear)
  })

  it('shows inc suffix for mnopi', () => {
    const { container } = render(<Footer icon="/assets/mnopi.png" info={mockInfo} />)
    const text = container.textContent
    expect(text).toContain('inc.')
  })

  it('shows SRL suffix for other companies', () => {
    const otherInfo = { ...mockInfo, name: 'other' }
    const { container } = render(<Footer icon="/assets/other.png" info={otherInfo} />)
    const text = container.textContent
    expect(text).toContain('SRL.')
  })
})
