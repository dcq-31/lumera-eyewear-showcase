"use client";

import { cn } from "@/lib/utils";

export function SceneFallback({ className }: { className?: string }) {
  return (
    <div className={cn("absolute inset-0 flex items-center justify-center", className)} aria-hidden>
      <svg
        viewBox="0 0 480 200"
        className="w-[80%] max-w-[640px] text-bone/70"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <defs>
          <linearGradient id="lens-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" style={{ stopColor: "var(--color-amber)", stopOpacity: 0.18 }} />
            <stop offset="100%" style={{ stopColor: "var(--color-ink-200)", stopOpacity: 0.35 }} />
          </linearGradient>
        </defs>
        <ellipse cx="140" cy="100" rx="78" ry="56" fill="url(#lens-grad)" />
        <ellipse cx="340" cy="100" rx="78" ry="56" fill="url(#lens-grad)" />
        <ellipse cx="140" cy="100" rx="78" ry="56" />
        <ellipse cx="340" cy="100" rx="78" ry="56" />
        <path d="M218 96 L262 96" />
        <path d="M218 104 L262 104" />
        <path d="M62 88 Q 38 86 22 102" />
        <path d="M418 88 Q 442 86 458 102" />
      </svg>
    </div>
  );
}
