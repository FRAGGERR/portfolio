import React, { useState, useEffect, useLayoutEffect } from 'react';
import { graphql, Link } from 'gatsby';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Layout, Utterances, AnimatedSection } from '@components';
import utterancesConfig from '@config/utterances';

const StyledPostContainer = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  gap: 60px;
  padding: 0 20px;
  margin-top: 100px;

  @media (max-width: 1400px) {
    display: block;
    max-width: 800px;
    gap: 0;
    margin-top: 140px;
  }

  @media (max-width: 768px) {
    padding: 0 15px;
    margin-top: 120px;
  }

  @media (max-width: 480px) {
    padding: 0 18px;
    margin-top: 135px;
  }
`;

const StyledMainContent = styled.div`
  max-width: 800px;
  width: 100%;
  overflow-wrap: break-word;
  word-wrap: break-word;
  hyphens: auto;

  @media (max-width: 1400px) {
    max-width: 100%;
  }
`;

const StyledBreadcrumb = styled.div`
  margin-bottom: 40px;
  margin-top: 0;

  a {
    color: var(--green);
    font-family: var(--font-mono);
    font-size: var(--fz-sm);
    text-decoration: none;
    transition: var(--transition);
    display: flex;
    align-items: center;

    &:hover {
      color: var(--lightest-slate);

      .arrow {
        transform: translateX(-3px);
        color: var(--lightest-slate);
      }
    }
  }

  .arrow {
    color: var(--light-slate);
    margin-right: 10px;
    transition: var(--transition);
    font-size: var(--fz-md);
  }

  @media (max-width: 768px) {
    margin-bottom: 30px;
    margin-top: 0;
  }

  @media (max-width: 480px) {
    margin-bottom: 25px;
    margin-top: 0;
  }
`;

const StyledSidebar = styled.aside`
  position: sticky;
  top: 120px;
  height: fit-content;
  margin-top: 80px;
  width: 300px;
  min-width: 300px;

  @media (max-width: 1400px) {
    display: none;
  }
`;

const StyledSidebarSection = styled.div`
  margin-bottom: 40px;
  padding-bottom: 30px;
  border-bottom: 1px solid var(--lightest-navy);

  &:last-child {
    margin-bottom: 0;
    padding-bottom: 0;
    border-bottom: none;
  }

  h3 {
    color: var(--lightest-slate);
    font-size: var(--fz-sm);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin: 0 0 15px 0;
  }

  @media (max-width: 768px) {
    margin-bottom: 30px;
    padding-bottom: 20px;
    margin-top: 30px;

    h3 {
      font-size: var(--fz-xs);
      margin-bottom: 12px;
    }
  }

  @media (max-width: 480px) {
    margin-bottom: 25px;
    padding-bottom: 15px;

    h3 {
      font-size: var(--fz-xxs);
      margin-bottom: 10px;
    }
  }
`;

const StyledPublishedDate = styled.div`
  color: var(--green);
  font-family: var(--font-mono);
  font-size: var(--fz-sm);
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: var(--fz-xs);
  }

  @media (max-width: 480px) {
    font-size: var(--fz-xxs);
  }
`;

const StyledTopics = styled.div`
  .topic-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;

    .topic-tag-button {
      color: var(--green);
      font-family: var(--font-mono);
      font-size: var(--fz-xs);
      background-color: rgba(100, 255, 138, 0.1);
      padding: 4px 10px;
      border-radius: 12px;
      border: 1px solid rgba(100, 255, 138, 0.2);
      text-decoration: none;
      transition: var(--transition);
      cursor: pointer;
      background: none;

      &:hover {
        background-color: rgba(100, 255, 138, 0.2);
        border-color: var(--green);
      }

      @media (max-width: 768px) {
        font-size: var(--fz-xxs);
        padding: 3px 8px;
        border-radius: 8px;
      }

      @media (max-width: 480px) {
        font-size: var(--fz-xxs);
        padding: 2px 6px;
        border-radius: 6px;
      }
    }
  }
