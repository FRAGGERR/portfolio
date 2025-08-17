import React, { useEffect, useRef } from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledAboutSection = styled.section`
  max-width: 900px;

  .inner {
    display: grid;
    grid-template-columns: 3fr 2fr;
    grid-gap: 50px;

    @media (max-width: 768px) {
      display: block;
    }
  }
`;
const StyledText = styled.div`
  ul.skills-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(140px, 200px));
    grid-gap: 0 10px;
    padding: 0;
    margin: 20px 0 0 0;
    overflow: hidden;
    list-style: none;

    li {
      position: relative;
      margin-bottom: 10px;
      padding-left: 20px;
      font-family: var(--font-mono);
      font-size: var(--fz-xs);

      &:before {
        content: '▹';
        position: absolute;
        left: 0;
        color: var(--green);
        font-size: var(--fz-sm);
        line-height: 12px;
      }
    }
  }
`;
const StyledPic = styled.div`
  position: relative;
  max-width: 300px;

  @media (max-width: 768px) {
    margin: 50px auto 0;
    width: 70%;
  }

  .wrapper {
    ${({ theme }) => theme.mixins.boxShadow};
    display: block;
    position: relative;
    width: 100%;
    border-radius: var(--border-radius);
    background-color: var(--green);

    &:hover,
    &:focus {
      outline: 0;
      transform: translate(-4px, -4px);

      &:after {
        transform: translate(8px, 8px);
      }

      .img {
        filter: none;
        mix-blend-mode: normal;
      }
    }

    .img {
      position: relative;
      border-radius: var(--border-radius);
      mix-blend-mode: multiply;
      filter: grayscale(100%) contrast(1);
      transition: var(--transition);
    }

    &:before,
    &:after {
      content: '';
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: var(--border-radius);
      transition: var(--transition);
    }

    &:before {
      top: 0;
      left: 0;
      background-color: var(--navy);
      mix-blend-mode: screen;
    }

    &:after {
      border: 2px solid var(--green);
      top: 14px;
      left: 14px;
      z-index: -1;
    }
  }
`;

const About = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  const skills = [
    'Python',
    'Deep Learning',
    'Transformers',
    'Web Technologies',
    'AWS',
    'Docker',
    'Git',
    'Linux',
  ];

  return (
    <StyledAboutSection id="about" ref={revealContainer}>
      <h2 className="numbered-heading">About Me</h2>

      <div className="inner">
        <StyledText>
          <div>
            <p>
              <span style={{ display: 'block', textAlign: 'justify' }}>
                I’m Hardik Chhipa, and I like my AI like I like my coffee—strong, efficient, and
                adaptable anywhere. From crafting multilingual chatbots that erase language walls in
                healthcare, to engineering retinal disease detection models that fit comfortably on
                resource-constrained devices, I’m driven by a simple principle. If technology can’t
                reach everyone, it’s not finished yet.
              </span>
            </p>

            <p>
              <span style={{ display: 'block', textAlign: 'justify' }}>
                Fast-forward to today, and I've had the privilege of working at{' '}
                <a
                  href="https://drive.google.com/file/d/1B-LrY_kBV2SAux9gX5NQpJrxLVALmRGu/view?usp=sharing"
                  style={{ color: 'var(--green)' }}>
                  IIT Jodhpur
                </a>{' '}
                and{' '}
                <a
                  href="https://www.srmist.edu.in/department/center-of-excellence-for-electronic-cooling-and-cfd-simulation/"
                  style={{ color: 'var(--green)' }}>
                  Intel Cooling Lab
                </a>
                . Nowadays I work on building speech recognition and voice cloning pipelines at{' '}
                <a href="https://www.naventra.in/" style={{ color: 'var(--green)' }}>
                  Naventra
                </a>{' '}
                for a variety of clients.
              </span>
            </p>

            <p>
              I also recently <a href="https://clearsight.streamlit.app/">launched a project</a>{' '}
              that helps to detect retinal diseases from fundus images.
            </p>

            <p>Here are a few technologies I've been working with recently:</p>
          </div>

          <ul className="skills-list">
            {skills && skills.map((skill, i) => <li key={i}>{skill}</li>)}
          </ul>
        </StyledText>

        <StyledPic>
          <div className="wrapper">
            <StaticImage
              className="img"
              src="../../images/me.jpg"
              width={500}
              quality={95}
              formats={['AUTO', 'WEBP', 'AVIF']}
              alt="Headshot"
            />
          </div>
        </StyledPic>
      </div>
    </StyledAboutSection>
  );
};

export default About;
