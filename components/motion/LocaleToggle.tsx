"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useTranslations } from "@/hooks/useTranslations";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

type Props = { className?: string };

export function LocaleToggle({ className }: Props) {
  const { locale, setLocale } = useLocale();
  const t = useTranslations();
  const reduced = useReducedMotion();

  const next = locale === "es" ? "en" : "es";
  // Show the *other* locale's two-letter code as the toggle label so the
  // button reads as "click to switch to X".
  const label = next.toUpperCase();

  return (
    <button
      type="button"
      onClick={() => setLocale(next)}
      aria-label={t.chrome.langToOther}
      data-cursor-hover
      className={cn(
        "font-mono-tight relative inline-flex h-9 min-w-9 items-center justify-center rounded-full border border-bone/15 bg-bone/0 px-2 text-[10px] tracking-[0.18em] text-bone-dim uppercase transition-colors duration-300 hover:border-amber hover:text-bone",
        className,
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={label}
          initial={reduced ? false : { opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduced ? { opacity: 0 } : { opacity: 0, y: -4 }}
          transition={{ duration: 0.22, ease: EASE }}
        >
          {label}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
