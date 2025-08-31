import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledUtterances = styled.div`
  margin-top: 60px;
  padding-top: 40px;
  border-top: 1px solid var(--lightest-navy);

  h3 {
    color: var(--lightest-slate);
    font-size: var(--fz-lg);
    font-weight: 600;
    margin: 0 0 30px 0;
  }

  .utterances-container {
    position: relative;
    min-height: 200px;

    /* Loading state */
    &::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 40px;
      height: 40px;
      border: 3px solid var(--lightest-navy);
      border-top: 3px solid var(--green);
      border-radius: 50%;
      animation: spin 1s linear infinite;
      opacity: 0.7;
    }

    /* Hide loading spinner when utterances loads */
    &.loaded::before {
      display: none;
    }
  }

  @keyframes spin {
    0% {
      transform: translate(-50%, -50%) rotate(0deg);
    }
    100% {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }

  /* Custom styling for Utterances to match your theme */
  .utterances {
    background: transparent !important;
    border: none !important;
    font-family: var(--font-sans) !important;

    /* Override default colors to match your theme */
    --color-canvas-default: transparent !important;
    --color-canvas-subtle: transparent !important;
    --color-border-default: var(--lightest-navy) !important;
    --color-border-muted: var(--lightest-navy) !important;
    --color-neutral-muted: var(--lightest-navy) !important;
    --color-accent-fg: var(--green) !important;
    --color-accent-emphasis: var(--green) !important;
    --color-success-fg: var(--green) !important;
    --color-attention-fg: var(--pink) !important;
    --color-danger-fg: var(--pink) !important;

    /* Text colors */
    --color-fg-default: var(--lightest-slate) !important;
    --color-fg-muted: var(--light-slate) !important;
    --color-fg-subtle: var(--slate) !important;

    /* Button colors */
    --color-btn-bg: var(--light-navy) !important;
    --color-btn-hover-bg: var(--lightest-navy) !important;
    --color-btn-border: var(--lightest-navy) !important;
    --color-btn-hover-border: var(--green) !important;
    --color-btn-text: var(--lightest-slate) !important;
    --color-btn-hover-text: var(--green) !important;

    /* Input colors */
    --color-input-bg: var(--light-navy) !important;
    --color-input-border: var(--lightest-navy) !important;
    --color-input-focus-border: var(--green) !important;
    --color-input-text: var(--lightest-slate) !important;

    /* Link colors */
    --color-link: var(--green) !important;
    --color-link-hover: var(--lightest-slate) !important;

    /* Avatar and badge colors */
    --color-avatar-bg: var(--light-navy) !important;
    --color-avatar-border: var(--lightest-navy) !important;
    --color-badge-bg: var(--lightest-navy) !important;
    --color-badge-text: var(--light-slate) !important;
  }

  /* Responsive adjustments */
  @media (max-width: 768px) {
    margin-top: 40px;
    padding-top: 30px;

    h3 {
      font-size: var(--fz-md);
      margin-bottom: 20px;
    }
  }

  @media (max-width: 480px) {
    margin-top: 30px;
    padding-top: 20px;

    h3 {
      font-size: var(--fz-sm);
      margin-bottom: 15px;
    }
  }
`;

const Utterances = ({ repo, issueTerm = 'pathname', label, theme = 'preferred-color-scheme' }) => {
  const utterancesRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    // Check if we're in browser environment
    if (typeof window === 'undefined') {
      return;
    }

    // Remove any existing utterances script
    const existingScript = document.querySelector('script[src*="utteranc.es"]');
    if (existingScript) {
      existingScript.remove();
    }

    // Create script element for Utterances
    const script = document.createElement('script');
    script.src = 'https://utteranc.es/client.js';
    script.setAttribute('repo', repo);
    script.setAttribute('issue-term', issueTerm);
    script.setAttribute('label', label);
    script.setAttribute('theme', theme);
    script.crossOrigin = 'anonymous';
    script.async = true;

    // Set a timeout to detect if utterances fails to load
    const timeoutId = setTimeout(() => {
      if (containerRef.current && !containerRef.current.classList.contains('loaded')) {
        containerRef.current.innerHTML = `
          <div style="text-align: center; color: var(--light-slate); padding: 40px 20px;">
            <p>Comments are taking too long to load. This usually means the Utterances app hasn't been installed on the repository.</p>
            <p style="margin-top: 15px;">
              <strong>To fix this:</strong><br/>
              1. Go to <a href="https://github.com/apps/utterances" target="_blank" rel="noopener noreferrer" style="color: var(--green);">https://github.com/apps/utterances</a><br/>
              2. Click "Install" and select the <strong>${repo}</strong> repository<br/>
              3. Refresh this page
            </p>
            <p style="font-size: 12px; margin-top: 20px; opacity: 0.7;">
              Repository: ${repo}<br/>
              Issue Term: ${issueTerm}<br/>
              Label: ${label}
            </p>
          </div>
        `;
      }
    }, 10000); // 10 second timeout

    // Handle script load
    script.onload = () => {
      clearTimeout(timeoutId);
      if (containerRef.current) {
        containerRef.current.classList.add('loaded');
      }
    };

    // Handle script error
    script.onerror = () => {
      clearTimeout(timeoutId);
      console.error('Failed to load Utterances');
      if (containerRef.current) {
        containerRef.current.innerHTML = `
          <div style="text-align: center; color: var(--light-slate); padding: 40px 20px;">
            <p>Failed to load comments. This usually means the Utterances app hasn't been installed on the repository.</p>
            <p style="margin-top: 15px;">
              <strong>To fix this:</strong><br/>
              1. Go to <a href="https://github.com/apps/utterances" target="_blank" rel="noopener noreferrer" style="color: var(--green);">https://github.com/apps/utterances</a><br/>
              2. Click "Install" and select the <strong>${repo}</strong> repository<br/>
              3. Refresh this page
            </p>
            <p style="font-size: 12px; margin-top: 20px; opacity: 0.7;">
              Repository: ${repo}<br/>
              Issue Term: ${issueTerm}<br/>
              Label: ${label}
            </p>
          </div>
        `;
      }
    };

    // Append script to utterances container
    if (utterancesRef.current) {
      utterancesRef.current.appendChild(script);
    }

    // Cleanup function
    return () => {
      clearTimeout(timeoutId);
      if (utterancesRef.current && script.parentNode) {
        utterancesRef.current.removeChild(script);
      }
    };
  }, [repo, issueTerm, label, theme]);

  return (
    <StyledUtterances>
      <h3>Comments</h3>
      <div className="utterances-container" ref={containerRef}>
        <div ref={utterancesRef} />
      </div>
    </StyledUtterances>
  );
};

Utterances.propTypes = {
  repo: PropTypes.string.isRequired,
  issueTerm: PropTypes.string,
  label: PropTypes.string,
  theme: PropTypes.string,
};

export default Utterances;
