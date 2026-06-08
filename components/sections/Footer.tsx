"use client";

import { AnchorLink } from "@/components/motion/AnchorLink";
import { useTranslations } from "@/hooks/useTranslations";

type FooterLink = { label: string; href: string };

export function Footer() {
  const t = useTranslations();
  return (
    <footer className="relative isolate overflow-hidden bg-ink-0 pt-32 pb-12">
      <div className="pointer-events-none absolute -bottom-12 left-1/2 -z-10 -translate-x-1/2 select-none">
        <div className="wordmark-bg">LUM&Eacute;RA</div>
      </div>

      <div className="mx-auto w-full max-w-[1800px] px-6 md:px-12">
        <div className="grid grid-cols-12 gap-y-12 border-b border-bone/10 pb-16">
          <div className="col-span-12 flex flex-col gap-6 md:col-span-4">
            <AnchorLink
              href="#top"
              className="font-display text-xl font-medium tracking-[0.22em] text-bone transition-colors hover:text-amber-bright"
              data-cursor-hover
            >
              LUM&Eacute;RA
            </AnchorLink>
            <p className="font-sans-tight max-w-xs text-sm leading-relaxed text-pretty text-bone-dim">
              {t.footer.tagline}
            </p>
          </div>

          <FooterColumn title={t.footer.atelier.title} links={t.footer.atelier.links} />
          <FooterColumn title={t.footer.studio.title} links={t.footer.studio.links} />
          <FooterColumn title={t.footer.contact.title} links={t.footer.contact.links} />
        </div>

        <div className="font-mono-tight mt-10 flex flex-col items-start justify-between gap-4 text-[10px] tracking-[0.25em] text-bone-dim uppercase md:flex-row md:items-center">
          <span>{t.footer.copyright}</span>
          <div className="flex flex-wrap gap-6">
            <a href="#" data-cursor-hover className="hover:text-bone">
              {t.footer.privacy}
            </a>
            <a href="#" data-cursor-hover className="hover:text-bone">
              {t.footer.terms}
            </a>
            <a href="#" data-cursor-hover className="hover:text-bone">
              {t.footer.imprint}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: ReadonlyArray<FooterLink> }) {
  return (
    <div className="col-span-6 flex flex-col gap-5 md:col-span-2 md:col-start-auto">
      <div className="font-mono-tight text-[10px] tracking-[0.3em] text-bone-dim/70 uppercase">
        {title}
      </div>
      <ul className="flex flex-col gap-2.5">
        {links.map((link) => {
          const isAnchor = link.href.startsWith("#");
          const className =
            "group inline-flex items-center font-sans-tight text-sm text-bone-dim transition-colors hover:text-bone";
          const inner = (
            <span className="relative">
              {link.label}
              <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-amber transition-all duration-500 group-hover:w-full" />
            </span>
          );
          return (
            <li key={`${link.href}-${link.label}`}>
              {isAnchor ? (
                <AnchorLink href={link.href} data-cursor-hover className={className}>
                  {inner}
                </AnchorLink>
              ) : (
                <a href={link.href} data-cursor-hover className={className}>
                  {inner}
                </a>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
