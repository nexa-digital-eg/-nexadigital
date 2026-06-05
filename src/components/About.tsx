"use client";

import { ShieldCheck, Clock, Cpu, Headset, type LucideIcon } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Reveal } from "./ui/Reveal";

const pointIcons: LucideIcon[] = [ShieldCheck, Clock, Cpu, Headset];

export function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="container-nexa max-w-3xl">
        <Reveal>
          <span className="section-eyebrow">{t.about.eyebrow}</span>
          <h2 className="mt-5 font-display text-3xl font-bold sm:text-4xl lg:text-5xl text-balance">
            {t.about.title}
          </h2>
          <p className="mt-5 leading-relaxed text-silver/85 sm:text-lg">
            {t.about.desc}
          </p>
        </Reveal>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {t.about.points.map((point, i) => {
            const Icon = pointIcons[i] ?? ShieldCheck;
            return (
              <Reveal key={point.title} delay={i * 0.08}>
                <div className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-500/15 text-brand-300">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-semibold text-white">{point.title}</h3>
                    <p className="mt-1 text-sm text-silver/78">{point.desc}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