`;

const StyledTableOfContents = styled.div`
  .toc-list {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      margin: 8px 0;

      a {
        color: var(--light-slate);
        text-decoration: none;
        font-size: var(--fz-sm);
        line-height: 1.4;
        transition: var(--transition);
        display: block;
        padding: 4px 0;
        border-radius: 4px;

        &:hover {
          color: var(--lightest-slate);
        }

        &.active {
          color: var(--green);
          background-color: rgba(100, 255, 138, 0.1);
          padding: 4px 8px;
          margin: 0 -8px;
        }
      }

      &.sub-item {
        margin-left: 20px;
        margin-top: 4px;
        margin-bottom: 4px;

        a {
          font-size: var(--fz-xs);
        }
      }
    }
  }

  @media (max-width: 768px) {
    .toc-list li {
      margin: 6px 0;

      a {
        font-size: var(--fz-xs);
      }

      &.sub-item a {
        font-size: var(--fz-xxs);
      }
    }
  }

  @media (max-width: 480px) {
    .toc-list li {
      margin: 4px 0;

      a {
        font-size: var(--fz-xxs);
      }

      &.sub-item a {
        font-size: var(--fz-xxs);
      }
    }
  }
`;

const StyledPostHeader = styled.header`
  margin-top: 40px;
  margin-bottom: 50px;

  @media (max-width: 768px) {
    margin-top: 30px;
    margin-bottom: 40px;
  }

  @media (max-width: 480px) {
    margin-top: 40px;
    margin-bottom: 30px;
  }
