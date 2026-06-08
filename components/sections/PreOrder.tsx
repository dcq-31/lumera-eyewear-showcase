"use client";

import { ArrowUpRight } from "lucide-react";
import { SplitText } from "@/components/motion/SplitText";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { Reveal } from "@/components/motion/Reveal";
import { useTranslations } from "@/hooks/useTranslations";

const CONTACT_EMAIL = "atelier@lumera.example";

export function PreOrder() {
  const t = useTranslations();
  return (
    <section
      id="preorder"
      className="relative isolate overflow-hidden border-y border-bone/10 py-32 md:py-56"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(200,182,144,0.12),transparent_70%)]" />
        <div
          aria-hidden
          className="absolute -bottom-40 left-1/2 h-[700px] w-[1400px] -translate-x-1/2 bg-[radial-gradient(ellipse,rgba(200,182,144,0.08),transparent_70%)] blur-3xl"
        />
      </div>

      <div className="mx-auto w-full max-w-[1400px] px-6 text-center md:px-12">
        <div className="font-mono-tight mb-6 flex items-center justify-center gap-3 text-[10px] tracking-[0.3em] text-amber uppercase">
          <span className="block h-px w-8 bg-amber/60" />
          {t.preorder.eyebrow}
          <span className="block h-px w-8 bg-amber/60" />
        </div>

        <SplitText
          key={t.preorder.heading}
          text={t.preorder.heading}
          as="h2"
          className="font-display text-[clamp(3rem,9vw,8rem)] leading-[0.92] font-light tracking-[-0.035em] text-balance"
          stagger={0.05}
        />

        <Reveal delay={0.4} className="mx-auto mt-8 max-w-xl">
          <p className="font-sans-tight text-base leading-relaxed text-pretty text-bone-dim md:text-lg">
            {t.preorder.intro}
          </p>
        </Reveal>

        <Reveal delay={0.6} className="mt-14 flex flex-wrap items-center justify-center gap-6">
          <MagneticButton className="group font-sans-tight inline-flex items-center gap-3 rounded-full bg-bone px-10 py-5 text-[13px] tracking-[0.24em] text-ink-0 uppercase transition-colors hover:bg-amber-bright">
            {t.preorder.cta}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </MagneticButton>

          <a
            href={`mailto:${CONTACT_EMAIL}`}
            data-cursor-hover
            className="group font-sans-tight inline-flex items-center gap-3 text-[13px] tracking-[0.24em] text-bone uppercase hover:text-amber"
          >
            <span className="relative">
              {CONTACT_EMAIL}
              <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-100 bg-bone/40 transition-transform duration-500 group-hover:bg-amber" />
            </span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
