"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck, Clock, Cpu, Headset,
  TrendingUp, Users, Star, Zap,
  type LucideIcon,
} from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Reveal } from "./ui/Reveal";

const pointIcons: LucideIcon[] = [ShieldCheck, Clock, Cpu, Headset];

const stats = [
  { value: "50+",  label: "Projects Delivered", icon: TrendingUp, color: "text-sky-400",     bg: "bg-sky-500/10"    },
  { value: "30+",  label: "Happy Clients",       icon: Users,      color: "text-violet-400",  bg: "bg-violet-500/10" },
  { value: "100%", label: "Satisfaction Rate",   icon: Star,       color: "text-amber-400",   bg: "bg-amber-500/10"  },
  { value: "24/7", label: "Support Available",   icon: Zap,        color: "text-emerald-400", bg: "bg-emerald-500/10"},
];

export function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="container-nexa grid items-center gap-12 lg:grid-cols-2">
        {/* Visual — animated stats card */}
        <Reveal from="right" className="order-2 lg:order-1">
          <div className="relative mx-auto w-full max-w-md">
            {/* ambient glow */}
            <div className="pointer-events-none absolute inset-0 rounded-3xl bg-brand-500/15 blur-3xl" />

            <div className="glass-card relative overflow-hidden rounded-3xl p-7">
              {/* card inner glow */}
              <div className="pointer-events-none absolute -left-16 -top-16 h-52 w-52 rounded-full bg-brand-500/12 blur-3xl" />

              {/* header row */}
              <div className="relative mb-6 flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-silver/45">Overview</p>
                  <p className="mt-0.5 font-display text-lg font-bold text-white">Our Achievements</p>
                </div>
                <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-3 py-1 text-[10px] font-semibold text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Live Stats
                </span>
              </div>

              {/* stats grid */}
              <div className="relative grid grid-cols-2 gap-3">
                {stats.map(({ value, label, icon: Icon, color, bg }, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.03] p-4 transition-colors hover:bg-white/[0.06]"
                  >
                    {/* hover glow */}
                    <div className={`pointer-events-none absolute -right-4 -top-4 h-16 w-16 rounded-full opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100 ${bg}`} />

                    <span className={`flex h-9 w-9 items-center justify-center rounded-xl ${bg}`}>
                      <Icon className={`h-4.5 w-4.5 h-[18px] w-[18px] ${color}`} />
                    </span>
                    <p className={`mt-3 font-display text-2xl font-extrabold ${color}`}>{value}</p>
                    <p className="mt-0.5 text-[11px] font-medium leading-tight text-silver/55">{label}</p>
                  </motion.div>
                ))}
              </div>

              {/* bottom bar */}
              <div className="relative mt-4 flex items-center gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.03] px-4 py-3">
                <div className="flex -space-x-2">
                  {["bg-sky-500", "bg-violet-500", "bg-emerald-500"].map((c, i) => (
                    <span key={i} className={`h-7 w-7 rounded-full border-2 border-[#0d1929] ${c} flex items-center justify-center text-[10px] font-bold text-white`}>
                      {["W", "D", "D"][i]}
                    </span>
                  ))}
                </div>
                <div className="flex-1">
                  <p className="text-xs font-semibold text-white">Multi-discipline team</p>
                  <p className="text-[10px] text-silver/45">Web · Design · Development</p>
                </div>
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />
                  ))}
                </div>
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