`;

const StyledPostContent = styled.div`
  margin-bottom: 60px;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 2em 0 1em;
    color: var(--lightest-slate);
    font-weight: 600;
    line-height: 1.3;
  }

  h1 {
    font-size: var(--fz-xxl);
  }
  h2 {
    font-size: var(--fz-xl);
  }
  h3 {
    font-size: var(--fz-lg);
  }
  h4 {
    font-size: var(--fz-md);
  }
  h5 {
    font-size: var(--fz-sm);
  }
  h6 {
    font-size: var(--fz-xs);
  }

  p {
    margin: 1em 0;
    line-height: 1.6;
    color: var(--light-slate);
  }

  a {
    ${({ theme }) => theme.mixins.inlineLink};
  }

  code {
    background-color: rgba(100, 255, 138, 0.1);
    color: var(--green);
    border-radius: 4px;
    font-size: 0.9em;
    padding: 0.2em 0.4em;
    font-family: var(--font-mono);
    word-break: break-word;
    overflow-wrap: break-word;

    @media (max-width: 480px) {
      font-size: 0.8em;
      padding: 0.15em 0.3em;
    }
  }

  pre {
    background-color: var(--light-navy);
    border-radius: var(--border-radius);
    padding: 20px;
    overflow-x: auto;
    overflow-y: hidden;
    margin: 2em 0;
    max-width: 100%;
    width: 100%;
    box-sizing: border-box;
    position: relative;

    /* Custom scrollbar styling */
    &::-webkit-scrollbar {
      height: 8px;
    }

    &::-webkit-scrollbar-track {
      background: var(--lightest-navy);
      border-radius: 4px;
    }

    &::-webkit-scrollbar-thumb {
      background: var(--green);
      border-radius: 4px;
    }

    &::-webkit-scrollbar-thumb:hover {
      background: var(--lightest-slate);
    }

    @media (max-width: 768px) {
      padding: 15px;
      margin: 1.5em 0;
      font-size: 12px;
      line-height: 1.4;
    }

    @media (max-width: 480px) {
      padding: 12px;
      margin: 1em 0;
      font-size: 11px;
      line-height: 1.3;
    }

    code {
      background-color: transparent;
      color: var(--lightest-slate);
      padding: 0;
      font-size: var(--fz-sm);
      white-space: pre;
      word-wrap: break-word;
      overflow-wrap: break-word;
      max-width: none;
      display: block;
    }
  }

  blockquote {
    border-left: 3px solid var(--green);
    margin: 2em 0;
    padding-left: 20px;
    font-style: italic;
    color: var(--light-slate);

    @media (max-width: 768px) {
      margin: 1.5em 0;
      padding-left: 15px;
      font-size: 14px;
    }

    @media (max-width: 480px) {
      margin: 1em 0;
      padding-left: 10px;
      font-size: 13px;
    }
  }

  ul,
  ol {
    margin: 1.5em 0;
    padding-left: 20px;

    @media (max-width: 768px) {
      margin: 1.2em 0;
      padding-left: 15px;
    }

    @media (max-width: 480px) {
      margin: 1em 0;
      padding-left: 10px;
    }

    li {
      margin: 0.5em 0;
      line-height: 1.6;

      @media (max-width: 480px) {
        margin: 0.4em 0;
        line-height: 1.5;
      }
    }
  }

  img {
    max-width: 100%;
    height: auto;
    border-radius: var(--border-radius);
    margin: 2em 0;
    display: block;

    @media (max-width: 768px) {
      margin: 1.5em 0;
    }

    @media (max-width: 480px) {
      margin: 1em 0;
    }
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin: 2em 0;
    overflow-x: auto;
    display: block;

    @media (max-width: 768px) {
      margin: 1.5em 0;
      font-size: 14px;
    }

    @media (max-width: 480px) {
      margin: 1em 0;
      font-size: 12px;
    }

    th,
    td {
      padding: 12px;
      text-align: left;
      border-bottom: 1px solid var(--lightest-navy);
      white-space: nowrap;

      @media (max-width: 768px) {
        padding: 8px;
      }

      @media (max-width: 480px) {
        padding: 6px;
      }
    }

    th {
      background-color: var(--light-navy);
      color: var(--lightest-slate);
      font-weight: 600;
    }
  }

  @media (max-width: 768px) {
    margin-bottom: 40px;

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      margin: 1.5em 0 0.8em;
    }

    p {
      margin: 0.8em 0;
    }
  }

  @media (max-width: 480px) {
    margin-bottom: 30px;

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      margin: 1.2em 0 0.6em;
    }

    p {
      margin: 0.6em 0;
    }
  }

  /* Ensure long content doesn't break layout */
  * {
    max-width: 100%;
    box-sizing: border-box;
  }

  /* Handle long words and URLs */
  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  li,
  td,
  th {
    overflow-wrap: break-word;
    word-wrap: break-word;
    hyphens: auto;
  }

  /* Force code blocks to respect container width */
  pre,
  pre code {
    max-width: 100% !important;
    width: 100% !important;
    box-sizing: border-box !important;
  }

  /* Alternative: Allow code to wrap on very small screens */
  @media (max-width: 480px) {
    pre {
      white-space: pre-wrap;
      word-wrap: break-word;
      overflow-wrap: break-word;
    }

    pre code {
      white-space: pre-wrap;
      word-wrap: break-word;
      overflow-wrap: break-word;
    }
  }

  /* Handle extremely long lines that might still cause issues */
  pre code {
    min-width: 0;
    max-width: 100%;
    overflow-wrap: anywhere;
    word-break: break-all;
  }

  /* Ensure code blocks never exceed container width */
  pre {
    min-width: 0;
    max-width: 100vw;
    width: 100%;
    overflow-x: auto;
    overflow-y: hidden;
  }

  /* Firefox scrollbar styling */
  pre {
    scrollbar-width: thin;
    scrollbar-color: var(--green) var(--lightest-navy);
  }

  /* Ensure inline code doesn't break layout */
  code:not(pre code) {
    white-space: nowrap;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    display: inline-block;
    vertical-align: baseline;
  }
