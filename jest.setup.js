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
