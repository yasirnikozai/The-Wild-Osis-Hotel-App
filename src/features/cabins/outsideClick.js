import { useEffect, useRef } from "react";

export function useClickOutside(handler) {
  const modalRef = useRef();
  useEffect(() => {
    function handleClickOutside(e) {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        handler();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handler]);
  return modalRef;
}
