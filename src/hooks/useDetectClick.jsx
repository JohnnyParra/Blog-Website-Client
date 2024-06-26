// Libraries
import { useState, useEffect, useRef } from 'react';

export default function detectClick() {
  const [isDropDown, setIsDropDown] = useState(false);
  const ref = useRef(null);
  const btnRef = useRef(null);
  
  useEffect(() => {
    function handleOutsideClick(event) {
      if (isDropDown && (!ref.current.contains(event.target) || !btnRef.current.contains(event.target))) {
        setIsDropDown(false);
      } else if (btnRef.current.contains(event.target)) {
        setIsDropDown(prev => !prev);
      }
    }
    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick)
    }
  },[ref, btnRef, isDropDown]);


  return { ref, btnRef, isDropDown, setIsDropDown }
}