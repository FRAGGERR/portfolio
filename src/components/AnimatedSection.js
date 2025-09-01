import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import PropTypes from 'prop-types';
import { navDelay } from '@utils';
import { usePrefersReducedMotion } from '@hooks';

const AnimatedSection = ({ children, delay = 0 }) => {
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const timeout = setTimeout(() => setIsMounted(true), navDelay + delay);
    return () => clearTimeout(timeout);
  }, [delay, prefersReducedMotion]);

  if (prefersReducedMotion) {
    return <>{children}</>;
  }

  return (
    <TransitionGroup component={null}>
      {isMounted && (
        <CSSTransition classNames="fadeup" timeout={1000}>
          <div>{children}</div>
        </CSSTransition>
      )}
    </TransitionGroup>
  );
};

AnimatedSection.propTypes = {
  children: PropTypes.node.isRequired,
  delay: PropTypes.number,
};

export default AnimatedSection;
