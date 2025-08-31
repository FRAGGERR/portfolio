import React, { useState, useEffect, useLayoutEffect } from 'react';
import { graphql, Link } from 'gatsby';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Layout, Utterances } from '@components';
import utterancesConfig from '@config/utterances';

const StyledPostContainer = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 60px;
  padding: 0 20px;
  margin-top: 100px;

  @media (max-width: 1080px) {
    grid-template-columns: 1fr;
    gap: 40px;
    margin-top: 80px;
  }

  @media (max-width: 768px) {
    padding: 0 15px;
    margin-top: 60px;
    gap: 30px;
  }

  @media (max-width: 480px) {
    padding: 0 10px;
    margin-top: 50px;
    gap: 20px;
  }
`;

const StyledMainContent = styled.div`
  max-width: 800px;
  width: 100%;
`;

const StyledBreadcrumb = styled.div`
  margin-bottom: 40px;
  margin-top: 20px;

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
    margin-top: 15px;
  }

  @media (max-width: 480px) {
    margin-bottom: 25px;
    margin-top: 10px;
  }
`;

const StyledSidebar = styled.aside`
  position: sticky;
  top: 120px;
  height: fit-content;
  margin-top: 80px;

  @media (max-width: 1080px) {
    position: static;
    order: -1;
    margin-top: 0;
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
  margin-bottom: 50px;

  @media (max-width: 768px) {
    margin-bottom: 40px;
  }

  @media (max-width: 480px) {
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
  }

  pre {
    background-color: var(--light-navy);
    border-radius: var(--border-radius);
    padding: 20px;
    overflow-x: auto;
    margin: 2em 0;

    @media (max-width: 768px) {
      padding: 15px;
      margin: 1.5em 0;
    }

    code {
      background-color: transparent;
      color: var(--lightest-slate);
      padding: 0;
      font-size: var(--fz-sm);
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
    }
  }

  ul,
  ol {
    margin: 1.5em 0;
    padding-left: 20px;

    li {
      margin: 0.5em 0;
      line-height: 1.6;
    }
  }

  img {
    max-width: 100%;
    height: auto;
    border-radius: var(--border-radius);
    margin: 2em 0;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin: 2em 0;

    th,
    td {
      padding: 12px;
      text-align: left;
      border-bottom: 1px solid var(--lightest-navy);
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
          <StyledBreadcrumb>
            <Link to="/pensieve">
              <span className="arrow">&larr;</span>
              All Memories
            </Link>
          </StyledBreadcrumb>

          <StyledPostHeader>
            <h1 className="medium-heading">{title}</h1>
          </StyledPostHeader>

          <StyledPostContent className="post-content" dangerouslySetInnerHTML={{ __html: html }} />

          {/* Comments Section */}
          <Utterances
            repo={utterancesConfig.repo}
            issueTerm={utterancesConfig.issueTerm}
            label={utterancesConfig.label}
            theme={utterancesConfig.theme}
          />

          {/* Spacing above footer */}
          <div style={{ marginBottom: '100px' }} />
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