`;

const PostTemplate = ({ data, location }) => {
  const { frontmatter, html } = data.markdownRemark;
  const { title, date, tags } = frontmatter;
  const [activeSection, setActiveSection] = useState('');
  const [tocReady, setTocReady] = useState(false);

  const formatDate = dateString => {
    const date = new Date(dateString);
    const month = date.toLocaleDateString('en-US', { month: 'long' });
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  };

  // Generate table of contents from headings
  const generateTableOfContents = () => {
    const headings = [];

    // Check if we're in browser environment
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return headings;
    }

    // Only select headings from the main article content, not from navigation or sidebar
    const articleContent = document.querySelector('.post-content');
    if (!articleContent) {
      return headings;
    }

    const headingElements = articleContent.querySelectorAll('h1, h2, h3');

    headingElements.forEach((heading, index) => {
      // Skip if heading is empty or contains only whitespace
      if (!heading.textContent || heading.textContent.trim() === '') {
        return;
      }

      const id = `heading-${index}`;
      heading.id = id;

      headings.push({
        id,
        text: heading.textContent.trim(),
        level: parseInt(heading.tagName.charAt(1)),
        element: heading,
      });
    });

    // Set TOC as ready if we found headings
    if (headings.length > 0) {
      setTocReady(true);
    }

    return headings;
  };

  // Track active section on scroll
  useEffect(() => {
    // Check if we're in browser environment
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return;
    }

    const handleScroll = () => {
      const articleContent = document.querySelector('.post-content');
      if (!articleContent) {
        return;
      }

      const headings = articleContent.querySelectorAll('h1, h2, h3');
      if (headings.length === 0) {
        return;
      }

      const scrollPosition = window.scrollY + 150; // Increased offset for better detection
      let currentSection = '';

      headings.forEach(heading => {
        const sectionTop = heading.offsetTop;
        if (scrollPosition >= sectionTop) {
          currentSection = heading.id;
        }
      });

      setActiveSection(currentSection);
    };

    // Add scroll listener with throttling for better performance
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll);
    return () => window.removeEventListener('scroll', throttledScroll);
  }, []);

  // Generate TOC immediately after DOM updates
  useLayoutEffect(() => {
    // Check if we're in browser environment
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return;
    }

    // Try to generate TOC immediately
    const articleContent = document.querySelector('.post-content');
    if (articleContent) {
      const headings = articleContent.querySelectorAll('h1, h2, h3');
      if (headings.length > 0) {
        generateTableOfContents();
        setTocReady(true);
        return;
      }
    }
  }, [html]); // Re-run when HTML content changes

  // Generate TOC after component mounts and content is loaded (fallback)
  useEffect(() => {
    // Check if we're in browser environment
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return;
    }

    // Function to check if content is ready and generate TOC
    const checkContentAndGenerateTOC = () => {
      const articleContent = document.querySelector('.post-content');
      if (articleContent) {
        const headings = articleContent.querySelectorAll('h1, h2, h3');
        if (headings.length > 0) {
          generateTableOfContents();
          setTocReady(true);
          return true; // Content is ready
        }
      }
      return false; // Content not ready yet
    };

    // Try immediately
    if (checkContentAndGenerateTOC()) {
      return;
    }

    // If not ready, use a more aggressive polling approach
    const maxAttempts = 20; // Try for up to 2 seconds
    let attempts = 0;

    const interval = setInterval(() => {
      attempts++;
      if (checkContentAndGenerateTOC() || attempts >= maxAttempts) {
        clearInterval(interval);
      }
    }, 100);

    // Also try with a longer timeout as fallback
    const fallbackTimer = setTimeout(() => {
      clearInterval(interval);
      checkContentAndGenerateTOC();
    }, 2000);

    return () => {
      clearInterval(interval);
      clearTimeout(fallbackTimer);
    };
  }, []);

  // Add copy functionality to code blocks
  useEffect(() => {
    // Check if we're in browser environment
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return;
    }

    const addCopyButtons = () => {
      const codeBlocks = document.querySelectorAll('pre');

      // Check if device supports touch
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

      codeBlocks.forEach(pre => {
        // Create copy button element
        const copyButton = document.createElement('button');
        copyButton.textContent = 'Copy';
        copyButton.className = 'copy-button';
        copyButton.style.cssText = `
          position: absolute;
          top: 10px;
          right: 10px;
          background-color: var(--green);
          color: var(--navy);
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 10px;
          font-family: var(--font-mono);
          font-weight: 600;
          cursor: pointer;
          opacity: ${isTouchDevice ? '1' : '0'};
          transition: var(--transition);
          z-index: 10;
          border: none;
          outline: none;
          pointer-events: auto;
        `;

        // Add hover effect only for non-touch devices
        if (!isTouchDevice) {
          pre.addEventListener('mouseenter', () => {
            copyButton.style.opacity = '1';
          });

          pre.addEventListener('mouseleave', () => {
            copyButton.style.opacity = '0';
          });
        }

        // Update button position when code block scrolls horizontally
        const updateButtonPosition = () => {
          const preRect = pre.getBoundingClientRect();
          const scrollLeft = pre.scrollLeft;

          // Keep button in the visible area of the viewport
          if (scrollLeft > 0) {
            // When scrolled, position button relative to viewport
            copyButton.style.position = 'fixed';
            copyButton.style.top = `${preRect.top + 10}px`;
            copyButton.style.right = '20px';
            copyButton.style.zIndex = '1000';
          } else {
            // When not scrolled, position button relative to pre element
            copyButton.style.position = 'absolute';
            copyButton.style.top = '10px';
            copyButton.style.right = '10px';
            copyButton.style.zIndex = '10';
          }
        };

        // Add scroll event listener to the pre element
        pre.addEventListener('scroll', updateButtonPosition);

        // Add click handler
        copyButton.addEventListener('click', async e => {
          e.preventDefault();
          e.stopPropagation();

          const codeElement = pre.querySelector('code');
          if (codeElement) {
            try {
              await navigator.clipboard.writeText(codeElement.textContent);
              copyButton.textContent = 'Copied!';
              copyButton.style.backgroundColor = 'var(--green)';

              setTimeout(() => {
                copyButton.textContent = 'Copy';
              }, 2000);
            } catch (err) {
              console.error('Failed to copy code:', err);
              copyButton.textContent = 'Failed';
              copyButton.style.backgroundColor = 'var(--pink)';

              setTimeout(() => {
                copyButton.textContent = 'Copy';
                copyButton.style.backgroundColor = 'var(--green)';
              }, 2000);
            }
          }
        });

        // Append button to pre element
        pre.appendChild(copyButton);
      });
    };

    // Try to add copy buttons immediately
    addCopyButtons();

    // Also try after a short delay to ensure content is loaded
    const timer = setTimeout(addCopyButtons, 500);

    return () => {
      clearTimeout(timer);
      // Clean up scroll event listeners
      const codeBlocks = document.querySelectorAll('pre');
      codeBlocks.forEach(pre => {
        pre.removeEventListener('scroll', () => {});
      });
    };
  }, [html]);

  // Find heading by topic name
  const findHeadingByTopic = topicName => {
    // Check if we're in browser environment
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return null;
    }

    const articleContent = document.querySelector('.post-content');
    if (!articleContent) {
      return null;
    }

    const headings = articleContent.querySelectorAll('h1, h2, h3');

    for (const heading of headings) {
      const headingText = heading.textContent.toLowerCase();
      const topic = topicName.toLowerCase();

      // Check if topic name matches heading text
      if (headingText.includes(topic) || topic.includes(headingText)) {
        return heading;
      }
    }

    return null;
  };

  // Handle topic click
  const handleTopicClick = topicName => {
    // Check if we're in browser environment
    if (typeof window === 'undefined') {
      return;
    }

    const targetHeading = findHeadingByTopic(topicName);
    if (targetHeading) {
      const offset = 120; // Account for navigation bar height
      const elementPosition = targetHeading.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth',
      });
    } else {
      // If no exact match, scroll to the first heading that might be related
      const articleContent = document.querySelector('.post-content');
      if (articleContent) {
        const firstHeading = articleContent.querySelector('h1, h2, h3');
        if (firstHeading) {
          const offset = 120; // Account for navigation bar height
          const elementPosition = firstHeading.offsetTop - offset;
          window.scrollTo({
            top: elementPosition,
            behavior: 'smooth',
          });
        }
      }
    }
  };

  const renderTableOfContents = () => {
    // Check if we're in browser environment
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return [];
    }

    const articleContent = document.querySelector('.post-content');
    if (!articleContent) {
      return [];
    }

    const headings = articleContent.querySelectorAll('h1, h2, h3');
    if (headings.length === 0) {
      return [];
    }

    const tocItems = [];
    let headingIndex = 0;

    headings.forEach(heading => {
      // Skip if heading is empty or contains only whitespace
      if (!heading.textContent || heading.textContent.trim() === '') {
        return;
      }

      const id = heading.id || `heading-${headingIndex}`;
      const level = parseInt(heading.tagName.charAt(1));
      const isActive = activeSection === id;

      tocItems.push(
        <li key={id} className={level > 2 ? 'sub-item' : ''}>
          <a
            href={`#${id}`}
            className={isActive ? 'active' : ''}
            onClick={e => {
              e.preventDefault();
              const offset = 120; // Account for navigation bar height
              const elementPosition = heading.offsetTop - offset;
              window.scrollTo({
                top: elementPosition,
                behavior: 'smooth',
              });
            }}>
            {heading.textContent.trim()}
          </a>
        </li>,
      );

      headingIndex++;
    });

    return tocItems;
  };

  return (
    <Layout location={location}>
      <Helmet title={title} />

      <StyledPostContainer>
        <StyledMainContent>
          <AnimatedSection>
            <StyledBreadcrumb>
              <Link to="/pensieve">
                <span className="arrow">&larr;</span>
                All Memories
              </Link>
            </StyledBreadcrumb>
          </AnimatedSection>

          <AnimatedSection delay={200}>
            <StyledPostHeader>
              <h1 className="medium-heading">{title}</h1>
            </StyledPostHeader>
          </AnimatedSection>

          <AnimatedSection delay={400}>
            <StyledPostContent
              className="post-content"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </AnimatedSection>

          <AnimatedSection delay={600}>
            {/* Comments Section */}
            <Utterances
              repo={utterancesConfig.repo}
              issueTerm={utterancesConfig.issueTerm}
              label={utterancesConfig.label}
              theme={utterancesConfig.theme}
            />

            {/* Spacing above footer */}
            <div style={{ marginBottom: '100px' }} />
          </AnimatedSection>
        </StyledMainContent>

        <StyledSidebar>
          <StyledSidebarSection>
            <h3>Published</h3>
            <StyledPublishedDate>{formatDate(date)}</StyledPublishedDate>
          </StyledSidebarSection>

          {tags && tags.length > 0 && (
            <StyledSidebarSection>
              <h3>Topics</h3>
              <StyledTopics>
                <div className="topic-tags">
                  {tags.map((tag, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleTopicClick(tag)}
                      className="topic-tag-button">
                      {tag}
                    </button>
                  ))}
                </div>
              </StyledTopics>
            </StyledSidebarSection>
          )}

          <StyledSidebarSection>
            <h3>Table of Contents</h3>
            <StyledTableOfContents>
              {tocReady ? (
                renderTableOfContents().length > 0 ? (
                  <ul className="toc-list">{renderTableOfContents()}</ul>
                ) : (
                  <div style={{ color: 'var(--light-slate)', fontStyle: 'italic' }}>
                    No headings found in this article.
                  </div>
                )
              ) : (
                <div style={{ color: 'var(--light-slate)', fontStyle: 'italic' }}>
                  Loading table of contents...
                </div>
              )}
            </StyledTableOfContents>
          </StyledSidebarSection>
        </StyledSidebar>
      </StyledPostContainer>
    </Layout>
  );
};

export default PostTemplate;

PostTemplate.propTypes = {
  data: PropTypes.object,
  location: PropTypes.object,
};

export const pageQuery = graphql`
  query ($path: String!) {
    markdownRemark(frontmatter: { slug: { eq: $path } }) {
      html
      frontmatter {
        title
        description
        date
        slug
        tags
      }
    }
  }
`;
