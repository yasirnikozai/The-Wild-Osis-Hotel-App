import styled from "styled-components";
import UserAvatar from "../features/authentication/UserAvatar";
import HeaderMenu from "./HeaderMenu";
import DarkMode from "./DarkMode";

// Use transient props with $ prefix
const StyledHeader = styled.header`
  background-color: ${({ $bg }) => $bg || "var(--color-grey-0)"};
  padding: ${({ $padding }) => $padding || "1.2rem 4.8rem"};
  border: ${({ $border }) => $border || "1px solid var(--color-gray-100)"};
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 2rem; /* Optional: space between avatar and menu */
`;

export default function Header() {
  return (
    <StyledHeader
      $bg="var(--color-grey-0)"
      $padding="1.2rem 4.8rem"
      $border="1px solid var(--color-gray-100)"
    >
      <UserAvatar />
      <DarkMode />
      <HeaderMenu />
    </StyledHeader>
  );
}
