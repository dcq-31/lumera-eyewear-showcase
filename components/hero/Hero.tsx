"use client";

import dynamic from "next/dynamic";
import { useSceneState } from "@/components/three/SceneState";
import { SplitText } from "@/components/motion/SplitText";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { scrollToTarget } from "@/components/motion/SmoothScrollProvider";
import { useInView } from "@/hooks/useInView";
import { useTranslations } from "@/hooks/useTranslations";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const Scene = dynamic(
  () => import(/* webpackPreload: true */ "@/components/three/Scene").then((m) => m.Scene),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-px w-32 overflow-hidden bg-bone/10">
          <div className="h-full w-1/3 animate-pulse bg-amber" />
        </div>
      </div>
    ),
  },
);

export function Hero() {
  const { variant, pointer, scrollProgress } = useSceneState();
  const { ref: canvasRef, inView } = useInView<HTMLDivElement>({ initial: true });
  const t = useTranslations();
  const variantCopy = t.variants.items[variant.id];

  return (
    <section
      id="top"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden pt-32 pb-20 md:pt-36"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_45%,rgba(200,182,144,0.08),transparent_70%)]" />
        <div className="absolute -bottom-40 left-1/2 h-[600px] w-[1200px] -translate-x-1/2 bg-[radial-gradient(ellipse,rgba(200,182,144,0.06),transparent_70%)] blur-3xl" />
      </div>

      <div className="mx-auto flex w-full max-w-[1800px] flex-1 flex-col px-6 md:px-12">
        <div className="grid flex-1 grid-cols-12 items-center gap-y-12">
          <div className="col-span-12 flex flex-col items-start gap-8 md:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-mono-tight flex items-center gap-3 text-[10px] tracking-[0.3em] text-bone-dim uppercase"
            >
              <span className="block h-px w-8 bg-bone-dim/50" />
              {t.hero.eyebrow}
              <span className="text-amber">●</span>
            </motion.div>

            <h1 className="font-display text-[clamp(3.5rem,9.5vw,9rem)] leading-[0.92] font-light tracking-[-0.035em] text-balance">
              <SplitText
                key={`a-${t.hero.headlineA}`}
                text={t.hero.headlineA}
                as="span"
                className="block"
                stagger={0.05}
                delay={0.3}
              />
              <SplitText
                key={`b-${t.hero.headlineB}`}
                text={t.hero.headlineB}
                as="span"
                className="block text-amber italic"
                stagger={0.05}
                delay={0.5}
              />
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.95, ease: [0.16, 1, 0.3, 1] }}
              className="font-sans-tight max-w-md text-base leading-relaxed text-pretty text-bone-dim md:text-lg"
            >
              {t.hero.body}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-6 pt-2"
            >
              <MagneticButton
                className="group font-sans-tight inline-flex items-center gap-3 rounded-full bg-bone px-7 py-4 text-[12px] tracking-[0.22em] text-ink-0 uppercase transition-colors hover:bg-amber-bright"
                onClick={() => scrollToTarget("#preorder")}
              >
                {t.hero.ctaPrimary}
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </MagneticButton>

              <a
                href="#showcase"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToTarget("#showcase");
                }}
                data-cursor-hover
                className="group font-sans-tight inline-flex items-center gap-3 text-[12px] tracking-[0.22em] text-bone-dim uppercase hover:text-bone"
              >
                <span className="relative">
                  {t.hero.ctaSecondary}
                  <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-amber transition-transform duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />
                </span>
              </a>
            </motion.div>
          </div>

          <div
            ref={canvasRef}
            className="relative col-span-12 aspect-[4/3] md:col-span-7 md:aspect-auto md:h-[80vh]"
          >
            <div
              className="absolute inset-0"
              style={{
                WebkitMaskImage:
                  "radial-gradient(ellipse 78% 78% at 50% 52%, #000 55%, transparent 96%)",
                maskImage: "radial-gradient(ellipse 78% 78% at 50% 52%, #000 55%, transparent 96%)",
              }}
            >
              <Scene
                scrollProgress={scrollProgress}
                pointer={pointer}
                frameColor={variant.frameColor}
                lensTint={variant.lensTint}
                cameraZ={5.5}
                intensity={1}
                active={inView}
              />
            </div>

            <div className="font-mono-tight pointer-events-none absolute top-4 left-4 flex flex-col gap-1 text-[10px] tracking-[0.25em] text-bone-dim uppercase">
              <span>{variantCopy.name}</span>
              <span className="text-bone-dim/50">{variantCopy.description}</span>
            </div>

            <div className="font-mono-tight pointer-events-none absolute right-4 bottom-4 text-[10px] tracking-[0.25em] text-bone-dim uppercase">
              {t.hero.weightLabel}
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 1.6 }}
          className="font-mono-tight mt-12 flex items-center justify-between border-t border-bone/10 pt-8 text-[10px] tracking-[0.25em] text-bone-dim/80 uppercase"
        >
          <span>{t.hero.scrollCue}</span>
          <div className="scroll-cue" aria-hidden />
          <span>{t.hero.established}</span>
        </motion.div>
      </div>
    </section>
  );
}
