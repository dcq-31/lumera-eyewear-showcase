"use client";

import { useEffect, useRef } from "react";
import { useIsTouch } from "@/hooks/useIsTouch";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function CustomCursor() {
  const isTouch = useIsTouch();
  const reduced = useReducedMotion();
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isTouch || reduced) return;

    const dot = dotRef.current!;
    const ring = ringRef.current!;
    let dx = window.innerWidth / 2;
    let dy = window.innerHeight / 2;
    let rx = dx;
    let ry = dy;
    let raf = 0;
    let hovering = false;
    let scale = 1;
    const TARGET_HOVER = 2.2;
    const TARGET_REST = 1;

    const onMove = (e: PointerEvent) => {
      dx = e.clientX;
      dy = e.clientY;
      dot.style.transform = `translate3d(${dx}px, ${dy}px, 0) translate(-50%, -50%)`;
    };

    const tick = () => {
      rx += (dx - rx) * 0.16;
      ry += (dy - ry) * 0.16;
      const target = hovering ? TARGET_HOVER : TARGET_REST;
      scale += (target - scale) * 0.22;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%) scale(${scale.toFixed(3)})`;
      raf = requestAnimationFrame(tick);
    };

    const onEnter = () => {
      hovering = true;
      ring.classList.add("is-hovering");
    };
    const onLeave = () => {
      hovering = false;
      ring.classList.remove("is-hovering");
    };

    const targets = document.querySelectorAll<HTMLElement>("[data-cursor-hover], a, button");
    targets.forEach((el) => {
      el.addEventListener("pointerenter", onEnter);
      el.addEventListener("pointerleave", onLeave);
    });

    window.addEventListener("pointermove", onMove);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      targets.forEach((el) => {
        el.removeEventListener("pointerenter", onEnter);
        el.removeEventListener("pointerleave", onLeave);
      });
    };
  }, [isTouch, reduced]);

  if (isTouch || reduced) return null;

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[80] h-1.5 w-1.5 rounded-full bg-amber"
        style={{ transform: "translate3d(-100px, -100px, 0)" }}
      />
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[80] h-9 w-9 rounded-full border border-amber/55 transition-[border-color,background-color] duration-300 [&.is-hovering]:border-amber [&.is-hovering]:bg-amber/20"
        style={{ transform: "translate3d(-100px, -100px, 0)" }}
      />
    </>
  );
}
