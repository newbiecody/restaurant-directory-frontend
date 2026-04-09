import { useRef, useEffect } from "react";

interface UseInfiniteScrollOptions {
  onLoadMore: () => void;
  threshold?: number;
}

export function useInfiniteScroll({ onLoadMore, threshold = 100 }: UseInfiniteScrollOptions) {
  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onLoadMore();
        }
      },
      {
        rootMargin: `${threshold}px`,
      }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [onLoadMore, threshold]);

  return observerTarget;
}
