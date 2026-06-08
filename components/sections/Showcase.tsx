"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useSceneState } from "@/components/three/SceneState";
import { SceneFallback } from "@/components/three/SceneFallback";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useInView } from "@/hooks/useInView";
import { useTranslations } from "@/hooks/useTranslations";
import { cn } from "@/lib/utils";

const Scene = dynamic(() => import("@/components/three/Scene").then((m) => m.Scene), {
  ssr: false,
});

export function Showcase() {
  const { variant, pointer, scrollProgress, pinnedRotation, pinnedProgress } = useSceneState();
  const sectionRef = useRef<HTMLElement>(null);
  const beatsRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef<HTMLDivElement>(null);
  const [activeBeat, setActiveBeat] = useState(0);
  const reduced = useReducedMotion();
  const t = useTranslations();
  const beatItems = t.showcase.beats;
  const { ref: canvasRef, inView } = useInView<HTMLDivElement>({
    rootMargin: "400px",
  });

  useEffect(() => {
    if (reduced) return;
    const section = sectionRef.current;
    const beats = beatsRef.current?.querySelectorAll<HTMLDivElement>("[data-beat]");
    if (!section || !beats) return;

    let cancelled = false;
    let revert: (() => void) | undefined;

    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=1800",
            scrub: 0.3,
            pin: true,
            anticipatePin: 1,
            onUpdate: (self) => {
              pinnedRotation.current = self.progress * Math.PI * 1.4;
              pinnedProgress.current = self.progress;
              if (progressRef.current) {
                progressRef.current.style.transform = `scaleY(${self.progress})`;
              }
              const next = Math.min(
                beatItems.length - 1,
                Math.floor(self.progress * beatItems.length),
              );
              setActiveBeat(next);
            },
          },
        });

        beats.forEach((beat, i) => {
          const start = i / beatItems.length;
          const peak = start + 1 / beatItems.length / 2;
          const end = start + 1 / beatItems.length;
          tl.fromTo(
            beat,
            { opacity: 0, y: 40, filter: "blur(8px)" },
            { opacity: 1, y: 0, filter: "blur(0px)", duration: peak - start, ease: "power2.out" },
            start,
          ).to(
            beat,
            { opacity: 0, y: -40, filter: "blur(8px)", duration: end - peak, ease: "power2.in" },
            peak,
          );
        });
      }, section);

      revert = () => ctx.revert();
    })();

    return () => {
      cancelled = true;
      revert?.();
      pinnedRotation.current = 0;
      pinnedProgress.current = 0;
    };
  }, [reduced, pinnedRotation, pinnedProgress, beatItems.length]);

  return (
    <section
      id="showcase"
      ref={sectionRef}
      className="relative isolate h-[100svh] overflow-hidden bg-ink-0"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,rgba(200,182,144,0.06),transparent_70%)]" />
      </div>

      <div className="absolute top-1/2 left-6 z-10 hidden -translate-y-1/2 flex-col items-center gap-6 md:left-12 md:flex">
        <div className="font-mono-tight text-[10px] tracking-[0.3em] text-bone-dim/60 uppercase">
          {t.showcase.eyebrow}
        </div>
        <div className="relative h-40 w-px overflow-hidden bg-bone/10">
          <div
            ref={progressRef}
            className="absolute inset-0 origin-top bg-amber"
            style={{ transform: "scaleY(0)" }}
          />
        </div>
        <div
          ref={indexRef}
          className="font-mono-tight text-[10px] tracking-[0.25em] text-bone-dim uppercase tabular-nums"
        >
          {String(activeBeat + 1).padStart(2, "0")} / {String(beatItems.length).padStart(2, "0")}
        </div>
      </div>

      <div className="relative mx-auto grid h-full w-full max-w-[1800px] grid-cols-12 items-center gap-x-12 px-6 lg:gap-x-20 lg:px-20">
        <div
          ref={canvasRef}
          className="relative col-span-12 aspect-[4/3] lg:col-span-7 lg:col-start-2 lg:aspect-auto lg:h-[88svh]"
        >
          {inView ? (
            <Scene
              scrollProgress={scrollProgress}
              pointer={pointer}
              frameColor={variant.frameColor}
              lensTint={variant.lensTint}
              pinnedRotation={pinnedRotation}
              pinnedProgress={pinnedProgress}
              cameraZ={8.2}
              intensity={1.05}
              active={inView}
            />
          ) : (
            <SceneFallback />
          )}
        </div>

        <div ref={beatsRef} className="relative col-span-12 lg:col-span-4 lg:col-start-9">
          <div className="relative min-h-[280px]">
            {beatItems.map((beat, i) => (
              <div
                key={i}
                data-beat
                className={cn(
                  "absolute inset-0 flex flex-col gap-6",
                  reduced && (i === activeBeat ? "opacity-100" : "opacity-0"),
                )}
              >
                <div className="font-mono-tight flex items-center gap-3 text-[10px] tracking-[0.3em] text-amber uppercase">
                  <span className="block h-px w-8 bg-amber" />
                  {beat.eyebrow}
                </div>
                <h3 className="font-display text-[clamp(2.5rem,5.5vw,4.5rem)] leading-[0.95] font-light tracking-[-0.025em] text-balance">
                  {beat.title}
                </h3>
                <p className="font-sans-tight max-w-md text-base leading-relaxed text-pretty text-bone-dim md:text-lg">
                  {beat.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
