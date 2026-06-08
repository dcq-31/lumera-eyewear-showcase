import type { Metadata, Viewport } from "next";
import { Fraunces, Inter_Tight, JetBrains_Mono } from "next/font/google";
import { SmoothScrollProvider } from "@/components/motion/SmoothScrollProvider";
import { DeferredCursor } from "@/components/motion/DeferredCursor";
import { SceneStateProvider } from "@/components/three/SceneState";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { LocaleProvider } from "@/components/i18n/LocaleProvider";
import "./globals.css";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  axes: ["opsz"],
  display: "swap",
});

const sans = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "LUMÉRA — Ver Más Allá.",
  description:
    "Gafas de titanio aeroespacial, mecanizadas a una tolerancia de 0,4 mm y terminadas a mano. Siete gramos, oficio de por vida.",
  metadataBase: new URL("https://lumera.example"),
  openGraph: {
    title: "LUMÉRA — Ver Más Allá.",
    description: "Gafas premium de titanio, terminadas a mano en Sabae.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0b" },
    { media: "(prefers-color-scheme: light)", color: "#f4f3ee" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link
          rel="preload"
          as="fetch"
          href="/models/glasses.glb"
          type="model/gltf-binary"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-ink-0 text-bone antialiased">
        <ThemeProvider>
          <LocaleProvider>
            <SceneStateProvider>
              <SmoothScrollProvider>
                <DeferredCursor />
                <div className="grain" aria-hidden />
                <div className="vignette" aria-hidden />
                {children}
              </SmoothScrollProvider>
            </SceneStateProvider>
          </LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
