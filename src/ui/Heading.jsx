import styled, { css } from "styled-components";

const headingStyles = {
  h1: css`
    font-size: 2.5rem; /* 40px */
    font-weight: 700;
    color: var(--primary-color);
  `,
  h2: css`
    font-size: 2rem; /* 32px */
    font-weight: 600;
    color: var(--secondary-color);
  `,
  h3: css`
    font-size: 1.5rem; /* 24px */
    font-weight: 500;
    color: var(--grey-color);
  `,
  h4: css`
    font-size: 3.2rem; /* 19px */
    font-weight: 400;
    color: var(--light-grey-color);
    text-align: center;
  `,
};

const Heading = styled.div`
  ${(props) => headingStyles[props.as] || headingStyles.h1};
  margin-bottom: 1.2rem;
`;

export default Heading;
