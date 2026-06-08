"use client";

import { useEffect, useMemo, useState, type MouseEvent } from "react";
import { NAV_LINKS } from "@/lib/constants";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { ThemeToggle } from "@/components/motion/ThemeToggle";
import { LocaleToggle } from "@/components/motion/LocaleToggle";
import { scrollToTarget } from "@/components/motion/SmoothScrollProvider";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useTranslations } from "@/hooks/useTranslations";
import { cn } from "@/lib/utils";

function handleAnchor(e: MouseEvent<HTMLAnchorElement>) {
  const href = e.currentTarget.getAttribute("href");
  if (!href || !href.startsWith("#")) return;
  e.preventDefault();
  scrollToTarget(href === "#top" ? 0 : href);
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const t = useTranslations();
  const sectionIds = useMemo(() => NAV_LINKS.map((l) => l.href.slice(1)), []);
  const active = useActiveSection(sectionIds);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 right-0 left-0 z-50 transition-all duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]",
        scrolled ? "py-3" : "py-6",
      )}
    >
      <div
        className={cn(
          "mx-auto flex items-center justify-between px-6 transition-all duration-500 md:px-12",
          scrolled ? "max-w-[1400px]" : "max-w-[1800px]",
        )}
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-full">
          <div className="glass-panel h-full w-full border-x-0 border-t-0" />
        </div>

        <a
          href="#top"
          onClick={handleAnchor}
          className="font-display text-lg font-medium tracking-[0.25em] text-bone transition-colors hover:text-amber-bright"
          data-cursor-hover
        >
          LUM&Eacute;RA
        </a>

        <nav className="hidden gap-10 md:flex">
          {NAV_LINKS.map((link) => {
            const isActive = active === link.href.slice(1);
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={handleAnchor}
                data-cursor-hover
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "group font-sans-tight relative text-[11px] tracking-[0.22em] uppercase transition-colors",
                  isActive ? "text-bone" : "text-bone-dim hover:text-bone",
                )}
              >
                {t.nav[link.key]}
                <span
                  className={cn(
                    "absolute -bottom-1 left-0 h-px bg-amber transition-all duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]",
                    isActive ? "w-full" : "w-0 group-hover:w-full",
                  )}
                />
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <LocaleToggle />
          <ThemeToggle />
          <MagneticButton
            className="font-sans-tight rounded-full border border-bone/20 bg-bone/0 px-5 py-2.5 text-[11px] tracking-[0.22em] text-bone uppercase hover:border-amber hover:bg-bone hover:text-ink-0"
            onClick={() => scrollToTarget("#preorder")}
            strength={0.25}
          >
            {t.nav.preorder}
          </MagneticButton>
        </div>
      </div>
    </header>
  );
}
