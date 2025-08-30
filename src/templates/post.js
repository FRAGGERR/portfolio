import React, { useState, useEffect } from 'react';
import { graphql, Link } from 'gatsby';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Layout } from '@components';

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

    &:hover {
      color: var(--lightest-slate);
    }
  }

  .arrow {
    color: var(--light-slate);
    margin-right: 10px;
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

const StyledComments = styled.div`
  margin-top: 60px;
  padding-top: 40px;
  border-top: 1px solid var(--lightest-navy);

  h3 {
    color: var(--lightest-slate);
    font-size: var(--fz-lg);
    font-weight: 600;
    margin: 0 0 30px 0;
  }

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

const StyledCommentItem = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 25px;
  padding-bottom: 25px;
  border-bottom: 1px solid var(--lightest-navy);

  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }

  .comment-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    flex-shrink: 0;
    background-color: var(--light-navy);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--light-slate);
    font-size: var(--fz-sm);
    font-weight: 600;
  }

  .comment-content {
    flex: 1;
  }

  .comment-header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 8px;
    flex-wrap: wrap;
  }

  .comment-author {
    color: var(--lightest-slate);
    font-weight: 600;
    font-size: var(--fz-sm);
  }

  .comment-date {
    color: var(--light-slate);
    font-size: var(--fz-xs);
    font-family: var(--font-mono);
  }

  .comment-badge {
    background-color: var(--lightest-navy);
    color: var(--light-slate);
    padding: 2px 8px;
    border-radius: 12px;
    font-size: var(--fz-xxs);
    font-weight: 600;
  }

  .comment-text {
    color: var(--light-slate);
    font-size: var(--fz-sm);
    line-height: 1.5;
    margin-bottom: 10px;
  }

  .comment-actions {
    display: flex;
    align-items: center;
    gap: 15px;
  }

  .action-button {
    background: none;
    border: none;
    color: var(--light-slate);
    font-size: var(--fz-xs);
    cursor: pointer;
    padding: 4px 8px;
    border-radius: 4px;
    transition: var(--transition);
    display: flex;
    align-items: center;
    gap: 5px;

    &:hover {
      color: var(--green);
      background-color: rgba(100, 255, 138, 0.1);
    }
  }

  @media (max-width: 768px) {
    gap: 12px;

    .comment-avatar {
      width: 35px;
      height: 35px;
      font-size: var(--fz-xs);
    }

    .comment-header {
      gap: 8px;
      margin-bottom: 6px;
    }

    .comment-text {
      font-size: var(--fz-xs);
    }
  }
`;

const StyledCommentForm = styled.div`
  margin-top: 30px;

  .comment-tabs {
    display: flex;
    gap: 0;
    margin-bottom: 15px;
    border-bottom: 1px solid var(--lightest-navy);
  }

  .tab-button {
    background: none;
    border: none;
    color: var(--light-slate);
    padding: 10px 20px;
    cursor: pointer;
    transition: var(--transition);
    border-bottom: 2px solid transparent;

    &.active {
      color: var(--green);
      border-bottom-color: var(--green);
    }

    &:hover {
      color: var(--lightest-slate);
    }
  }

  .comment-input {
    width: 100%;
    min-height: 120px;
    background-color: var(--light-navy);
    border: 1px solid var(--lightest-navy);
    border-radius: var(--border-radius);
    padding: 15px;
    color: var(--lightest-slate);
    font-family: var(--font-sans);
    font-size: var(--fz-sm);
    line-height: 1.5;
    resize: vertical;
    transition: var(--transition);

    &:focus {
      outline: none;
      border-color: var(--green);
      box-shadow: 0 0 0 2px rgba(100, 255, 138, 0.1);
    }

    &::placeholder {
      color: var(--light-slate);
    }
  }

  .comment-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 15px;
    flex-wrap: wrap;
    gap: 15px;
  }

  .markdown-info {
    color: var(--light-slate);
    font-size: var(--fz-xs);
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .github-login {
    background-color: var(--green);
    color: var(--navy);
    border: none;
    padding: 10px 20px;
    border-radius: var(--border-radius);
    font-family: var(--font-mono);
    font-size: var(--fz-sm);
    font-weight: 600;
    cursor: pointer;
    transition: var(--transition);
    display: flex;
    align-items: center;
    gap: 8px;

    &:hover {
      background-color: var(--lightest-slate);
      transform: translateY(-2px);
    }
  }

  .github-icon {
    width: 16px;
    height: 16px;
  }

  @media (max-width: 768px) {
    .comment-tabs {
      margin-bottom: 12px;
    }

    .tab-button {
      padding: 8px 15px;
      font-size: var(--fz-xs);
    }

    .comment-input {
      min-height: 100px;
      padding: 12px;
      font-size: var(--fz-xs);
    }

    .comment-footer {
      flex-direction: column;
      align-items: stretch;
      gap: 12px;
    }

    .github-login {
      padding: 12px 20px;
      font-size: var(--fz-xs);
    }
  }
`;

const PostTemplate = ({ data, location }) => {
  const { frontmatter, html } = data.markdownRemark;
  const { title, date, tags } = frontmatter;
  const [activeSection, setActiveSection] = useState('');
  const [activeTab, setActiveTab] = useState('write');
  const [commentText, setCommentText] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const formatDate = dateString => {
    const date = new Date(dateString);
    const month = date.toLocaleDateString('en-US', { month: 'long' });
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  };

  // Sample comments data (in real app, this would come from your backend)
  const sampleComments = [
    {
      id: 1,
      author: 'hardikchhipa',
      avatar: 'H',
      date: '7 Apr 2025',
      text: 'Great article! This really helped me understand the concepts better.',
      isOwner: true,
      likes: 3,
    },
    {
      id: 2,
      author: 'devuser123',
      avatar: 'D',
      date: '6 Apr 2025',
      text: 'Thanks for sharing this. The examples are very clear and helpful.',
      isOwner: false,
      likes: 1,
    },
  ];

  // Generate table of contents from headings
  const generateTableOfContents = () => {
    const headings = [];
    // Only select headings from the main article content, not from navigation or sidebar
    const articleContent = document.querySelector('.post-content');
    if (!articleContent) {return headings;}

    const headingElements = articleContent.querySelectorAll('h1, h2, h3');

    headingElements.forEach((heading, index) => {
      // Skip if heading is empty or contains only whitespace
      if (!heading.textContent || heading.textContent.trim() === '') {return;}

      const id = `heading-${index}`;
      heading.id = id;

      headings.push({
        id,
        text: heading.textContent.trim(),
        level: parseInt(heading.tagName.charAt(1)),
        element: heading,
      });
    });

    return headings;
  };

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const articleContent = document.querySelector('.post-content');
      if (!articleContent) {return;}

      const headings = articleContent.querySelectorAll('h1, h2, h3');
      if (headings.length === 0) {return;}

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

  // Generate TOC after component mounts and content is loaded
  useEffect(() => {
    // Wait for content to be rendered
    const timer = setTimeout(() => {
      generateTableOfContents();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Find heading by topic name
  const findHeadingByTopic = topicName => {
    const articleContent = document.querySelector('.post-content');
    if (!articleContent) {return null;}

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
    const articleContent = document.querySelector('.post-content');
    if (!articleContent) {return [];}

    const headings = articleContent.querySelectorAll('h1, h2, h3');
    if (headings.length === 0) {return [];}

    const tocItems = [];
    let headingIndex = 0;

    headings.forEach(heading => {
      // Skip if heading is empty or contains only whitespace
      if (!heading.textContent || heading.textContent.trim() === '') {return;}

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

  const handleGitHubLogin = () => {
    // In a real app, this would redirect to GitHub OAuth
    // For now, we'll simulate a login
    setIsLoggedIn(true);
  };

  const handleCommentSubmit = e => {
    e.preventDefault();
    if (!commentText.trim()) {return;}

    // In a real app, this would submit to your backend
    // Comment submitted successfully
    setCommentText('');
  };

  return (
    <Layout location={location}>
      <Helmet title={title} />

      <StyledPostContainer>
        <StyledMainContent>
          <StyledBreadcrumb>
            <span className="arrow">&larr;</span>
            <Link to="/pensieve">All memories</Link>
          </StyledBreadcrumb>

          <StyledPostHeader>
            <h1 className="medium-heading">{title}</h1>
          </StyledPostHeader>

          <StyledPostContent className="post-content" dangerouslySetInnerHTML={{ __html: html }} />

          <StyledComments>
            <h3>Comments</h3>

            {/* Existing Comments */}
            {sampleComments.map(comment => (
              <StyledCommentItem key={comment.id}>
                <div className="comment-avatar">{comment.avatar}</div>
                <div className="comment-content">
                  <div className="comment-header">
                    <span className="comment-author">{comment.author}</span>
                    <span className="comment-date">commented on {comment.date}</span>
                    {comment.isOwner && <span className="comment-badge">Owner</span>}
                  </div>
                  <div className="comment-text">{comment.text}</div>
                  <div className="comment-actions">
                    <button className="action-button">👍 {comment.likes}</button>
                    <button className="action-button">💬 Reply</button>
                  </div>
                </div>
              </StyledCommentItem>
            ))}

            {/* Comment Form */}
            <StyledCommentForm>
              <div className="comment-tabs">
                <button
                  className={`tab-button ${activeTab === 'write' ? 'active' : ''}`}
                  onClick={() => setActiveTab('write')}>
                  Write
                </button>
                <button
                  className={`tab-button ${activeTab === 'preview' ? 'active' : ''}`}
                  onClick={() => setActiveTab('preview')}>
                  Preview
                </button>
              </div>

              {activeTab === 'write' ? (
                <textarea
                  className="comment-input"
                  placeholder={isLoggedIn ? 'Write a comment...' : 'Sign in to comment'}
                  value={commentText}
                  onChange={e => setCommentText(e.target.value)}
                  disabled={!isLoggedIn}
                />
              ) : (
                <div className="comment-input">{commentText || 'Nothing to preview'}</div>
              )}

              <div className="comment-footer">
                <div className="markdown-info">📝 Styling with Markdown is supported</div>
                {!isLoggedIn ? (
                  <button className="github-login" onClick={handleGitHubLogin}>
                    <svg className="github-icon" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    Sign in with GitHub
                  </button>
                ) : (
                  <button
                    className="github-login"
                    onClick={handleCommentSubmit}
                    disabled={!commentText.trim()}>
                    💬 Comment
                  </button>
                )}
              </div>
            </StyledCommentForm>
          </StyledComments>
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
              <ul className="toc-list">{renderTableOfContents()}</ul>
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
