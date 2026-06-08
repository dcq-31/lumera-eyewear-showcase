"use client";

import { scrollToTarget } from "@/components/motion/SmoothScrollProvider";
import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
};

/**
 * Anchor link that smooth-scrolls to in-page section ids via the shared
 * scrollToTarget helper. Used in the Footer and other server components
 * that need a tiny client island for the onClick.
 */
export function AnchorLink({ href, onClick, children, ...rest }: Props) {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented) return;
    if (!href.startsWith("#")) return;
    e.preventDefault();
    scrollToTarget(href === "#top" ? 0 : href);
  };
  return (
    <a href={href} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}
