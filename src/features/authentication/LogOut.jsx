import React from "react";
import { HiArrowRightOnRectangle } from "react-icons/hi2";
import { useLogOut } from "./useLogOut";
import Spinner from "../../ui/Spinner";
import styled from "styled-components";

const StyledLogoutWrapper = styled.div`
  display: flex;
  justify-content: flex-start; /* Left align */
  padding: 1rem;
`;

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.8rem 1.4rem;
  background-color: #f44336; /* red */
  color: #fff;
  font-size: 1rem;
  font-weight: 500;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  outline: none;

  &:hover {
    background-color: #d32f2f;
  }

  &:disabled {
    background-color: #f88a7e;
    cursor: not-allowed;
  }

  svg {
    font-size: 1.2rem;
  }
`;

export default function LogOut() {
  const { isLoading, logout } = useLogOut();

  return (
    <StyledLogoutWrapper>
      <LogoutButton onClick={logout} disabled={isLoading}>
        {!isLoading ? (
          <>
            <HiArrowRightOnRectangle />
            Log Out
          </>
        ) : (
          <Spinner />
        )}
      </LogoutButton>
    </StyledLogoutWrapper>
  );
}
