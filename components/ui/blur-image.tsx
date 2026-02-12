"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function BlurImage({ className, alt, ...props }: ImageProps) {
  const [isLoading, setLoading] = useState(true);

  return (
    <Image
      className={cn(
        "transition-all duration-700 ease-in-out",
        isLoading ? "scale-110 blur-lg" : "scale-100 blur-0",
        className
      )}
      onLoad={() => setLoading(false)}
      alt={alt}
      loading="lazy"
      decoding="async"
      fetchPriority="low"
      {...props}
    />
  );
}
