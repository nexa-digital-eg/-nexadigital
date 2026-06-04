"use client";

import { Search, PenTool, Code, Rocket, type LucideIcon } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Reveal } from "./ui/Reveal";

const stepIcons: LucideIcon[] = [Search, PenTool, Code, Rocket];

export function Process() {
  const { t } = useLanguage();

  return (
    <section
      id="process"
      className="relative scroll-mt-24 overflow-hidden py-20 sm:py-28"
    >
      <div className="container-nexa">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="section-eyebrow">{t.process.eyebrow}</span>
          <h2 className="mt-5 font-display text-3xl font-bold sm:text-4xl lg:text-5xl text-balance">
            {t.process.title}
          </h2>
          <p className="mt-4 text-silver/82 sm:text-lg">{t.process.subtitle}</p>
        </Reveal>

        <div className="relative mt-16">
          {/* connecting line */}
          <div className="absolute inset-x-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-brand-500/40 to-transparent lg:block" />

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {t.process.steps.map((step, i) => {
              const Icon = stepIcons[i] ?? Search;
              return (
                <Reveal key={step.title} delay={i * 0.12} className="relative">
                  <div className="flex flex-col items-center text-center">
                    <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-nexa-800 ring-1 ring-brand-400/30">
                      <Icon className="h-6 w-6 text-brand-300" />
                      <span className="absolute -top-2 -end-2 flex h-6 w-6 items-center justify-center rounded-full bg-brand-gradient text-xs font-bold text-white">
                        {i + 1}
                      </span>
                    </div>
                    <h3 className="mt-5 font-display text-lg font-bold text-white">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm text-silver/78">{step.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
