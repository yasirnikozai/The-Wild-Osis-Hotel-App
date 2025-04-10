import React from "react";
import styled, { css } from "styled-components";

const sizes = {
  small: css`
    font-size: 1.2rem;
    padding: 0.4rem 0.8rem;
    text-transform: uppercase;
    font-weight: 600;
    text-align: center;
  `,
  medium: css`
    font-size: 1.4rem;
    padding: 1.2rem 1.6rem;
    font-weight: 500;
  `,
  large: css`
    font-size: 1.6rem;
    padding: 1.2rem 2.4rem;
    font-weight: 500;
  `,
};

const variations = {
  primary: css`
    color: var(--color-brand-50);
    background-color: var(--color-brand-600);

    &:hover {
      background-color: var(--color-brand-700);
    }
  `,
  secondary: css`
    color: var(--color-grey-600);
    background: var(--color-grey-0);
    border: 1px solid var(--color-grey-200);

    &:hover {
      background-color: var(--color-grey-50);
    }
  `,
  danger: css`
    color: var(--color-red-100);
    background-color: var(--color-red-700);

    &:hover {
      background-color: var(--color-red-800);
    }
  `,
};

// Use transient props ($size and $variation) to prevent passing them to DOM
const StyledButton = styled.button`
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.2s;

  ${({ $size }) => sizes[$size] || sizes.medium}
  ${({ $variation }) => variations[$variation] || variations.primary}
`;

export default function Button({
  children,
  size = "medium",
  variation = "primary",
  ...props
}) {
  return (
    <StyledButton $size={size} $variation={variation} {...props}>
      {children}
    </StyledButton>
  );
}
