// Libraries
import { useState, useEffect, useRef } from 'react';

export default function detectClick() {
  const [isDropDown, setIsDropDown] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(0);
  const ref = useRef(null);
  const btnRef = useRef(null);
  const options = ref.current?.querySelectorAll('.link').length;

  function handleEnterKey(index) {
    const optionElements = ref.current.querySelectorAll('.link');
    if (optionElements[index]) {
      optionElements[index].click();
    }
  }
  
  useEffect(() => {
    function handleOutsideClick(event) {
      if (isDropDown && (!ref.current.contains(event.target) || !btnRef.current.contains(event.target))) {
        setIsDropDown(false);
      } else if (btnRef.current.contains(event.target)) {
        setIsDropDown(prev => !prev);
      }
    }
    document.addEventListener('click', handleOutsideClick);

    function handleKeydown(event) {
      if (ref.current.contains(event.target) || btnRef.current.contains(event.target)) {
        if (event.key === 'Enter') {
          if (!isDropDown) {
            setIsDropDown(true);
          } else {
            handleEnterKey(highlightIndex);
          }
        } else if (isDropDown) {
          event.preventDefault();
          if (event.key === 'ArrowUp') {
            setHighlightIndex((prevIndex) => (prevIndex - 1 + options) % options);
          } else if (event.key === 'ArrowDown') {
            setHighlightIndex((prevIndex) => (prevIndex + 1) % options);
          } else if (event.key === 'Escape') {
            setIsDropDown(false);
          }
        }
      }
    }
    if (btnRef.current != null) {
      btnRef.current.addEventListener('keydown', handleKeydown);
    }

    return () => {
      document.removeEventListener('click', handleOutsideClick);
      if (btnRef.current != null) {
        btnRef.current.removeEventListener('keydown', handleKeydown);
      }
    }
  },[ref, btnRef, isDropDown, highlightIndex]);


  return { ref, btnRef, isDropDown, setIsDropDown, highlightIndex, setHighlightIndex }
}