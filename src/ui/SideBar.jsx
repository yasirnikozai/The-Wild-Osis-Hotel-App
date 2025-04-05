import styled from "styled-components";
import Logo from "../../public/Logo";
import MainNav from "./MainNav";
const StyleSidebar = styled.aside`
  background-color: var(--color-grey-0);
  padding: 3.2rem 4rem;
  border-right: 1px solid var(--color-gray-100);
  grid-row: 1/-1;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

export default function SideBar() {
  return (
    <StyleSidebar>
      <Logo />
      <MainNav />
    </StyleSidebar>
  );
}
