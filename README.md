# LUMÉRA — _See Beyond._

A single-page, motion-rich product landing page for a fictional premium eyewear brand.
Built as a Next.js 16 + Tailwind v4 + Three.js showcase with GSAP + Framer Motion + Lenis.

---

## Stack

| Layer         | Library                                           |
| ------------- | ------------------------------------------------- |
| Framework     | Next.js 16 (App Router, React 19, TypeScript)     |
| Styling       | TailwindCSS v4 (custom tokens via `@theme`)       |
| 3D            | Three.js, @react-three/fiber, @react-three/drei   |
| Scroll motion | GSAP + ScrollTrigger                              |
| UI motion     | Framer Motion v12                                 |
| Smooth scroll | Lenis (synced to GSAP ticker)                     |
| Primitives    | shadcn-style, Radix Slot                          |
| Typography    | next/font — Fraunces, Inter Tight, JetBrains Mono |

---

## Run

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm build && pnpm start
pnpm typecheck
```

Tested with Node 22+ and pnpm 9+. Works with npm/yarn equivalently.

---

## 3D model

The hero/showcase 3D model lives at:

```
public/models/glasses.obj
```

It is loaded with three's `OBJLoader` via `useLoader`, normalized in scale, and rendered with
hand-tuned `MeshPhysicalMaterial`s (brushed-metal frame + transmissive tinted glass lenses).

### Optional: convert to draco-compressed `.glb`

`.obj` is fine for this scene size, but a draco-compressed `.glb` will load 3–5× faster on
mobile networks. To convert:

```bash
# install once
npm i -g gltf-pipeline obj2gltf

# convert
obj2gltf -i public/models/glasses.obj -o public/models/glasses.glb
gltf-pipeline -i public/models/glasses.glb -o public/models/glasses.draco.glb --draco.compressionLevel=10
```

Then swap the loader in `components/three/GlassesModel.tsx`:

```ts
import { useGLTF } from "@react-three/drei";
// ...
const { scene } = useGLTF("/models/glasses.draco.glb");
```

The `.obj` path remains the source of truth — the `.glb` is a build optimization.

---

## Project map

```
app/
  layout.tsx              # fonts, Lenis provider, SceneState, grain + vignette
  page.tsx                # section composition
  globals.css             # Tailwind v4 + design tokens + animations

components/
  nav/Navbar.tsx
  hero/Hero.tsx
  three/
    Scene.tsx             # R3F canvas, lights, env, fallback
    GlassesModel.tsx      # OBJ loader, materials, idle bob, scroll rotation
    SceneLoader.tsx       # Drei Html progress UI
    SceneFallback.tsx     # Static SVG fallback (no-WebGL)
    SceneState.tsx        # Variant + scroll + pointer refs (shared)
  motion/
    SmoothScrollProvider.tsx
    CustomCursor.tsx
    SplitText.tsx
    Reveal.tsx
    MagneticButton.tsx
    Marquee.tsx
  sections/
    Showcase.tsx          # GSAP-pinned 3D rotation + scroll beats
    Features.tsx
    Gallery.tsx           # Parallax plates + marquee
    Specs.tsx             # Line-by-line reveal
    Variants.tsx          # Live material swap
    PreOrder.tsx
    Footer.tsx
  ui/Button.tsx           # cva-styled primitive

hooks/
  useReducedMotion.ts
  useIsTouch.ts

lib/
  constants.ts            # variants, features, specs, beats
  utils.ts                # cn, clamp, lerp

public/models/glasses.obj
```
