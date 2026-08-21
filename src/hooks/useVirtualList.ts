"use client";

import { useMemo, useState, type UIEvent } from "react";

type VirtualListOptions = {
  itemCount: number;
  rowHeight: number;
  containerHeight: number;
  overscan?: number;
};

export function useVirtualList({
  itemCount,
  rowHeight,
  containerHeight,
  overscan = 4,
}: VirtualListOptions) {
  const [scrollTop, setScrollTop] = useState(0);

  const range = useMemo(() => {
    const visibleRows = Math.ceil(containerHeight / rowHeight);
    const startIndex = Math.max(0, Math.floor(scrollTop / rowHeight) - overscan);
    const endIndex = Math.min(itemCount, startIndex + visibleRows + overscan * 2);

    return {
      startIndex,
      endIndex,
      offsetY: startIndex * rowHeight,
      totalHeight: itemCount * rowHeight,
    };
  }, [containerHeight, itemCount, overscan, rowHeight, scrollTop]);

  const handleScroll = (event: UIEvent<HTMLDivElement>) => {
    setScrollTop(event.currentTarget.scrollTop);
  };

  return { ...range, handleScroll };
}
