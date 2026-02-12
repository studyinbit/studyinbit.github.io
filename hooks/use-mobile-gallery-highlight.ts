import { useCallback, useEffect, useRef, useState, type TouchEvent } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

type GalleryItemElement = HTMLElement | null;
type PositionedItem = {
  index: number;
  top: number;
  bottom: number;
  left: number;
};
type PositionedRow = {
  top: number;
  bottom: number;
  items: PositionedItem[];
};

const ROW_GROUP_THRESHOLD = 36;
const NAV_SAFE_GAP = 12;
const FOCUS_VIEWPORT_RATIO = 0.35;
const TAP_MOVE_THRESHOLD = 10;
const CLICK_SUPPRESS_MS = 400;
const MANUAL_SELECTION_SCROLL_UNLOCK_PX = 96;

export function useMobileGalleryHighlight(itemCount: number) {
  const isMobile = useIsMobile();
  const [activeIndex, setActiveIndex] = useState(0);
  const itemRefs = useRef<GalleryItemElement[]>([]);
  const rafRef = useRef<number | null>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const touchMovedRef = useRef(false);
  const suppressClickUntilRef = useRef(0);
  const manualLockScrollYRef = useRef<number | null>(null);
  const normalizedActiveIndex = itemCount <= 0 ? 0 : Math.min(activeIndex, itemCount - 1);

  const setItemRef = useCallback((index: number, node: GalleryItemElement) => {
    itemRefs.current[index] = node;
  }, []);

  const measureClosestItem = useCallback(() => {
    if (!isMobile || itemCount <= 1) return;

    const nav = document.querySelector("nav.fixed") as HTMLElement | null;
    const navBottom = nav?.getBoundingClientRect().bottom ?? 0;
    const viewportTop = navBottom + NAV_SAFE_GAP;
    const absoluteScrollY = window.scrollY;

    if (manualLockScrollYRef.current !== null) {
      const deltaFromManualSelection = Math.abs(absoluteScrollY - manualLockScrollYRef.current);
      if (deltaFromManualSelection < MANUAL_SELECTION_SCROLL_UNLOCK_PX) {
        return;
      }
      manualLockScrollYRef.current = null;
    }

    const focusY = absoluteScrollY + viewportTop + Math.max(window.innerHeight - viewportTop, 1) * FOCUS_VIEWPORT_RATIO;

    const positionedItems: PositionedItem[] = [];
    itemRefs.current.forEach((item, index) => {
      if (!item) return;
      const rect = item.getBoundingClientRect();
      positionedItems.push({
        index,
        top: rect.top + absoluteScrollY,
        bottom: rect.bottom + absoluteScrollY,
        left: rect.left,
      });
    });
    if (positionedItems.length === 0) return;

    const topSorted = [...positionedItems].sort((a, b) => {
      if (Math.abs(a.top - b.top) > 1) return a.top - b.top;
      return a.left - b.left;
    });

    const rows: PositionedRow[] = [];
    topSorted.forEach((item) => {
      const lastRow = rows.at(-1);
      if (!lastRow) {
        rows.push({ top: item.top, bottom: item.bottom, items: [item] });
        return;
      }
      if (Math.abs(item.top - lastRow.top) <= ROW_GROUP_THRESHOLD) {
        lastRow.items.push(item);
        lastRow.bottom = Math.max(lastRow.bottom, item.bottom);
        return;
      }
      rows.push({ top: item.top, bottom: item.bottom, items: [item] });
    });

    rows.forEach((row) => {
      row.items.sort((a, b) => a.left - b.left);
    });
    const readingOrder = rows.flatMap((row) => row.items.map((item) => item.index));

    if (rows.length === 0 || readingOrder.length === 0) return;

    let rowIndex = rows.length - 1;
    if (focusY <= rows[0]!.top) {
      rowIndex = 0;
    } else {
      for (let i = 0; i < rows.length; i += 1) {
        const row = rows[i]!;
        const nextRowTop = rows[i + 1]?.top ?? row.bottom;
        const end = Math.max(nextRowTop, row.top + 1);
        if (focusY < end) {
          rowIndex = i;
          break;
        }
      }
    }

    const activeRow = rows[rowIndex]!;
    const nextRowTop = rows[rowIndex + 1]?.top ?? activeRow.bottom;
    const rowSpan = Math.max(nextRowTop - activeRow.top, 1);
    const rawProgress = (focusY - activeRow.top) / rowSpan;
    const progress = Math.max(0, Math.min(rawProgress, 0.999999));
    const slot = Math.min(
      activeRow.items.length - 1,
      Math.floor(progress * activeRow.items.length)
    );
    const targetIndex = activeRow.items[slot]?.index;
    if (targetIndex === undefined) return;

    const currentPosition = readingOrder.indexOf(normalizedActiveIndex);
    const targetPosition = readingOrder.indexOf(targetIndex);
    if (targetPosition === -1) return;

    let nextIndex = targetIndex;
    if (currentPosition !== -1 && currentPosition !== targetPosition) {
      const stepPosition =
        targetPosition > currentPosition ? currentPosition + 1 : currentPosition - 1;
      nextIndex = readingOrder[stepPosition] ?? targetIndex;
    }

    setActiveIndex((current) => (current === nextIndex ? current : nextIndex));
  }, [isMobile, itemCount, normalizedActiveIndex]);

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
    (index: number, options?: { lockScrollUntilThreshold?: boolean }) => {
      if (!isMobile || itemCount <= 0) return;
      const clampedIndex = Math.max(0, Math.min(index, itemCount - 1));
      if (options?.lockScrollUntilThreshold) {
        manualLockScrollYRef.current = window.scrollY;
      }
      setActiveIndex(clampedIndex);
    },
    [isMobile, itemCount]
  );

  const onItemTouchStart = useCallback(() => {
    touchMovedRef.current = false;
    touchStartRef.current = null;
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

    if (distance > TAP_MOVE_THRESHOLD) {
      touchMovedRef.current = true;
    }
  }, []);

  const onItemTouchEnd = useCallback(
    (index: number) => {
      if (!touchMovedRef.current) {
        activateItem(index, { lockScrollUntilThreshold: true });
      } else {
        suppressClickUntilRef.current = Date.now() + CLICK_SUPPRESS_MS;
      }
      touchMovedRef.current = false;
      touchStartRef.current = null;
    },
    [activateItem]
  );

  const onItemTouchCancel = useCallback(() => {
    touchMovedRef.current = false;
    touchStartRef.current = null;
    suppressClickUntilRef.current = Date.now() + CLICK_SUPPRESS_MS;
  }, []);

  const onItemClick = useCallback(
    (index: number) => {
      if (isMobile && Date.now() < suppressClickUntilRef.current) {
        return;
      }
      activateItem(index, { lockScrollUntilThreshold: true });
    },
    [activateItem, isMobile]
  );

  return {
    isMobile,
    activeIndex: normalizedActiveIndex,
    setItemRef,
    activateItem,
    onItemClick,
    onItemTouchStart,
    onItemTouchMove,
    onItemTouchEnd,
    onItemTouchCancel,
  };
}
