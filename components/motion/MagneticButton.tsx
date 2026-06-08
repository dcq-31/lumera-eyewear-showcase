"use client";

import { useRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useIsTouch } from "@/hooks/useIsTouch";
import { cn } from "@/lib/utils";

type MagneticButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  strength?: number;
  children: ReactNode;
};

export function MagneticButton({
  children,
  className,
  strength = 0.35,
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const rectRef = useRef<DOMRect | null>(null);
  const reduced = useReducedMotion();
  const isTouch = useIsTouch();

  const onEnter = () => {
    if (reduced || isTouch || !ref.current) return;
    rectRef.current = ref.current.getBoundingClientRect();
  };

  const onMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (reduced || isTouch || !ref.current || !labelRef.current) return;
    const rect = rectRef.current ?? ref.current.getBoundingClientRect();
    rectRef.current = rect;
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    ref.current.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    labelRef.current.style.transform = `translate(${x * strength * 0.6}px, ${y * strength * 0.6}px)`;
  };

  const onLeave = () => {
    rectRef.current = null;
    if (!ref.current || !labelRef.current) return;
    ref.current.style.transform = "translate(0,0)";
    labelRef.current.style.transform = "translate(0,0)";
  };

  return (
    <button
      ref={ref}
      onPointerEnter={onEnter}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      data-cursor-hover
      className={cn(
        "group relative inline-flex items-center justify-center gap-2 transition-transform duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] will-change-transform",
        className,
      )}
      {...props}
    >
      <span
        ref={labelRef}
        className="relative inline-flex items-center gap-2 transition-transform duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]"
      >
        {children}
      </span>
    </button>
  );
}
