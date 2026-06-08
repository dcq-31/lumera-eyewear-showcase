"use client";

export function scrollToTarget(
  target: string | HTMLElement | number,
  opts: { offset?: number; immediate?: boolean } = {},
) {
  const { offset = -72, immediate = false } = opts;
  if (typeof window === "undefined") return;

  let top: number;
  if (typeof target === "number") {
    top = target + offset;
  } else {
    const el =
      typeof target === "string"
        ? target === "#top"
          ? null
          : document.querySelector<HTMLElement>(target)
        : target;
    if (!el && typeof target === "string" && target !== "#top") return;
    top = el ? el.getBoundingClientRect().top + window.scrollY + offset : 0;
  }

  window.scrollTo({ top, behavior: immediate ? "auto" : "smooth" });
}

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
