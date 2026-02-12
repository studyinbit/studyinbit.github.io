import { useCallback, useEffect, useRef, useState, type TouchEvent } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

type GalleryItemElement = HTMLElement | null;

export function useMobileGalleryHighlight(itemCount: number) {
  const isMobile = useIsMobile();
  const [activeIndex, setActiveIndex] = useState(0);
  const itemRefs = useRef<GalleryItemElement[]>([]);
  const rafRef = useRef<number | null>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const touchMovedRef = useRef(false);
  const normalizedActiveIndex = itemCount <= 0 ? 0 : Math.min(activeIndex, itemCount - 1);

  const setItemRef = useCallback((index: number, node: GalleryItemElement) => {
    itemRefs.current[index] = node;
  }, []);

  const measureClosestItem = useCallback(() => {
    if (!isMobile || itemCount <= 1) return;

    const viewportCenter = window.innerHeight / 2;
    let nextIndex: number | null = null;
    let closestDistance = Number.POSITIVE_INFINITY;

    itemRefs.current.forEach((item, index) => {
      if (!item) return;

      const rect = item.getBoundingClientRect();
      const isVisible = rect.bottom > 0 && rect.top < window.innerHeight;
      if (!isVisible) return;

      const itemCenter = rect.top + rect.height / 2;
      const distance = Math.abs(itemCenter - viewportCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
        nextIndex = index;
      }
    });

    if (nextIndex === null) return;
    const resolvedIndex = nextIndex;

    setActiveIndex((current) => (current === resolvedIndex ? current : resolvedIndex));
  }, [isMobile, itemCount]);

  const scheduleMeasure = useCallback(() => {
    if (rafRef.current !== null) {
      window.cancelAnimationFrame(rafRef.current);
    }

    rafRef.current = window.requestAnimationFrame(() => {
      measureClosestItem();
      rafRef.current = null;
    });
  }, [measureClosestItem]);

  useEffect(() => {
    if (!isMobile) return;

    scheduleMeasure();
    window.addEventListener("scroll", scheduleMeasure, { passive: true });
    window.addEventListener("resize", scheduleMeasure);

    return () => {
      window.removeEventListener("scroll", scheduleMeasure);
      window.removeEventListener("resize", scheduleMeasure);

      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [isMobile, scheduleMeasure]);

  const activateItem = useCallback(
    (index: number) => {
      if (!isMobile || itemCount <= 0) return;
      const clampedIndex = Math.max(0, Math.min(index, itemCount - 1));
      setActiveIndex(clampedIndex);
    },
    [isMobile, itemCount]
  );

  const onItemTouchStart = useCallback(() => {
    touchMovedRef.current = false;
  }, []);

  const onItemTouchMove = useCallback((event: TouchEvent<HTMLElement>) => {
    const point = event.touches[0];
    if (!point) return;

    if (!touchStartRef.current) {
      touchStartRef.current = { x: point.clientX, y: point.clientY };
      return;
    }

    const dx = point.clientX - touchStartRef.current.x;
    const dy = point.clientY - touchStartRef.current.y;
    const distance = Math.hypot(dx, dy);

    if (distance > 10) {
      touchMovedRef.current = true;
    }
  }, []);

  const onItemTouchEnd = useCallback(
    (index: number) => {
      if (!touchMovedRef.current) {
        activateItem(index);
      }
      touchMovedRef.current = false;
      touchStartRef.current = null;
    },
    [activateItem]
  );

  return {
    isMobile,
    activeIndex: normalizedActiveIndex,
    setItemRef,
    activateItem,
    onItemTouchStart,
    onItemTouchMove,
    onItemTouchEnd,
  };
}
