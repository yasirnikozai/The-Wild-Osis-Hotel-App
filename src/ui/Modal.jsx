// imports
import React, {
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import styled from "styled-components";
import { HiXMark } from "react-icons/hi2";
import { createPortal } from "react-dom";
import { useClickOutside } from "../features/cabins/outsideClick";

// Styled Components
const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-500);
  }
`;

// Modal Context
const ModalContext = createContext();

// Main Modal Component
function Modal({ children }) {
  const [openName, setOpenName] = useState("");

  const open = (name) => setOpenName(name); // ✅ Fix: Function should call setOpenName
  const close = () => setOpenName(""); // ✅ Fix: Close should reset the state

  return (
    <ModalContext.Provider value={{ openName, open, close }}>
      {children}
    </ModalContext.Provider>
  );
}

// Modal.Open Component
function Open({ opens, children }) {
  const { open } = useContext(ModalContext);
  return cloneElement(children, {
    onClick: () => open(opens),
  });
}

// Modal.Window Component
function Window({ children, name }) {
  const { openName, close } = useContext(ModalContext);
  const modalRef = useClickOutside(close);

  if (name !== openName) return null;
  return createPortal(
    <Overlay>
      <StyledModal ref={modalRef}>
        <Button onClick={close}>
          <HiXMark />
        </Button>
        <div>{cloneElement(children, { onClose: close })}</div>
      </StyledModal>
    </Overlay>,
    document.body
  );
}

// Attach subcomponents to Modal
Modal.Open = Open;
Modal.Window = Window;

export default Modal;
