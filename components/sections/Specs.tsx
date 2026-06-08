"use client";

import { SplitText } from "@/components/motion/SplitText";
import { Reveal } from "@/components/motion/Reveal";
import { useTranslations } from "@/hooks/useTranslations";

export function Specs() {
  const t = useTranslations();
  return (
    <section id="specs" className="relative py-32 md:py-48">
      <div className="hairline absolute inset-x-0 top-0" />

      <div className="mx-auto w-full max-w-[1800px] px-6 md:px-12">
        <div className="grid grid-cols-12 gap-y-16">
          <div className="col-span-12 md:col-span-4">
            <div className="sticky top-32 flex flex-col gap-6">
              <div className="font-mono-tight flex items-center gap-3 text-[10px] tracking-[0.3em] text-bone-dim uppercase">
                <span className="block h-px w-8 bg-bone-dim/40" />
                {t.specs.eyebrow}
              </div>
              <SplitText
                key={t.specs.heading}
                text={t.specs.heading}
                as="h2"
                className="font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.95] font-light tracking-[-0.028em] text-balance"
                stagger={0.04}
              />
              <p className="font-sans-tight max-w-xs text-[15px] leading-relaxed text-pretty text-bone-dim">
                {t.specs.intro}
              </p>
            </div>
          </div>

          <div className="col-span-12 md:col-span-7 md:col-start-6">
            <dl className="border-t border-bone/15">
              {t.specs.rows.map(([label, value], i) => (
                <Reveal key={label} delay={i * 0.04}>
                  <div className="group flex items-baseline justify-between gap-6 border-b border-bone/10 py-5 transition-colors hover:border-amber/40">
                    <dt className="font-mono-tight text-[11px] tracking-[0.22em] text-bone-dim uppercase transition-colors group-hover:text-bone">
                      {label}
                    </dt>
                    <dd className="text-right font-display text-[18px] font-light tracking-[-0.01em] text-bone md:text-[22px]">
                      {value}
                    </dd>
                  </div>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
