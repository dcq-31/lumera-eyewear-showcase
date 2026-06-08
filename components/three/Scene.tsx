"use client";

import { Canvas, useThree } from "@react-three/fiber";
import { ContactShadows, AdaptiveDpr, AdaptiveEvents, PerformanceMonitor } from "@react-three/drei";
import { Suspense, useEffect, useRef, useState, type RefObject } from "react";
import { useTheme } from "next-themes";
import * as THREE from "three";
import { GlassesModel, type ModelExtents } from "./GlassesModel";
import { SceneLoader } from "./SceneLoader";
import { SceneFallback } from "./SceneFallback";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

const NEAR_FLOOR = 3;
const MAX_TILT = 0.5;
const IDLE_BOB = 0.12;

/**
 * Fits the camera to the model's measured box, width and height independently.
 * The horizontal swing radius (hypot of half-width/depth) keeps the model from
 * cropping as it spins; `padding` adds a uniform safety ring.
 */
function FitCamera({ extents, padding = 1.18 }: { extents: ModelExtents | null; padding?: number }) {
  const { camera, size } = useThree();
  useEffect(() => {
    if (!extents || !(camera instanceof THREE.PerspectiveCamera)) return;
    const halfFov = (camera.fov / 2) * (Math.PI / 180);
    const tan = Math.tan(halfFov);
    const aspect = size.width / Math.max(size.height, 1);

    const rHoriz = Math.hypot(extents.halfWidth, extents.halfDepth);
    const rVert =
      extents.halfHeight * Math.cos(MAX_TILT) + extents.halfDepth * Math.sin(MAX_TILT) + IDLE_BOB;

    const distForWidth = rHoriz / (tan * Math.max(aspect, 0.01));
    const distForHeight = rVert / tan;
    const z = Math.max(distForWidth, distForHeight) * padding;

    camera.position.z = Math.max(z, NEAR_FLOOR);
    camera.updateProjectionMatrix();
  }, [camera, size.width, size.height, extents, padding]);
  return null;
}

const DARK_PALETTE = {
  bg: "#0a0a0b" as const,
  fog: "#0a0a0b" as const,
  shadow: "#000000" as const,
  shadowOpacity: 0.5,
};

const LIGHT_PALETTE = {
  bg: "#f4f3ee" as const,
  fog: "#f4f3ee" as const,
  shadow: "#1a1a1c" as const,
  shadowOpacity: 0.22,
};

type SceneProps = {
  scrollProgress: RefObject<number>;
  pointer: RefObject<{ x: number; y: number }>;
  frameColor: string;
  lensTint: string;
  pinnedRotation?: RefObject<number>;
  pinnedProgress?: RefObject<number>;
  className?: string;
  cameraZ?: number;
  padding?: number;
  intensity?: number;
  active?: boolean;
};

function detectWebGL(): boolean {
  if (typeof window === "undefined") return true;
  try {
    const canvas = document.createElement("canvas");
    return !!(
      canvas.getContext("webgl2") ||
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl")
    );
  } catch {
    return false;
  }
}

export function Scene({
  scrollProgress,
  pointer,
  frameColor,
  lensTint,
  pinnedRotation,
  pinnedProgress,
  className,
  cameraZ = 5.5,
  padding,
  intensity = 1,
  active = true,
}: SceneProps) {
  const [hasWebGL, setHasWebGL] = useState(true);
  const [dpr, setDpr] = useState<[number, number]>([1, 1.5]);
  const [extents, setExtents] = useState<ModelExtents | null>(null);
  const reduced = useReducedMotion();
  const mountRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const palette = resolvedTheme === "light" ? LIGHT_PALETTE : DARK_PALETTE;

  useEffect(() => {
    setHasWebGL(detectWebGL());
  }, []);

  if (!hasWebGL) {
    return <SceneFallback className={className} />;
  }

  return (
    <div ref={mountRef} className={cn("relative h-full w-full", className)}>
      <Canvas
        camera={{ position: [0, 0, cameraZ], fov: 32 }}
        dpr={dpr}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          preserveDrawingBuffer: false,
        }}
        frameloop={reduced || !active ? "demand" : "always"}
        shadows
      >
        <FitCamera extents={extents} padding={padding} />
        <PerformanceMonitor
          onIncline={() => setDpr([1, 1.6])}
          onDecline={() => setDpr([0.75, 1.1])}
        />
        <AdaptiveDpr pixelated={false} />
        <AdaptiveEvents />

        <fog attach="fog" args={[palette.fog, 9, 22]} />

        <ambientLight intensity={0.22 * intensity} />
        <directionalLight
          position={[3, 5, 4]}
          intensity={2.1 * intensity}
          castShadow
          shadow-mapSize={[768, 768]}
          color="#fff5e0"
        />
        <directionalLight position={[-4, 2, -3]} intensity={0.95 * intensity} color="#a5b8d4" />
        <pointLight
          position={[3, 1, 3]}
          intensity={1.2 * intensity}
          color="#ffe6c8"
          distance={12}
          decay={1.4}
        />

        <Suspense fallback={<SceneLoader />}>
          <group position={[0, 0, 0]}>
            <GlassesModel
              scrollProgress={scrollProgress}
              pointer={pointer}
              frameColor={frameColor}
              lensTint={lensTint}
              pinnedRotation={pinnedRotation}
              pinnedProgress={pinnedProgress}
              onMeasure={setExtents}
            />
          </group>

          <ContactShadows
            position={[0, -1.4, 0]}
            opacity={palette.shadowOpacity}
            scale={8}
            blur={2.5}
            far={4}
            resolution={384}
            color={palette.shadow}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
