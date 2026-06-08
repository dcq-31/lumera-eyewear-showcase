"use client";

import { motion, type Variants } from "framer-motion";
import { SplitText } from "@/components/motion/SplitText";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useTranslations } from "@/hooks/useTranslations";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(6px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1, delay: i * 0.08, ease: EASE },
  }),
};

export function Features() {
  const reduced = useReducedMotion();
  const t = useTranslations();

  return (
    <section id="features" className="relative py-32 md:py-48">
      <div className="mx-auto w-full max-w-[1800px] px-6 md:px-12">
        <div className="grid grid-cols-12 items-end gap-y-12 pb-20">
          <div className="col-span-12 md:col-span-7">
            <div className="font-mono-tight mb-6 flex items-center gap-3 text-[10px] tracking-[0.3em] text-bone-dim uppercase">
              <span className="block h-px w-8 bg-bone-dim/40" />
              {t.features.eyebrow}
            </div>
            <SplitText
              key={t.features.heading}
              text={t.features.heading}
              as="h2"
              className="font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.95] font-light tracking-[-0.028em] text-balance"
              stagger={0.04}
            />
          </div>
          <p className="font-sans-tight col-span-12 max-w-md text-base leading-relaxed text-pretty text-bone-dim md:col-span-5 md:col-start-8 md:text-lg">
            {t.features.intro}
          </p>
        </div>

        <div className="hairline mb-20" />

        <div className="grid grid-cols-1 gap-[1px] bg-bone/10 md:grid-cols-2 lg:grid-cols-4">
          {t.features.items.map((feature, i) => (
            <motion.article
              key={feature.label}
              custom={i}
              variants={cardVariants}
              initial={reduced ? undefined : "hidden"}
              whileInView={reduced ? undefined : "visible"}
              viewport={{ once: true, margin: "-15% 0px" }}
              className={cn(
                "group relative flex h-full flex-col justify-between gap-10 bg-ink-0 p-8 transition-colors duration-500 hover:bg-ink-50 md:p-10 lg:min-h-[460px]",
              )}
              data-cursor-hover
            >
              <div className="absolute inset-x-0 top-0 h-px bg-amber/0 transition-colors duration-500 group-hover:bg-amber" />

              <div className="font-mono-tight flex items-start justify-between text-[10px] tracking-[0.3em] text-bone-dim uppercase">
                <span>{feature.label}</span>
                <span className="opacity-60">{feature.statLabel}</span>
              </div>

              <div className="flex flex-1 items-end">
                <div className="flex items-baseline gap-2 font-display leading-none font-light tracking-[-0.04em] text-bone">
                  <span className="text-[clamp(4rem,8vw,7rem)]">{feature.stat}</span>
                  <span className="font-sans-tight text-[14px] font-normal tracking-normal text-bone-dim">
                    {feature.unit}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-4 border-t border-bone/10 pt-6">
                <h3 className="font-display text-[24px] leading-[1.1] font-light tracking-[-0.02em] text-balance md:text-[28px]">
                  {feature.title}
                </h3>
                <p className="font-sans-tight text-[14px] leading-relaxed text-pretty text-bone-dim">
                  {feature.body}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
