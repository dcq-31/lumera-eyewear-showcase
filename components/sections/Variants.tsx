"use client";

import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import { useSceneState } from "@/components/three/SceneState";
import { SceneFallback } from "@/components/three/SceneFallback";
import { SplitText } from "@/components/motion/SplitText";
import { useInView } from "@/hooks/useInView";
import { useTranslations } from "@/hooks/useTranslations";
import { cn } from "@/lib/utils";

const Scene = dynamic(() => import("@/components/three/Scene").then((m) => m.Scene), {
  ssr: false,
});

export function Variants() {
  const { variant, setVariantById, variants, pointer, scrollProgress } = useSceneState();
  const t = useTranslations();
  const activeCopy = t.variants.items[variant.id];
  const { ref: canvasRef, inView } = useInView<HTMLDivElement>({
    rootMargin: "400px",
  });

  return (
    <section id="variants" className="relative overflow-hidden py-32 md:py-48">
      <div className="hairline absolute inset-x-0 top-0" />

      <div className="mx-auto w-full max-w-[1800px] px-6 md:px-12">
        <div className="grid grid-cols-12 items-center gap-y-16">
          <div className="col-span-12 flex flex-col gap-8 md:col-span-5">
            <div className="font-mono-tight flex items-center gap-3 text-[10px] tracking-[0.3em] text-bone-dim uppercase">
              <span className="block h-px w-8 bg-bone-dim/40" />
              {t.variants.eyebrow}
            </div>
            <SplitText
              key={t.variants.heading}
              text={t.variants.heading}
              as="h2"
              className="font-display text-[clamp(2.5rem,5.5vw,5rem)] leading-[0.95] font-light tracking-[-0.028em] text-balance"
              stagger={0.04}
            />
            <p className="font-sans-tight max-w-md text-base leading-relaxed text-pretty text-bone-dim md:text-lg">
              {t.variants.intro}
            </p>

            <div className="mt-4 flex flex-col gap-3">
              {variants.map((v) => {
                const active = v.id === variant.id;
                const copy = t.variants.items[v.id];
                return (
                  <button
                    key={v.id}
                    onClick={() => setVariantById(v.id)}
                    data-cursor-hover
                    className={cn(
                      "group flex items-center gap-5 border-b border-bone/10 py-4 text-left transition-colors hover:border-amber/40",
                      active && "border-amber/60",
                    )}
                    aria-pressed={active}
                  >
                    <span
                      className={cn(
                        "relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]",
                        active ? "border-amber" : "border-bone/20 group-hover:border-bone/40",
                      )}
                    >
                      <span
                        className="block h-5 w-5 rounded-full"
                        style={{
                          background: `radial-gradient(circle at 32% 28%, ${v.accent} 0%, ${v.frameColor} 55%, color-mix(in srgb, ${v.frameColor} 55%, #000) 100%)`,
                          boxShadow:
                            "inset 0 1px 1px rgba(255,255,255,0.18), inset 0 -2px 3px rgba(0,0,0,0.35), 0 1px 2px rgba(0,0,0,0.3)",
                        }}
                      />
                      {active && (
                        <motion.span
                          layoutId="variant-ring"
                          className="absolute inset-0 rounded-full ring-1 ring-amber"
                          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        />
                      )}
                    </span>
                    <span className="flex flex-1 items-baseline justify-between gap-4">
                      <span
                        className={cn(
                          "font-display text-[22px] font-light tracking-[-0.01em] transition-colors",
                          active ? "text-bone" : "text-bone-dim group-hover:text-bone",
                        )}
                      >
                        {copy.name}
                      </span>
                      <span className="font-mono-tight text-[10px] tracking-[0.25em] text-bone-dim/70 uppercase">
                        {copy.description}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div
            ref={canvasRef}
            className="relative col-span-12 aspect-[4/3] md:col-span-7 md:aspect-auto md:h-[70vh]"
          >
            {inView ? (
              <Scene
                scrollProgress={scrollProgress}
                pointer={pointer}
                frameColor={variant.frameColor}
                lensTint={variant.lensTint}
                cameraZ={5.6}
                intensity={1.05}
                active={inView}
              />
            ) : (
              <SceneFallback />
            )}
            <AnimatePresence mode="wait">
              <motion.div
                key={variant.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="font-mono-tight pointer-events-none absolute right-6 bottom-6 left-6 flex items-end justify-between text-[10px] tracking-[0.25em] text-bone-dim uppercase"
              >
                <span className="text-bone">{activeCopy.name}</span>
                <span>
                  {t.variants.refPrefix} LM-{variant.id.slice(0, 3).toUpperCase()}-04
                </span>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
