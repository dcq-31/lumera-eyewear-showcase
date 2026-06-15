"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useTranslations } from "@/hooks/useTranslations";
import { cn } from "@/lib/utils";

type Props = { className?: string };

const EASE = [0.16, 1, 0.3, 1] as const;

export function ThemeToggle({ className }: Props) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const reduced = useReducedMotion();
  const t = useTranslations();

  // next-themes resolves on the client only; render a placeholder until mounted
  // to avoid the wrong icon flashing in.
  useEffect(() => setMounted(true), []);

  const isDark = mounted ? resolvedTheme !== "light" : false;

  const toggle = () => setTheme(isDark ? "light" : "dark");

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? t.chrome.themeToLight : t.chrome.themeToDark}
      aria-pressed={!isDark}
      data-cursor-hover
      className={cn(
        "relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-bone/15 bg-bone/0 text-bone-dim transition-colors duration-300 hover:border-amber hover:text-bone",
        className,
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? "moon" : "sun"}
          initial={reduced ? false : { opacity: 0, rotate: -45, scale: 0.7 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={reduced ? { opacity: 0 } : { opacity: 0, rotate: 45, scale: 0.7 }}
          transition={{ duration: 0.25, ease: EASE }}
          className="inline-flex"
        >
          {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
