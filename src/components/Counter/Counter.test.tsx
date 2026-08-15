import { render } from '@testing-library/react'
import { Counter } from '@/components/Counter'

// Mock next-intl
jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      '1': 'Years Experience',
      '2': 'Projects',
      '3': 'Clients',
    }
    return translations[key] || key
  },
}))

// Mock react-countup
jest.mock('react-countup', () => ({
  __esModule: true,
  default: ({ start, end }: any) => <span>{end}</span>,
}))

// Mock MotionTransition
jest.mock('@/components/MotionTransition', () => ({
  MotionTransition: ({ children }: any) => <>{children}</>,
}))

describe('Counter Component', () => {
  it('renders without crashing', () => {
    render(<Counter />)
    expect(document.body).toBeInTheDocument()
  })

  it('renders counter content', () => {
    const { container } = render(<Counter />)
    const text = container.textContent
    expect(text).toBeTruthy()
  })

  it('renders counter numbers', () => {
    const { container } = render(<Counter />)
    const text = container.textContent
    expect(text).toContain('6')
    expect(text).toContain('30')
    expect(text).toContain('64')
  })

  it('renders counter labels', () => {
    const { container } = render(<Counter />)
    const text = container.textContent
    expect(text).toContain('Experience')
    expect(text).toContain('Projects')
    expect(text).toContain('Clients')
  })
})
