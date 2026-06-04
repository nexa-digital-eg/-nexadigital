"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Clock, Cpu, Headset, type LucideIcon } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Reveal } from "./ui/Reveal";

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
            <div className="glass-card relative flex h-full flex-col items-center justify-center gap-6 p-8 sm:p-10">
              {/* monogram app-icon tile */}
              <motion.div
                className="rounded-[1.6rem] bg-gradient-to-br from-brand-400/70 via-brand-500/30 to-cyan-400/40 p-[2px] shadow-glow-lg"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="overflow-hidden rounded-[1.5rem]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/icon-512.png"
                    alt="Nexa Digital"
                    className="h-28 w-28 object-cover sm:h-32 sm:w-32"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </motion.div>

              {/* wordmark */}
              <div className="text-center">
                <p className="font-display text-2xl font-bold tracking-wide">
                  <span className="gradient-text">NEXA</span>{" "}
                  <span className="silver-text">DIGITAL</span>
                </p>
                <p className="mt-2 text-[11px] uppercase tracking-[0.25em] text-silver/55">
                  Smart Solutions. Digital Future.
                </p>
              </div>

              {/* feature tags */}
              <div className="grid w-full grid-cols-2 gap-3">
                {["Web", "AI", "Systems", "Automation"].map((tag) => (
                  <span
                    key={tag}
                    className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] py-2.5 text-center text-xs font-semibold text-silver-light"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-400" />
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
      </div>
    </section>
  );
}
