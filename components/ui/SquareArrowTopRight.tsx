"use client";

import { motion } from "framer-motion";

interface SquareArrowTopRightProps {
  className?: string;
}

export function SquareArrowTopRight({ className = "w-5 h-5" }: SquareArrowTopRightProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Square - static */}
      <rect width="18" height="18" x="3" y="3" rx="2" className="opacity-50 group-hover:opacity-100 transition-opacity" />

      {/* Arrow - animated on parent hover */}
      <g className="opacity-50 group-hover:opacity-100 transition-opacity group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200">
        <path d="M15 9l-6 6" />
        <path d="M15 15V9h-6" />
      </g>
    </svg>
  );
}
