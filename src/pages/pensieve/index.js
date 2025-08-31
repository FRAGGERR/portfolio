import React, { useState, useEffect } from 'react';
import { graphql, Link, navigate } from 'gatsby';

import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Layout } from '@components';

const StyledMainContainer = styled.main`
  width: 85%;
  margin: 0 auto;
  padding: 200px 25px 120px 25px; /* Added bottom padding */

  & > header {
    margin-bottom: 80px;
    text-align: left;

    a {
      &:hover,
      &:focus {
        cursor:
          url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='40' height='48' viewport='0 0 100 100' style='fill:black;font-size:24px;'><text y='50%'>⚡</text></svg>")
            20 0,
          auto;
      }
    }
  }

  .back-button {
    ${({ theme }) => theme.mixins.button};
    margin: 80px auto 120px;
    display: block;
    width: fit-content;
    position: relative;
    z-index: 10;
  }

  .back-button-wrapper {
    margin-bottom: 80px;
    padding-bottom: 10px;
    min-height: 100px; /* Ensure minimum height for spacing */
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @media (max-width: 768px) {
    width: 85%;
    padding: 150px 25px 80px 25px; /* Adjusted bottom padding for mobile */

    & > header {
      margin-bottom: 60px;
    }

    .back-button-wrapper {
      margin-bottom: 80px;
      padding-bottom: 30px;
      min-height: 120px;
    }
  }

  @media (max-width: 480px) {
    width: 95%;
    padding: 120px 15px 60px 15px; /* Adjusted bottom padding for small mobile */

    & > header {
      margin-bottom: 40px;
    }

    .back-button-wrapper {
      margin-bottom: 60px;
      padding-bottom: 20px;
      min-height: 100px;
    }
  }
`;

const StyledTableContainer = styled.div`
  margin: 100px 0px;

  @media (max-width: 768px) {
    margin: 50px -15px;
  }

  @media (max-width: 480px) {
    margin: 30px -10px;
  }

  table {
    width: 100%;
    border-collapse: collapse;

    .hide-on-mobile {
      @media (max-width: 768px) {
        display: none;
      }
    }

    tbody tr {
      &:hover,
      &:focus {
        background-color: var(--light-navy);
      }
    }

    th,
    td {
      padding: 10px;
      text-align: left;

      &:first-child {
        padding-left: 20px;

        @media (max-width: 768px) {
          padding-left: 10px;
        }
      }
      &:last-child {
        padding-right: 20px;

        @media (max-width: 768px) {
          padding-right: 10px;
        }
      }

      svg {
        width: 20px;
        height: 20px;
      }
    }

    tr {
      cursor: default;

      td:first-child {
        border-top-left-radius: var(--border-radius);
        border-bottom-left-radius: var(--border-radius);
      }
      td:last-child {
        border-top-right-radius: var(--border-radius);
        border-bottom-right-radius: var(--border-radius);
      }
    }

    td {
      &.published {
        padding-right: 20px;
        color: var(--green);
        font-family: var(--font-mono);
        font-size: var(--fz-sm);
        font-weight: 600;
        white-space: nowrap;

        @media (max-width: 768px) {
          padding-right: 10px;
          font-size: var(--fz-sm);
        }
      }

      &.title {
        padding-top: 15px;
        padding-right: 20px;
        color: var(--lightest-slate);
        font-size: var(--fz-xl);
        font-weight: 600;
        line-height: 1.25;

        a {
          color: inherit;
          text-decoration: none;
          transition: var(--transition);

          &:hover {
            color: var(--green);
          }
        }
      }

      &.tags {
        font-size: var(--fz-xxs);
        font-family: var(--font-mono);
        line-height: 1.5;
        color: var(--light-slate);

        .separator {
          margin: 0 5px;
        }

        span {
          display: inline-block;
        }
      }

      &.comments {
        min-width: 100px;
        color: var(--green);
        font-family: var(--font-mono);
        font-size: var(--fz-sm);
        font-weight: 600;
        text-align: center;
      }
    }
  }
`;

const PensievePage = ({ location, data }) => {
  const posts = data.allMarkdownRemark.edges;
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const formatDate = (dateString, isMobile = false) => {
    const date = new Date(dateString);
    const year = date.getFullYear();

    if (isMobile) {
      return year.toString();
    }

    const month = date.toLocaleDateString('en-US', { month: 'short' });
    const day = date.getDate();
    return `${month} ${day}, ${year}`;
  };

  // Mock comment count for demonstration
  const getCommentCount = index => {
    // In a real app, this would come from your backend
    const counts = [3, 1, 0, 2, 1, 0, 1, 2];
    return counts[index] || 0;
  };

  return (
    <Layout location={location}>
      <Helmet title="Pensieve" />

      <StyledMainContainer>
        <header>
          <h1 className="big-heading">Pensieve</h1>
          <p className="subtitle">
            <a href="https://www.wizardingworld.com/writing-by-jk-rowling/pensieve">
              a collection of memories
            </a>
          </p>
        </header>

        <StyledTableContainer>
          <table>
            <thead>
              <tr>
                <th>Published</th>
                <th>Title</th>
                <th className="hide-on-mobile">Tags</th>
                <th>Comments</th>
              </tr>
            </thead>
            <tbody>
              {posts.length > 0 &&
                posts.map(({ node }, i) => {
                  const { frontmatter } = node;
                  const { title, slug, date, tags } = frontmatter;
                  const formattedDate = formatDate(date, isMobile);
                  const commentCount = getCommentCount(i);

                  return (
                    <tr
                      key={i}
                      style={{ cursor: 'pointer' }}
                      onClick={() => navigate(slug)}
                      onKeyDown={e => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          navigate(slug);
                        }
                      }}
                      tabIndex={0}
                      role="button"
                      aria-label={`Read article: ${title}`}>
                      <td className="published">{formattedDate}</td>
                      <td className="title">
                        <Link to={slug}>{title}</Link>
                      </td>
                      <td className="tags hide-on-mobile">
                        {tags && tags.length > 0 ? (
                          tags.map((tag, i) => (
                            <span key={i}>
                              {tag}
                              {i !== tags.length - 1 && <span className="separator">&middot;</span>}
                            </span>
                          ))
                        ) : (
                          <span>—</span>
                        )}
                      </td>
                      <td className="comments">{commentCount > 0 ? commentCount : '—'}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </StyledTableContainer>

        <div className="back-button-wrapper">
          <Link className="back-button" to="/#articles">
            ← Back to Home
          </Link>
        </div>
      </StyledMainContainer>
    </Layout>
  );
};

PensievePage.propTypes = {
  location: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
};

export default PensievePage;

export const pageQuery = graphql`
  {
    allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/content/posts/" }
        frontmatter: { draft: { ne: true } }
      }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          frontmatter {
            title
            description
            slug
            date
            tags
            draft
          }
          html
        }
      }
    }
  }
`;
