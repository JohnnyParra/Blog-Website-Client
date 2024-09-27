import { useEffect, useRef } from "react";

export default function useTrapFocus(isOpen, setIsOpen) {
  const modalRef = useRef(null);
  
  useEffect(() => {
    if (isOpen) {
      const modalElement = modalRef.current;
      const focusableElements = modalElement.querySelectorAll('button');
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      lastElement.focus();
    
      function handleTabKeyPress(event) {
        if (event.key === 'Tab') {
          if (event.shiftKey && document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
          } else if (!event.shiftKey && document.activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
          }
        }
      };
    
      function handleEscapeKeyPress(event) {
        if (event.key === 'Escape') {
          setIsOpen(false)
        }
      }
      modalElement.addEventListener("keydown", handleTabKeyPress);
      modalElement.addEventListener("keydown", handleEscapeKeyPress);

      return () => {
        modalElement.removeEventListener("keydown", handleTabKeyPress);
        modalElement.removeEventListener("keydown", handleEscapeKeyPress);
      };
    }
  }, [isOpen, setIsOpen])

  return { modalRef }
}