import React from "react";
import { cn } from "@/lib/utils";

export interface SquareArrowTopRightProps extends React.SVGProps<SVGSVGElement> {
  /**
   * The width and height of the icon in pixels.
   * @default 24
   */
  size?: number | string;
  /**
   * The thickness of the stroke.
   * @default 3
   */
  strokeWidth?: number;
}

export function SquareArrowTopRight({
  size = 24,
  strokeWidth = 3,
  className,
  ...props
}: SquareArrowTopRightProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(className)}
      {...props}
    >
      <path
        d="M2 3H29V30"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2 30L29 3"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
