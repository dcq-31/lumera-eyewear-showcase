/**
 * Structural, language-neutral data only. Display copy lives in
 * `lib/i18n/translations.ts` and is consumed via `useTranslations()`.
 */

export type NavLinkKey = "frames" | "features" | "specs" | "finishes";

export const NAV_LINKS: ReadonlyArray<{ key: NavLinkKey; href: string }> = [
  { key: "frames", href: "#showcase" },
  { key: "features", href: "#features" },
  { key: "specs", href: "#specs" },
  { key: "finishes", href: "#variants" },
] as const;

export type VariantId = "obsidian" | "champagne" | "graphite" | "rose";

export type Variant = {
  id: VariantId;
  frameColor: string;
  lensTint: string;
  accent: string;
};

export const VARIANTS: Variant[] = [
  {
    id: "obsidian",
    frameColor: "#1a1a1c",
    lensTint: "#2a2a32",
    accent: "#3d4048",
  },
  {
    id: "champagne",
    frameColor: "#c8b690",
    lensTint: "#3a2f1f",
    accent: "#e8d8a8",
  },
  {
    id: "graphite",
    frameColor: "#4a4a52",
    lensTint: "#2a3038",
    accent: "#7a8a9a",
  },
  {
    id: "rose",
    frameColor: "#a87060",
    lensTint: "#3a2828",
    accent: "#d8a098",
  },
];
