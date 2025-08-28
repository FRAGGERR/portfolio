import React, { useState, useEffect } from 'react';

import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { navDelay, loaderDelay } from '@utils';
import { usePrefersReducedMotion } from '@hooks';

const StyledHeroSection = styled.section`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
  min-height: 100vh;
  height: 100vh;
  padding: 0;

  @media (max-height: 700px) and (min-width: 700px), (max-width: 360px) {
    height: auto;
    padding-top: var(--nav-height);
  }

  h1 {
    margin: 0 0 30px 4px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-sm), 5vw, var(--fz-md));
    font-weight: 400;

    @media (max-width: 480px) {
      margin: 0 0 20px 2px;
    }
  }

  h3 {
    margin-top: 5px;
    color: var(--slate);
    line-height: 0.9;
  }

  p {
    margin: 20px 0 0;
    max-width: 540px;
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 50px;
  }
`;

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);

  // Inject Cal.com element-click embed once for "Get In Touch"
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    if (window.__calElementClickInjected) {
      return;
    }
    window.__calElementClickInjected = true;

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.innerHTML = `
      (function (C, A, L) { let p = function (a, ar) { a.q.push(ar); }; let d = C.document; C.Cal = C.Cal || function () { let cal = C.Cal; let ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; } if (ar[0] === L) { const api = function () { p(api, arguments); }; const namespace = ar[1]; api.q = api.q || []; if(typeof namespace === "string"){cal.ns[namespace] = cal.ns[namespace] || api;p(cal.ns[namespace], ar);p(cal, ["initNamespace", namespace]);} else p(cal, ar); return;} p(cal, ar); }; })(window, "https://app.cal.com/embed/embed.js", "init");
      Cal("init", "30min", {origin:"https://app.cal.com"});
      Cal.ns["30min"]("ui", {"theme":"dark","cssVarsPerTheme":{"dark":{"cal-brand":"#0a192e","cal-brand-primary":"#0a192e","cal-brand-accent":"#64ffda","cal-brand-em":"#64ffda","cal-brand-text":"#ffffff","cal-brand-subtle":"#8892b0"},"light":{"cal-brand":"#cbd5f5","cal-brand-primary":"#cbd5f5","cal-brand-accent":"#0a192e","cal-brand-em":"#0a192e","cal-brand-text":"#0a192e","cal-brand-subtle":"#0a192e"}},"hideEventTypeDetails":false,"layout":"month_view"});
    `;
    document.head.appendChild(script);
  }, []);

  const one = <h1>Hi, my name is</h1>;
  const two = <h2 className="big-heading">Hardik.</h2>;
  const three = <h3 className="big-heading">I build intelligent systems from raw data.</h3>;
  const four = (
    <>
      <p>
        I design AI systems that are light on resources, fluent across languages, and focused on
        widening access to technology in healthcare and beyond at{' '}
        <a href="https://www.naventra.in/" target="_blank" rel="noopener noreferrer">
          Naventra
        </a>
        .
      </p>
    </>
  );
  const five = (
    <button
      className="email-link"
      type="button"
      data-cal-link="hardikchhipa/30min"
      data-cal-namespace="30min"
      data-cal-config='{"layout":"month_view","theme":"dark"}'>
      Book a Call
    </button>
  );

  const items = [one, two, three, four, five];

  return (
    <StyledHeroSection>
      {prefersReducedMotion ? (
        <>
          {items.map((item, i) => (
            <div key={i}>{item}</div>
          ))}
        </>
      ) : (
        <TransitionGroup component={null}>
          {isMounted &&
            items.map((item, i) => (
              <CSSTransition key={i} classNames="fadeup" timeout={loaderDelay}>
                <div style={{ transitionDelay: `${i + 1}00ms` }}>{item}</div>
              </CSSTransition>
            ))}
        </TransitionGroup>
      )}
    </StyledHeroSection>
  );
};

export default Hero;
