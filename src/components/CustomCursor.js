import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const CursorDot = styled.div`
  position: fixed;
  width: 20px;
  height: 20px;
  background: var(--green);
  border-radius: 50%;
  pointer-events: none;
  z-index: 10000;
  transition: transform 0.1s ease;
  transform: translate(-50%, -50%);
`;

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let mouseX = 0;
    let mouseY = 0;
    let dotX = 0;
    let dotY = 0;
    let animationFrame;

    const hideCursor = () => {
      try {
        document.body.style.cursor = 'none';
        document.documentElement.style.cursor = 'none';

        const elements = document.querySelectorAll('*');
        elements.forEach(el => {
          if (el.style) {
            el.style.cursor = 'none';
          }
        });

        document.body.style.setProperty('cursor', 'none', 'important');
        document.documentElement.style.setProperty('cursor', 'none', 'important');
      } catch {
        // Silent error handling
      }
    };

    const updatePosition = e => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setIsVisible(true);
    };

    const handleEnter = () => {
      setIsVisible(true);
      hideCursor();
    };

    const handleLeave = () => {
      setIsVisible(false);
    };

    const handleVisibility = () => {
      if (document.hidden) {
        setIsVisible(false);
      } else {
        setTimeout(hideCursor, 100);
      }
    };

    const handleFocus = () => {
      setTimeout(hideCursor, 100);
    };

    const handleBlur = () => {
      setIsVisible(false);
    };

    const checkCursor = () => {
      if (!document.hidden && document.hasFocus()) {
        hideCursor();
      }
    };

    const animate = () => {
      dotX += (mouseX - dotX) * 0.15;
      dotY += (mouseY - dotY) * 0.15;

      setMousePosition({
        x: dotX,
        y: dotY,
      });

      animationFrame = requestAnimationFrame(animate);
    };

    const handleMouseMove = e => {
      updatePosition(e);
      setTimeout(hideCursor, 5);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleEnter);
    document.addEventListener('mouseleave', handleLeave);
    document.addEventListener('visibilitychange', handleVisibility);
    window.addEventListener('focus', handleFocus);
    window.addEventListener('blur', handleBlur);

    hideCursor();
    animate();

    const cursorInterval = setInterval(hideCursor, 200);
    const visibilityInterval = setInterval(checkCursor, 200);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleEnter);
      document.removeEventListener('mouseleave', handleLeave);
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('blur', handleBlur);

      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }

      clearInterval(cursorInterval);
      clearInterval(visibilityInterval);
    };
  }, []);

  if (!isVisible) {return null;}

  return (
    <CursorDot
      style={{
        left: mousePosition.x,
        top: mousePosition.y,
      }}
    />
  );
};

export default CustomCursor;
