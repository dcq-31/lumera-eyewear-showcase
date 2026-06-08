"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type MutableRefObject,
  type ReactNode,
} from "react";
import { VARIANTS, type Variant } from "@/lib/constants";

type SceneStateContextValue = {
  variant: Variant;
  setVariantById: (id: string) => void;
  variants: Variant[];
  pointer: MutableRefObject<{ x: number; y: number }>;
  scrollProgress: MutableRefObject<number>;
  pinnedRotation: MutableRefObject<number>;
  pinnedProgress: MutableRefObject<number>;
};

const SceneStateContext = createContext<SceneStateContextValue | null>(null);

export function SceneStateProvider({ children }: { children: ReactNode }) {
  const [variant, setVariant] = useState<Variant>(VARIANTS[0]);
  const pointer = useRef({ x: 0, y: 0 });
  const scrollProgress = useRef(0);
  const pinnedRotation = useRef(0);
  const pinnedProgress = useRef(0);

  useEffect(() => {
    let pendingPointer: { x: number; y: number } | null = null;
    let pendingScrollY: number | null = null;
    let pointerRaf = 0;
    let scrollRaf = 0;

    const flushPointer = () => {
      pointerRaf = 0;
      if (!pendingPointer) return;
      pointer.current.x = pendingPointer.x;
      pointer.current.y = pendingPointer.y;
      pendingPointer = null;
    };

    const flushScroll = () => {
      scrollRaf = 0;
      if (pendingScrollY === null) return;
      const max = document.body.scrollHeight - window.innerHeight;
      scrollProgress.current = max > 0 ? pendingScrollY / max : 0;
      pendingScrollY = null;
    };

    const onMove = (e: PointerEvent) => {
      pendingPointer = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      };
      if (!pointerRaf) pointerRaf = requestAnimationFrame(flushPointer);
    };

    const onScroll = () => {
      pendingScrollY = window.scrollY;
      if (!scrollRaf) scrollRaf = requestAnimationFrame(flushScroll);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    // Initial sync
    pendingScrollY = window.scrollY;
    flushScroll();

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
      if (pointerRaf) cancelAnimationFrame(pointerRaf);
      if (scrollRaf) cancelAnimationFrame(scrollRaf);
    };
  }, []);

  const setVariantById = (id: string) => {
    const v = VARIANTS.find((x) => x.id === id);
    if (v) setVariant(v);
  };

  return (
    <SceneStateContext.Provider
      value={{
        variant,
        setVariantById,
        variants: VARIANTS,
        pointer,
        scrollProgress,
        pinnedRotation,
        pinnedProgress,
      }}
    >
      {children}
    </SceneStateContext.Provider>
  );
}

export function useSceneState() {
  const ctx = useContext(SceneStateContext);
  if (!ctx) throw new Error("useSceneState must be used within SceneStateProvider");
  return ctx;
}
