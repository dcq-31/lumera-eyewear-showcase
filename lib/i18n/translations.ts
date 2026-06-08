/**
 * All user-facing copy lives here. Spanish is the source of truth — the
 * `Translations` type is derived from the `es` object and forces `en` to
 * mirror the same shape (any missing key fails typecheck).
 */

const messages = {
  es: {
    nav: {
      frames: "Monturas",
      features: "Atributos",
      specs: "Ficha",
      finishes: "Acabados",
      preorder: "Reservar",
    },
    hero: {
      eyebrow: "Núm. 04 / Serie I",
      headlineA: "Ver",
      headlineB: "Más allá.",
      body: "Un instrumento óptico disfrazado de gafas. Titanio aeroespacial, óptica antirreflejos de ocho capas, pesadas en gramos. Hechas en Sabae, numeradas de por vida.",
      ctaPrimary: "Reservar una montura",
      ctaSecondary: "Conoce el oficio",
      scrollCue: "Desplaza para inspeccionar",
      established: "EST. MMXXVI",
      weightLabel: "7,2 g / Ti6Al4V",
    },
    showcase: {
      eyebrow: "La montura",
      beats: [
        {
          eyebrow: "01 — Montura",
          title: "Titanio aeroespacial",
          body: "Forjado con la misma aleación que las palas de turbina. Templado en cinco ciclos térmicos.",
        },
        {
          eyebrow: "02 — Lente",
          title: "Óptica antirreflejos",
          body: "Ocho nano-capas eliminan el reflejo sin atenuar el mundo. Hidrófoba. Oleófoba. Honesta.",
        },
        {
          eyebrow: "03 — Peso",
          title: "Siete gramos",
          body: "Más ligeras que el aire que las rodea. Imperceptibles donde importa, estructurales donde cuenta.",
        },
      ],
    },
    features: {
      eyebrow: "Cuatro obsesiones",
      heading: "Una especificación contenida.",
      intro:
        "Cada gramo, cada ángulo, cada capa razonada. Nada existe aquí porque pueda. Cada elemento se gana su lugar.",
      items: [
        {
          label: "01",
          title: "Titanio aeroespacial",
          body: "Montura Grade-5 Ti6Al4V, mecanizada a una tolerancia de 0,4 mm, terminada a mano en cuatro horas.",
          stat: "0,4",
          unit: "mm",
          statLabel: "Tolerancia de mecanizado",
        },
        {
          label: "02",
          title: "Ópticamente pura",
          body: "Recubrimiento antirreflejos de ocho capas con sellado hidrófobo. Cromáticamente fiel en todo el espectro visible.",
          stat: "08",
          unit: "capas",
          statLabel: "Recubrimiento AR",
        },
        {
          label: "03",
          title: "Siete gramos",
          body: "Más ligeras que una pluma estilográfica. Diseñadas para desaparecer, equilibradas para permanecer.",
          stat: "7,2",
          unit: "g",
          statLabel: "Peso total",
        },
        {
          label: "04",
          title: "Oficio de por vida",
          body: "Cada montura se serializa, calibra y mantiene durante la vida del portador.",
          stat: "50k",
          unit: "ciclos",
          statLabel: "Bisagra probada a fatiga",
        },
      ],
    },
    specs: {
      eyebrow: "Especificación",
      heading: "Al milímetro.",
      intro:
        "Calibradas, certificadas y entregadas con una tarjeta de medidas firmada por el fabricante.",
      rows: [
        ["Material de la montura", "Titanio Grade-5 (Ti6Al4V)"],
        ["Bisagra", "De resorte, probada a fatiga hasta 50.000 ciclos"],
        ["Lente", "Alto índice 1,74, antirreflejos de ocho capas"],
        ["Protección UV", "100 % UVA / UVB / UVC"],
        ["Peso", "7,2 g"],
        ["Ancho", "138 mm de patilla a patilla"],
        ["Puente", "Plaquetas ajustables silicona-titanio"],
        ["Origen", "Diseñadas en Copenhague, fabricadas en Sabae"],
        ["Garantía", "De por vida, ligada al número de serie"],
      ],
    },
    variants: {
      eyebrow: "Cuatro acabados",
      heading: "Elige tu luz.",
      intro:
        "Cada acabado es tratado, cepillado y sellado a mano. Toca una muestra para verlo atrapar la luz.",
      items: {
        obsidian: { name: "Obsidiana", description: "Titanio negro pulido" },
        champagne: { name: "Champán", description: "Acabado dorado cálido" },
        graphite: { name: "Grafito", description: "Pavón cepillado" },
        rose: { name: "Acero Rosa", description: "Aleación rosa terminada a mano" },
      },
      refPrefix: "Ref.",
    },
    preorder: {
      eyebrow: "Serie I — Limitada a 1.200",
      heading: "Reserva el próximo par.",
      intro:
        "Las reservas se abren por oleadas. Reserva la tuya ahora para recibir la primera asignación y una invitación privada a nuestro estudio de Copenhague.",
      cta: "Reservar una montura",
    },
    footer: {
      tagline:
        "Un instrumento óptico disfrazado de gafas. Diseñadas en Copenhague, fabricadas en Sabae. Numeradas de por vida.",
      atelier: {
        title: "Taller",
        links: [
          { label: "La montura", href: "#showcase" },
          { label: "Atributos", href: "#features" },
          { label: "Ficha técnica", href: "#specs" },
          { label: "Serie I", href: "#variants" },
          { label: "Reservar", href: "#preorder" },
        ],
      },
      studio: {
        title: "Estudio",
        links: [
          { label: "Copenhague", href: "#" },
          { label: "Sabae", href: "#" },
          { label: "Diario", href: "#" },
          { label: "Prensa", href: "#" },
        ],
      },
      contact: {
        title: "Contacto",
        links: [
          { label: "atelier@lumera.example", href: "mailto:atelier@lumera.example" },
          { label: "Servicio y reparación", href: "#" },
          { label: "Puntos de venta", href: "#" },
          { label: "Boletín", href: "#" },
        ],
      },
      copyright: "© MMXXVI Luméra Atelier. Todos los derechos reservados.",
      privacy: "Privacidad",
      terms: "Términos",
      imprint: "Aviso legal",
    },
    chrome: {
      themeToLight: "Cambiar a modo claro",
      themeToDark: "Cambiar a modo oscuro",
      langToOther: "Switch to English",
    },
  },
  en: {
    nav: {
      frames: "Frames",
      features: "Features",
      specs: "Specs",
      finishes: "Finishes",
      preorder: "Pre-order",
    },
    hero: {
      eyebrow: "No. 04 / Series I",
      headlineA: "See",
      headlineB: "Beyond.",
      body: "An optical instrument disguised as eyewear. Aerospace titanium, eight-layer anti-reflective optics, weighed in grams. Built in Sabae, numbered for life.",
      ctaPrimary: "Reserve a frame",
      ctaSecondary: "Watch the craft",
      scrollCue: "Scroll to inspect",
      established: "EST. MMXXVI",
      weightLabel: "7.2g / Ti6Al4V",
    },
    showcase: {
      eyebrow: "The Frame",
      beats: [
        {
          eyebrow: "01 — Frame",
          title: "Aerospace-grade titanium",
          body: "Forged from the same alloy used in turbine blades. Tempered through five thermal cycles.",
        },
        {
          eyebrow: "02 — Lens",
          title: "Anti-reflective optics",
          body: "Eight nano-layers eliminate glare without dimming the world. Hydrophobic. Oleophobic. Honest.",
        },
        {
          eyebrow: "03 — Weight",
          title: "Seven grams",
          body: "Lighter than the air around them. Vanishingly thin where it matters, structural where it counts.",
        },
      ],
    },
    features: {
      eyebrow: "Four obsessions",
      heading: "A specification of restraint.",
      intro:
        "Every gram, every angle, every layer of coating reasoned for. Nothing here exists because it could. Each element earns its place.",
      items: [
        {
          label: "01",
          title: "Aerospace titanium",
          body: "Grade-5 Ti6Al4V frame, machined to a 0.4mm tolerance, finished by hand over four hours.",
          stat: "0.4",
          unit: "mm",
          statLabel: "Machining tolerance",
        },
        {
          label: "02",
          title: "Optically pure",
          body: "Eight-layer anti-reflective coating with hydrophobic seal. Color-true across the visible spectrum.",
          stat: "08",
          unit: "layers",
          statLabel: "AR coating",
        },
        {
          label: "03",
          title: "Seven grams",
          body: "Lighter than a fountain pen. Engineered to disappear, balanced to stay.",
          stat: "7.2",
          unit: "g",
          statLabel: "Total weight",
        },
        {
          label: "04",
          title: "Lifetime craft",
          body: "Each frame is serialized, calibrated, and serviced for the life of the wearer.",
          stat: "50k",
          unit: "cycles",
          statLabel: "Hinge fatigue tested",
        },
      ],
    },
    specs: {
      eyebrow: "Specification",
      heading: "To the millimeter.",
      intro: "Calibrated, certified, and delivered with a measurement card signed by the maker.",
      rows: [
        ["Frame material", "Grade-5 titanium (Ti6Al4V)"],
        ["Hinge", "Spring-loaded, fatigue-tested to 50,000 cycles"],
        ["Lens", "1.74 high-index, eight-layer AR coating"],
        ["UV protection", "100% UVA / UVB / UVC"],
        ["Weight", "7.2 g"],
        ["Width", "138 mm temple-to-temple"],
        ["Bridge", "Adjustable silicone-titanium nosepads"],
        ["Origin", "Designed in Copenhagen, made in Sabae"],
        ["Warranty", "Lifetime, serial-bound"],
      ],
    },
    variants: {
      eyebrow: "Four finishes",
      heading: "Choose your light.",
      intro:
        "Each finish is treated, brushed, and sealed by hand. Tap a swatch to see it catch the light.",
      items: {
        obsidian: { name: "Obsidian", description: "Polished black titanium" },
        champagne: { name: "Champagne", description: "Warm gold finish" },
        graphite: { name: "Graphite", description: "Brushed gunmetal" },
        rose: { name: "Rose Steel", description: "Hand-finished rose alloy" },
      },
      refPrefix: "Ref.",
    },
    preorder: {
      eyebrow: "Series I — Limited to 1,200",
      heading: "Reserve the next pair.",
      intro:
        "Reservations open in waves. Place yours now to receive the first allocation and a private invitation to our Copenhagen studio.",
      cta: "Reserve a frame",
    },
    footer: {
      tagline:
        "An optical instrument disguised as eyewear. Designed in Copenhagen, made in Sabae. Numbered for life.",
      atelier: {
        title: "Atelier",
        links: [
          { label: "The frame", href: "#showcase" },
          { label: "Features", href: "#features" },
          { label: "Specifications", href: "#specs" },
          { label: "Series I", href: "#variants" },
          { label: "Reserve", href: "#preorder" },
        ],
      },
      studio: {
        title: "Studio",
        links: [
          { label: "Copenhagen", href: "#" },
          { label: "Sabae", href: "#" },
          { label: "Journal", href: "#" },
          { label: "Press", href: "#" },
        ],
      },
      contact: {
        title: "Contact",
        links: [
          { label: "atelier@lumera.example", href: "mailto:atelier@lumera.example" },
          { label: "Service & repair", href: "#" },
          { label: "Stockists", href: "#" },
          { label: "Newsletter", href: "#" },
        ],
      },
      copyright: "© MMXXVI Luméra Atelier. All rights reserved.",
      privacy: "Privacy",
      terms: "Terms",
      imprint: "Imprint",
    },
    chrome: {
      themeToLight: "Switch to light mode",
      themeToDark: "Switch to dark mode",
      langToOther: "Cambiar a Español",
    },
  },
} as const;

export type Locale = "es" | "en";
export const LOCALES: readonly Locale[] = ["es", "en"];
export const DEFAULT_LOCALE: Locale = "es";

export type Translations = (typeof messages)["es"];

export function getMessages(locale: Locale): Translations {
  return messages[locale] as Translations;
}
