import React, { useState, useEffect, useRef } from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledArticlesSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

  .archive-link {
    ${({ theme }) => theme.mixins.button};
    margin: 80px auto 0;
  }

  .articles-list {
    ${({ theme }) => theme.mixins.resetList};
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    gap: 30px;
    width: 100%;
    margin-left: 100px;

    @media (max-width: 768px) {
      gap: 25px;
      margin-top: 30px;
      margin-left: 50px;
    }
  }

  .more-button {
    ${({ theme }) => theme.mixins.button};
    margin: 80px auto 0;
  }
`;

const StyledArticle = styled.li`
  position: relative;
  cursor: default;
  transition: var(--transition);
  padding-left: 40px;
  margin-bottom: 0;

  &:before {
    content: '▹';
    position: absolute;
    left: -15px;
    top: 0;
    color: var(--green);
    font-size: 18px;
    font-weight: bold;
    transition: var(--transition);
    z-index: 2;
    text-shadow: 0 0 10px rgba(100, 255, 138, 0.5);
  }

  @media (max-width: 768px) {
    padding-left: 35px;

    &:before {
      left: -12px;
      font-size: 16px;
    }
  }

  @media (prefers-reduced-motion: no-preference) {
    &:hover {
      &:before {
        color: var(--lightest-slate);
        transform: scale(1.2) rotate(15deg);
        text-shadow: 0 0 15px rgba(230, 241, 255, 0.8);
      }

      .article-title {
        color: var(--green);
      }
    }
  }

  a {
    position: relative;
    z-index: 1;
    text-decoration: none;
  }

  .article-inner {
    display: flex;
    flex-direction: column;
    gap: 10px;

    @media (max-width: 768px) {
      gap: 8px;
    }
  }

  .article-title {
    margin: 0;
    color: var(--lightest-slate);
    font-size: var(--fz-xl);
    font-weight: 600;
    transition: var(--transition);

    a {
      color: inherit;
      text-decoration: none;
    }

    @media (max-width: 768px) {
      font-size: var(--fz-lg);
    }
  }

  .article-description {
    color: var(--light-slate);
    font-size: var(--fz-md);
    line-height: 1.6;
    margin: 0;

    @media (max-width: 768px) {
      font-size: var(--fz-sm);
      line-height: 1.5;
    }
  }

  .article-meta {
    display: flex;
    align-items: center;
    gap: 15px;
    margin: 0;
    padding: 0;
    list-style: none;
    flex-wrap: wrap;

    @media (max-width: 768px) {
      gap: 10px;
      flex-direction: column;
      align-items: flex-start;
    }

    .article-date {
      color: var(--light-slate);
      font-family: var(--font-mono);
      font-size: var(--fz-sm);

      @media (max-width: 768px) {
        font-size: var(--fz-xs);
      }
    }

    .article-tags {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 0;
      margin: 0;
      list-style: none;
      flex-wrap: wrap;

      @media (max-width: 768px) {
        gap: 6px;
      }

      li {
        color: var(--green);
        font-family: var(--font-mono);
        font-size: var(--fz-xs);
        background-color: rgba(100, 255, 138, 0.1);
        padding: 2px 8px;
        border-radius: 12px;
        border: 1px solid rgba(100, 255, 138, 0.2);

        @media (max-width: 768px) {
          font-size: var(--fz-xxs);
          padding: 1px 6px;
          border-radius: 8px;
        }
      }
    }
  }
`;

const Articles = () => {
  const data = useStaticQuery(graphql`
    query {
      articles: allMarkdownRemark(
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
            }
            html
          }
        }
      }
    }
  `);

  const [showMore, setShowMore] = useState(false);
  const revealTitle = useRef(null);
  const revealArchiveLink = useRef(null);
  const revealArticles = useRef([]);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealTitle.current, srConfig());
    sr.reveal(revealArchiveLink.current, srConfig());
    revealArticles.current.forEach((ref, i) => sr.reveal(ref, srConfig(i * 100)));
  }, []);

  const GRID_LIMIT = 6;
  const articles = data.articles.edges.filter(({ node }) => node);
  const firstSix = articles.slice(0, GRID_LIMIT);
  const articlesToShow = showMore ? articles : firstSix;

  const articleInner = node => {
    const { frontmatter } = node;
    const { title, description, slug, date, tags } = frontmatter;
    const formattedDate = new Date(date).toLocaleDateString();

    return (
      <div className="article-inner">
        <h3 className="article-title">
          <Link to={slug}>{title}</Link>
        </h3>

        <div className="article-description">{description}</div>

        <div className="article-meta">
          <span className="article-date">{formattedDate}</span>
          {tags && (
            <ul className="article-tags">
              {tags.slice(0, 3).map((tag, i) => (
                <li key={i}>{tag}</li>
              ))}
              {tags.length > 3 && <li>+{tags.length - 3} more</li>}
            </ul>
          )}
        </div>
      </div>
    );
  };

  return (
    <StyledArticlesSection id="articles">
      <h2 className="numbered-heading" ref={revealTitle}>
        Articles & Publications
      </h2>

      <ul className="articles-list">
        {prefersReducedMotion ? (
          <>
            {articlesToShow &&
              articlesToShow.map(({ node }, i) => (
                <StyledArticle key={i}>{articleInner(node)}</StyledArticle>
              ))}
          </>
        ) : (
          <TransitionGroup component={null}>
            {articlesToShow &&
              articlesToShow.map(({ node }, i) => (
                <CSSTransition
                  key={i}
                  classNames="fadeup"
                  timeout={i >= GRID_LIMIT ? (i - GRID_LIMIT) * 300 : 300}
                  exit={false}>
                  <StyledArticle
                    key={i}
                    ref={el => (revealArticles.current[i] = el)}
                    style={{
                      transitionDelay: `${i >= GRID_LIMIT ? (i - GRID_LIMIT) * 100 : 0}ms`,
                    }}>
                    {articleInner(node)}
                  </StyledArticle>
                </CSSTransition>
              ))}
          </TransitionGroup>
        )}
      </ul>

      {articles.length > GRID_LIMIT && (
        <button className="more-button" onClick={() => setShowMore(!showMore)}>
          Show {showMore ? 'Less' : 'More'}
        </button>
      )}

      <Link className="archive-link" to="/pensieve" ref={revealArchiveLink}>
        View All Articles
      </Link>
    </StyledArticlesSection>
  );
};

export default Articles;
