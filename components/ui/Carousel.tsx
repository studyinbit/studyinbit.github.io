"use client";

import { useEffect, useMemo, useRef, useState, Children, type ReactNode } from "react";
import { motion, type PanInfo, useMotionValue, useTransform } from "framer-motion";

const DRAG_BUFFER = 0;
const VELOCITY_THRESHOLD = 500;
const GAP = 16;
const SPRING_OPTIONS = { type: "spring" as const, stiffness: 300, damping: 30 };

interface CarouselSlideProps {
  children: ReactNode;
  index: number;
  itemWidth: number;
  trackItemOffset: number;
  x: ReturnType<typeof useMotionValue>;
  transition: typeof SPRING_OPTIONS | { duration: number };
}

function CarouselSlide({
  children,
  index,
  itemWidth,
  trackItemOffset,
  x,
  transition,
}: CarouselSlideProps) {
  const range = [
    -(index + 1) * trackItemOffset,
    -index * trackItemOffset,
    -(index - 1) * trackItemOffset,
  ];
  const outputRange = [90, 0, -90];
  const rotateY = useTransform(x, range, outputRange, { clamp: false });

  return (
    <motion.div
      className="relative shrink-0 overflow-hidden cursor-grab active:cursor-grabbing rounded-2xl"
      style={{
        width: itemWidth,
        height: "100%",
        rotateY,
      }}
      transition={transition}
    >
      {children}
    </motion.div>
  );
}

export interface CarouselProps {
  children: ReactNode;
  baseWidth?: number;
  autoplay?: boolean;
  autoplayDelay?: number;
  pauseOnHover?: boolean;
  loop?: boolean;
}

export default function Carousel({
  children,
  baseWidth = 300,
  autoplay = false,
  autoplayDelay = 3000,
  pauseOnHover = false,
  loop = false,
}: CarouselProps) {
  const containerPadding = 16;
  const itemWidth = baseWidth - containerPadding * 2;
  const trackItemOffset = itemWidth + GAP;

  const childArray = Children.toArray(children);
  const itemCount = childArray.length;

  const slidesForRender = useMemo(() => {
    if (!loop || itemCount === 0) return childArray;
    return [childArray[itemCount - 1], ...childArray, childArray[0]];
  }, [childArray, loop, itemCount]);

  const [position, setPosition] = useState(loop ? 1 : 0);
  const x = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isJumping, setIsJumping] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  // Sync with external systems: mouse hover state for autoplay pause
  useEffect(() => {
    if (!pauseOnHover || !containerRef.current) return;
    const container = containerRef.current;
    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);
    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [pauseOnHover]);

  // Autoplay timer — external system sync
  useEffect(() => {
    if (!autoplay || slidesForRender.length <= 1) return;
    if (pauseOnHover && isHovered) return;

    const timer = setInterval(() => {
      setPosition((prev) => Math.min(prev + 1, slidesForRender.length - 1));
    }, autoplayDelay);

    return () => clearInterval(timer);
  }, [autoplay, autoplayDelay, isHovered, pauseOnHover, slidesForRender.length]);

  const effectiveTransition = isJumping ? { duration: 0 } : SPRING_OPTIONS;

  const handleAnimationComplete = () => {
    if (!loop || slidesForRender.length <= 1) {
      setIsAnimating(false);
      return;
    }
    const lastCloneIndex = slidesForRender.length - 1;

    if (position === lastCloneIndex) {
      setIsJumping(true);
      const target = 1;
      setPosition(target);
      x.set(-target * trackItemOffset);
      requestAnimationFrame(() => {
        setIsJumping(false);
        setIsAnimating(false);
      });
      return;
    }

    if (position === 0) {
      setIsJumping(true);
      const target = itemCount;
      setPosition(target);
      x.set(-target * trackItemOffset);
      requestAnimationFrame(() => {
        setIsJumping(false);
        setIsAnimating(false);
      });
      return;
    }

    setIsAnimating(false);
  };

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const { offset, velocity } = info;
    const direction =
      offset.x < -DRAG_BUFFER || velocity.x < -VELOCITY_THRESHOLD
        ? 1
        : offset.x > DRAG_BUFFER || velocity.x > VELOCITY_THRESHOLD
          ? -1
          : 0;

    if (direction === 0) return;

    setPosition((prev) => {
      const next = prev + direction;
      const max = slidesForRender.length - 1;
      return Math.max(0, Math.min(next, max));
    });
  };

  const dragProps = loop
    ? {}
    : {
        dragConstraints: {
          left: -trackItemOffset * Math.max(slidesForRender.length - 1, 0),
          right: 0,
        },
      };

  const activeIndex =
    itemCount === 0
      ? 0
      : loop
        ? (position - 1 + itemCount) % itemCount
        : Math.min(position, itemCount - 1);

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden rounded-2xl"
      style={{ width: `${baseWidth}px` }}
    >
      <motion.div
        className="flex"
        drag={isAnimating ? false : "x"}
        {...dragProps}
        style={{
          width: itemWidth,
          gap: `${GAP}px`,
          perspective: 1000,
          perspectiveOrigin: `${position * trackItemOffset + itemWidth / 2}px 50%`,
          x,
          touchAction: "pan-y",
        }}
        onDragEnd={handleDragEnd}
        animate={{ x: -(position * trackItemOffset) }}
        transition={effectiveTransition}
        onAnimationStart={() => setIsAnimating(true)}
        onAnimationComplete={handleAnimationComplete}
      >
        {slidesForRender.map((child, index) => (
          <CarouselSlide
            key={index}
            index={index}
            itemWidth={itemWidth}
            trackItemOffset={trackItemOffset}
            x={x}
            transition={effectiveTransition}
          >
            {child}
          </CarouselSlide>
        ))}
      </motion.div>

      {/* Dot indicators */}
      {itemCount > 1 && (
        <div className="flex w-full justify-center mt-4">
          <div className="flex gap-2.5 items-center">
            {childArray.map((_, index) => (
              <button
                key={index}
                className={`rounded-full transition-all duration-200 ${
                  activeIndex === index
                    ? "bg-primary w-3 h-3"
                    : "bg-primary/30 w-2.5 h-2.5"
                }`}
                onClick={() => setPosition(loop ? index + 1 : index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
