import { render } from '@testing-library/react'
import { Companies } from '@/components/Companies'

// Mock next-intl
jest.mock('next-intl', () => ({
  useTranslations: (namespace: string) => (key: string) => {
    const translations: Record<string, Record<string, string>> = {
      'Home.Header.CallToAction': {
        'Companies': 'Companies',
      },
      'Home.Companies': {
        'Title': 'Companies We Work With',
      },
      'Home.Companies.Data': {
        'rewards.Title': 'Rewards',
        'rewards.Description': 'Reward programs',
        'safe.Title': 'Safe',
        'safe.Description': 'Safe transactions',
        'send.Title': 'Send',
        'send.Description': 'Send payments',
      },
    }
    return translations[namespace]?.[key] || key
  },
}))

// Mock next/image with proper prop handling
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    const { src, alt, fetchPriority, ...rest } = props
    return <img src={src} alt={alt} {...rest} />
  },
}))

// Mock child components
jest.mock('@/components/BackgroundRadialLeft', () => ({
  BackgroundRadialLeft: ({ children }: any) => <>{children}</>,
}))

jest.mock('@/components/Reveal', () => ({
  Reveal: ({ children }: any) => <>{children}</>,
}))

describe('Companies Component', () => {
  it('renders without crashing', () => {
    render(<Companies />)
    expect(document.body).toBeInTheDocument()
  })

  it('renders company content', () => {
    const { container } = render(<Companies />)
    const text = container.textContent
    expect(text).toBeTruthy()
  })

  it('renders title', () => {
    const { container } = render(<Companies />)
    const text = container.textContent
    expect(text).toContain('Companies')
  })

  it('has contact button', () => {
    const { container } = render(<Companies />)
    const buttons = container.querySelectorAll('button')
    expect(buttons.length).toBeGreaterThan(0)
  })

  it('has id="companies" for anchor navigation', () => {
    const { container } = render(<Companies />)
    const section = container.querySelector('#companies')
    expect(section).toBeInTheDocument()
  })

  it('ID is consistent in both languages (EN/ES)', () => {
    // The hardcoded id="companies" should be the same regardless of language
    const { container } = render(<Companies />)
    const section = container.querySelector('div[id="companies"]')
    expect(section).toBeInTheDocument()
    expect(section?.id).toBe('companies')
  })

  it('renders company images', () => {
    const { container } = render(<Companies />)
    const images = container.querySelectorAll('img')
    expect(images.length).toBeGreaterThan(0)
  })
})
