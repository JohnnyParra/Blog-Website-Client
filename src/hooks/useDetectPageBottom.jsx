// Libraries
import { useEffect, useRef } from "react";

export default function useDetectPageBottom(isFetching, isFetchingNextPage, hasNextPage, fetchNextPage) {
  const scrollPositionRef = useRef(0);

  useEffect(() => {
    const app = document.querySelector('.App');
    function detectBottom() {
      if (app) {
        const isBottom = document.documentElement.scrollTop + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 10;
        if (isBottom && !isFetching && !isFetchingNextPage && hasNextPage) {
          scrollPositionRef.current = window.scrollY;
          fetchNextPage();
        }
      }
    }
    document.addEventListener("scroll",detectBottom);

    return () => {
      document.removeEventListener("scroll",detectBottom);
    }
  },[isFetching, isFetchingNextPage, hasNextPage]);
}