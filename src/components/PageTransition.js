import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import PropTypes from 'prop-types';

const PageTransition = ({ children, location }) => (
  <TransitionGroup component={null}>
    <CSSTransition key={location.pathname} classNames="page" timeout={400} unmountOnExit>
      <div style={{ width: '100%', minHeight: '100vh' }}>{children}</div>
    </CSSTransition>
  </TransitionGroup>
);

PageTransition.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.object.isRequired,
};

export default PageTransition;
