// Libraries
import { useEffect, useRef } from "react";

export default function useDetectPageBottom(isFetching, isFetchingNextPage, hasNextPage, fetchNextPage) {
  const scrollPositionRef = useRef(0);

  useEffect(() => {
    const app = document.querySelector('.App');
    function detectBottom() {
      if (app) {
        const isBottom = app.scrollTop + app.clientHeight >= app.scrollHeight - 10;
        if (isBottom && !isFetching && !isFetchingNextPage && hasNextPage) {
          scrollPositionRef.current = window.scrollY;
          fetchNextPage();
        }
      }
    }
    app.addEventListener("scroll",detectBottom);

    return () => {
      app.removeEventListener("scroll",detectBottom);
    }
  },[isFetching, isFetchingNextPage, hasNextPage]);
}