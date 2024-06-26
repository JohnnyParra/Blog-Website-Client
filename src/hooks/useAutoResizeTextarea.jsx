// Libraries
import React, { useEffect, useRef } from "react";

export default function useAutoResizeTextarea(value) {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.style.height = "0px";
      const scrollHeight = ref.current.scrollHeight;
      ref.current.style.height = scrollHeight + "px";
    }
  }, [ref, value])


  return {ref}
}