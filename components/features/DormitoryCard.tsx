"use client";

import type { StaticImageData } from "next/image";
import { BlurImage } from "@/components/ui/blur-image";
import { cn } from "@/lib/utils";

export interface DormitoryCardData {
  title: string;
  price: string;
  features: string[];
  image: StaticImageData;
}

interface DormitoryCardProps {
  dorm: DormitoryCardData;
  compact?: boolean;
  className?: string;
}

export function DormitoryCard({ dorm, compact = false, className }: DormitoryCardProps) {
  return (
    <article
      className={cn(
        "bg-white border border-border/70 overflow-hidden transition-all duration-300",
        "shadow-[0_18px_40px_-28px_rgba(15,23,42,0.45)] hover:shadow-[0_22px_50px_-30px_rgba(15,23,42,0.55)]",
        compact ? "rounded-[1.35rem]" : "rounded-3xl group",
        className
      )}
    >
      <div className={cn("overflow-hidden relative", compact ? "h-44" : "h-64")}>
        <BlurImage
          src={dorm.image}
          alt={dorm.title}
          placeholder="blur"
          className={cn(
            "w-full h-full object-cover",
            compact ? "" : "group-hover:scale-105 transition-transform duration-700"
          )}
        />
        <div
          className={cn(
            "absolute bg-black/70 backdrop-blur-md text-white rounded-full font-medium z-10",
            compact ? "bottom-3 right-3 px-2.5 py-0.5 text-xs" : "bottom-4 right-4 px-3 py-1 text-sm"
          )}
        >
          {dorm.price}
        </div>
      </div>
      <div className={compact ? "p-4" : "p-6"}>
        <h3 className={cn("font-bold", compact ? "text-lg mb-3" : "text-xl mb-4")}>{dorm.title}</h3>
        <ul className={cn(compact ? "space-y-1.5" : "space-y-2")}>
          {dorm.features.map((feature) => (
            <li
              key={feature}
              className="flex items-center gap-2 text-sm text-muted-foreground"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
