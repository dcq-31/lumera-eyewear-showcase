"use client";

import { useEffect, useState } from "react";

/**
 * Returns the id of the section currently most "active" relative to the
 * viewport. Sections are considered active when their intersection band sits
 * inside the trigger zone defined by `rootMargin`. When multiple qualify,
 * the one earliest in the provided `ids` order wins (matches DOM order in
 * practice).
 */
export function useActiveSection(
  ids: readonly string[],
  rootMargin = "-35% 0px -55% 0px",
): string | null {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;

    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    const visible = new Map<string, IntersectionObserverEntry>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visible.set(entry.target.id, entry);
          } else {
            visible.delete(entry.target.id);
          }
        }
        // Pick the first id in `ids` order that is currently in the band.
        const next = ids.find((id) => visible.has(id)) ?? null;
        setActive(next);
      },
      { rootMargin, threshold: 0 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids, rootMargin]);

  return active;
}
