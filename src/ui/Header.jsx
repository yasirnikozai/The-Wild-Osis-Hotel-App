import React from "react";
import styled from "styled-components";
import LogOut from "../features/authentication/LogOut";

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border: 1px solid var(--color-gray-100);
`;

export default function Header() {
  return (
    <StyledHeader>
      <LogOut />
    </StyledHeader>
  );
}
