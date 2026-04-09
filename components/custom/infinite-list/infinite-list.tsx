"use client";

import { useInfiniteScroll } from "@/hooks/use-infinite-scroll";

interface InfiniteListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  isLoading?: boolean;
  hasMore?: boolean;
  onLoadMore?: () => void;
  keyExtractor: (item: T) => string | number;
  LoadingComponent?: React.ReactNode;
  EndComponent?: React.ReactNode;
}

export default function InfiniteList<T>({
  items,
  renderItem,
  isLoading = false,
  hasMore = true,
  onLoadMore = () => {},
  keyExtractor,
  LoadingComponent,
  EndComponent,
}: InfiniteListProps<T>) {
  const observerTarget = useInfiniteScroll({
    onLoadMore: onLoadMore,
    threshold: 500,
  });

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={keyExtractor(item)}>{renderItem(item, index)}</div>
      ))}

      {isLoading && LoadingComponent && <div>{LoadingComponent}</div>}

      {!hasMore && EndComponent && <div>{EndComponent}</div>}

      {hasMore && <div ref={observerTarget} className="h-4" />}
    </div>
  );
}
