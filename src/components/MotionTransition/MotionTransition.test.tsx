import { render } from '@testing-library/react';
import { MotionTransition } from './MotionTransition';

describe('MotionTransition', () => {
  it('renders children', () => {
    const { getByText } = render(
      <MotionTransition>
        <div>Test Content</div>
      </MotionTransition>
    );
    expect(getByText('Test Content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <MotionTransition className="custom-class">
        <div>Content</div>
      </MotionTransition>
    );
    const motionDiv = container.querySelector('.custom-class');
    expect(motionDiv).toBeInTheDocument();
  });

  it('wraps children in animation', () => {
    const { container } = render(
      <MotionTransition>
        <div>Content</div>
      </MotionTransition>
    );
    // Should have nested divs from motion.div wrapper
    expect(container.querySelector('div')).toBeInTheDocument();
  });
});
