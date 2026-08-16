import '@testing-library/jest-dom'

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: function MockDiv(props) {
      const React = require('react')
      return React.createElement('div', props, props.children)
    },
    span: function MockSpan(props) {
      const React = require('react')
      return React.createElement('span', props, props.children)
    },
  },
  AnimatePresence: function MockAnimatePresence(props) {
    return props.children
  },
  useInView: function MockUseInView() {
    return true
  },
  useAnimation: function MockUseAnimation() {
    return {
      start: jest.fn().mockResolvedValue(undefined),
      set: jest.fn(),
    }
  },
  useViewportScroll: function MockUseViewportScroll() {
    return {
      scrollY: { current: 0 },
    }
  },
}))

// Mock next-intl
jest.mock('next-intl', () => ({
  useTranslations: function useTranslations() {
    return function t(key) {
      return key
    }
  },
  useLocale: function useLocale() {
    return 'en'
  },
}))

// Mock @navigation
jest.mock('@/navigation', () => ({
  Link: function MockLink(props) {
    const React = require('react')
    return React.createElement(
      'a',
      { href: props.href, 'data-locale': props.locale, className: props.className },
      props.children
    )
  },
  usePathname: function usePathname() {
    return '/'
  },
  useLocale: function useLocale() {
    return 'en'
  },
  useRouter: function useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
    }
  },
}))
