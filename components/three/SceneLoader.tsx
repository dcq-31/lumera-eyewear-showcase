"use client";

import { useProgress } from "@react-three/drei";
import { Html } from "@react-three/drei";

export function SceneLoader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center gap-3 select-none">
        <div className="font-mono-tight text-[10px] tracking-[0.3em] text-bone-dim uppercase">
          Calibrating optics
        </div>
        <div className="h-px w-32 overflow-hidden bg-bone/10">
          <div
            className="h-full bg-amber transition-[width] duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="font-mono-tight text-[10px] text-bone/40 tabular-nums">
          {progress.toFixed(0)}%
        </div>
      </div>
    </Html>
  );
}
