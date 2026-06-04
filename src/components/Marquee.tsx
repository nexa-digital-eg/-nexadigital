"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";

const items = [
  "Websites",
  "Systems",
  "Automation",
  "AI Solutions",
  "CV & LinkedIn",
  "UI / UX",
  "E-Commerce",
  "Chatbots",
  "SEO",
  "Dashboards",
];

export function Marquee() {
  const { t } = useLanguage();
  // duplicate the list so the loop is seamless
  const loop = [...items, ...items];

  return (
    <div className="relative overflow-hidden border-y border-white/10 bg-white/[0.02] py-5">
      {/* edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-nexa-900 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-nexa-900 to-transparent" />

      <div className="flex w-max animate-marquee items-center gap-10" aria-label={t.services.eyebrow}>
        {loop.map((item, i) => (
          <span key={i} className="flex items-center gap-10 whitespace-nowrap">
            <span className="font-display text-lg font-semibold text-silver/55 transition-colors hover:text-brand-300">
              {item}
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-brand-500/60" />
          </span>
        ))}
      </div>
    </div>
  );
}
