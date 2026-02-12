"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MobilePeekDeckProps<T> {
  items: T[];
  renderItem: (item: T, index: number, isActive: boolean) => ReactNode;
  getItemKey?: (item: T, index: number) => string;
  onActiveIndexChange?: (index: number) => void;
  getIndicatorAriaLabel?: (index: number) => string;
  ariaLabel?: string;
  className?: string;
  trackClassName?: string;
  slideClassName?: string;
}

const clampIndex = (index: number, count: number) => {
  if (count <= 0) return 0;
  return Math.max(0, Math.min(index, count - 1));
};

export function MobilePeekDeck<T>({
  items,
  renderItem,
  getItemKey,
  onActiveIndexChange,
  getIndicatorAriaLabel,
  ariaLabel = "Card carousel",
  className,
  trackClassName,
  slideClassName,
}: MobilePeekDeckProps<T>) {
  const itemCount = items.length;
  const [activeIndex, setActiveIndex] = useState(0);
  const normalizedActiveIndex = clampIndex(activeIndex, itemCount);
  const trackRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<Array<HTMLDivElement | null>>([]);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    slideRefs.current = slideRefs.current.slice(0, itemCount);
  }, [itemCount]);

  const updateActiveIndex = useCallback(
    (nextIndex: number) => {
      const clamped = clampIndex(nextIndex, itemCount);
      setActiveIndex((current) => {
        if (current === clamped) return current;
        onActiveIndexChange?.(clamped);
        return clamped;
      });
    },
    [itemCount, onActiveIndexChange]
  );

  const measureClosestSlide = useCallback(() => {
    const track = trackRef.current;
    if (!track || itemCount <= 1) return;

    const viewportCenter = track.scrollLeft + track.clientWidth / 2;
    let nextIndex = normalizedActiveIndex;
    let closestDistance = Number.POSITIVE_INFINITY;

    slideRefs.current.forEach((slide, index) => {
      if (!slide) return;
      const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
      const distance = Math.abs(slideCenter - viewportCenter);
      if (distance < closestDistance) {
        closestDistance = distance;
        nextIndex = index;
      }
    });

    updateActiveIndex(nextIndex);
  }, [itemCount, normalizedActiveIndex, updateActiveIndex]);

  const handleScroll = () => {
    if (rafRef.current !== null) {
      window.cancelAnimationFrame(rafRef.current);
    }
    rafRef.current = window.requestAnimationFrame(() => {
      measureClosestSlide();
      rafRef.current = null;
    });
  };

  useEffect(
    () => () => {
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
    },
    []
  );

  const scrollToIndex = (index: number) => {
    const target = slideRefs.current[index];
    if (!target) return;
    target.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
    updateActiveIndex(index);
  };

  if (itemCount === 0) {
    return null;
  }

  return (
    <div className={cn("relative -mx-6 md:mx-0", className)}>
      <div
        ref={trackRef}
        aria-label={ariaLabel}
        className={cn(
          "flex snap-x snap-mandatory gap-3 overflow-x-auto overflow-y-visible pt-3 pb-4 pl-6 pr-4 md:px-1 md:pt-1 md:pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
          trackClassName
        )}
        onScroll={handleScroll}
      >
        {items.map((item, index) => (
          <div
            key={getItemKey ? getItemKey(item, index) : index}
            ref={(node) => {
              slideRefs.current[index] = node;
            }}
            className={cn(
              "snap-start shrink-0 w-[min(22rem,calc(100%-3.75rem))] scroll-ml-6 pb-4 md:scroll-ml-0 md:pb-0",
              slideClassName
            )}
          >
            {renderItem(item, index, index === normalizedActiveIndex)}
          </div>
        ))}
      </div>

      {itemCount > 1 && (
        <div className="mt-4 flex justify-center gap-2">
          {items.map((_, index) => (
            <button
              key={index}
              type="button"
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                normalizedActiveIndex === index ? "w-5 bg-primary" : "w-2 bg-primary/30"
              )}
              aria-label={getIndicatorAriaLabel?.(index + 1) ?? `Go to card ${index + 1}`}
              onClick={() => scrollToIndex(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
