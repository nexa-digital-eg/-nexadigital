"use client";

import { ShieldCheck, Clock, Cpu, Headset, type LucideIcon } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Reveal } from "./ui/Reveal";
import { LogoMark } from "./Logo";

const pointIcons: LucideIcon[] = [ShieldCheck, Clock, Cpu, Headset];

export function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="container-nexa grid items-center gap-12 lg:grid-cols-2">
        {/* Visual */}
        <Reveal from="right" className="order-2 lg:order-1">
          <div className="relative mx-auto aspect-square w-full max-w-md">
            <div className="absolute inset-0 rounded-[2rem] bg-brand-gradient opacity-20 blur-2xl" />
            <div className="glass-card relative flex h-full flex-col items-center justify-center gap-6 p-10">
              <div className="animate-float rounded-3xl border border-white/10 bg-white/[0.03] p-8">
                <LogoMark className="h-24 w-24" />
              </div>
              <p className="text-center font-display text-2xl font-bold">
                <span className="gradient-text">NEXA</span>{" "}
                <span className="silver-text">DIGITAL</span>
              </p>
              <div className="grid w-full grid-cols-2 gap-3">
                {["Web", "AI", "Systems", "Automation"].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-xl border border-white/10 bg-white/[0.03] py-2 text-center text-xs font-semibold text-silver/70"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* Copy */}
        <div className="order-1 lg:order-2">
          <Reveal>
            <span className="section-eyebrow">{t.about.eyebrow}</span>
            <h2 className="mt-5 font-display text-3xl font-bold sm:text-4xl lg:text-5xl text-balance">
              {t.about.title}
            </h2>
            <p className="mt-5 leading-relaxed text-silver/70 sm:text-lg">
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
                      <p className="mt-1 text-sm text-silver/60">{point.desc}</p>
                    </div>
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
