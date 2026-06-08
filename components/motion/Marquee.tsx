"use client";

import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type MarqueeProps = {
  items: string[];
  duration?: number;
  className?: string;
  itemClassName?: string;
  separator?: string;
};

export function Marquee({
  items,
  duration = 40,
  className,
  itemClassName,
  separator = "—",
}: MarqueeProps) {
  const reduced = useReducedMotion();

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      style={{ ["--duration" as string]: `${duration}s` }}
    >
      <div
        className={cn(
          "flex w-max items-center gap-12 whitespace-nowrap",
          !reduced && "marquee-track",
        )}
      >
        {[...items, ...items].map((label, i) => (
          <div key={i} className={cn("flex items-center gap-12", itemClassName)}>
            <span>{label}</span>
            <span aria-hidden className="text-bone-dim/40">
              {separator}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
