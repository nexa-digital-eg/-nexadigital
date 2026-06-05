"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  MessageCircle,
  Globe,
  Code2,
  Workflow,
  BrainCircuit,
  FileText,
  Star,
} from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { whatsappLink } from "@/lib/site";
import { GridGlow } from "./ui/Background";
import { Particles } from "./Particles";
import { LogoMarkSVG } from "./Logo";

const services = [
  { icon: Globe,        label: "Websites",   color: "from-blue-500/25 to-cyan-500/10",    iconColor: "text-sky-300"     },
  { icon: BrainCircuit, label: "AI",          color: "from-violet-500/25 to-fuchsia-500/10", iconColor: "text-violet-300" },
  { icon: Code2,        label: "Systems",    color: "from-emerald-500/25 to-teal-500/10", iconColor: "text-emerald-300" },
  { icon: Workflow,     label: "Automation", color: "from-orange-500/25 to-amber-500/10", iconColor: "text-orange-300"  },
  { icon: FileText,     label: "CV & LinkedIn", color: "from-pink-500/25 to-rose-500/10", iconColor: "text-pink-300"    },
];

export function Hero() {
  const { t, locale } = useLanguage();
  const Arrow = locale === "ar" ? ArrowLeft : ArrowRight;

  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 150, damping: 20 });
  const smy = useSpring(my, { stiffness: 150, damping: 20 });
  const rotateY = useTransform(smx, [-0.5, 0.5], [10, -10]);
  const rotateX = useTransform(smy, [-0.5, 0.5], [-10, 10]);

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  }
  function onMouseLeave() { mx.set(0); my.set(0); }

  return (
    <section
      id="home"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-24 pb-16"
    >
      <GridGlow />
      <Particles className="-z-[5]" />

      <div className="container-nexa relative z-10 grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">

        {/* ── Copy ──────────────────────────────────────────────── */}
        <div className="text-center lg:text-start">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="section-eyebrow"
          >
            <Sparkles className="h-3.5 w-3.5" />
            {t.hero.badge}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-6 font-display text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl text-balance"
          >
            <span className="silver-text">{t.hero.titleA}</span>
            <br />
            <span className="gradient-text-animate">{t.hero.titleB}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mx-auto mt-6 max-w-xl text-base font-medium leading-relaxed text-silver-light/90 sm:text-lg lg:mx-0"
          >
            {t.hero.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-9 flex flex-col items-center gap-3 sm:flex-row lg:justify-start sm:justify-center"
          >
            <motion.a
              href={whatsappLink(t.contact.whatsappMsg)}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="btn-primary w-full sm:w-auto"
            >
              <MessageCircle className="h-4 w-4" />
              {t.hero.ctaPrimary}
            </motion.a>
            <motion.a
              href="#services"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="btn-ghost w-full sm:w-auto"
            >
              {t.hero.ctaSecondary}
              <Arrow className="h-4 w-4" />
            </motion.a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-8 text-xs font-medium uppercase tracking-[0.18em] text-silver/55"
          >
            {t.hero.trustedBy}
          </motion.p>
        </div>

        {/* ── Visual: Dashboard card ─────────────────────────────── */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, scale: 0.9, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          style={{ rotateX, rotateY, transformPerspective: 1000 }}
          className="relative mx-auto hidden w-full max-w-[390px] lg:block [transform-style:preserve-3d]"
        >
          {/* Ambient glow behind card */}
          <div className="pointer-events-none absolute inset-0 -z-10 scale-90 rounded-3xl bg-brand-500/20 blur-3xl" />

          {/* Main dashboard card */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="glass-card relative overflow-hidden rounded-3xl p-6"
          >
            {/* card inner glow */}
            <div className="pointer-events-none absolute -right-14 -top-14 h-48 w-48 rounded-full bg-brand-500/18 blur-3xl" />

            {/* Header */}
            <div className="relative flex items-center gap-3 pb-5 border-b border-white/8">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand-gradient shadow-glow">
                <LogoMarkSVG className="h-7 w-7" />
              </div>
              <div>
                <p className="font-display text-sm font-bold text-white tracking-wide">
                  <span className="gradient-text">NEXA</span>{" "}
                  <span className="silver-text">DIGITAL</span>
                </p>
                <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-silver/45">
                  Smart Solutions
                </p>
              </div>
              {/* online dot */}
              <span className="ml-auto flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-2.5 py-1 text-[10px] font-semibold text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Online
              </span>
            </div>

            {/* Services grid */}
            <div className="relative mt-4 grid grid-cols-2 gap-2.5">
              {services.slice(0, 4).map(({ icon: Icon, label, color, iconColor }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.08 }}
                  className={`flex items-center gap-2.5 rounded-2xl bg-gradient-to-br ${color} border border-white/[0.07] p-3`}
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white/8">
                    <Icon className={`h-4 w-4 ${iconColor}`} />
                  </span>
                  <span className="text-xs font-semibold text-white/90">{label}</span>
                </motion.div>
              ))}
            </div>

            {/* 5th service full width */}
            {services.slice(4).map(({ icon: Icon, color, iconColor, label }) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.72 }}
                className={`mt-2.5 flex items-center gap-2.5 rounded-2xl bg-gradient-to-br ${color} border border-white/[0.07] p-3`}
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white/8">
                  <Icon className={`h-4 w-4 ${iconColor}`} />
                </span>
                <span className="text-xs font-semibold text-white/90">{label}</span>
              </motion.div>
            ))}

            {/* Stats row */}
            <div className="relative mt-4 grid grid-cols-3 gap-2">
              {[["50+", "Projects"], ["100%", "Satisfaction"], ["24/7", "Support"]].map(([val, lbl]) => (
                <div key={lbl} className="rounded-xl bg-white/[0.04] py-2.5 text-center">
                  <p className="font-display text-base font-bold gradient-text">{val}</p>
                  <p className="text-[9px] font-medium text-silver/45 uppercase tracking-wider">{lbl}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Floating badge — top right */}
          <motion.div
            animate={{ y: [0, -7, 0] }}
            transition={{ duration: 3.5, delay: 0.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -right-8 top-8 flex items-center gap-2 rounded-2xl bg-brand-gradient px-4 py-2 shadow-glow"
          >
            <Sparkles className="h-3.5 w-3.5 text-white" />
            <span className="text-[11px] font-bold text-white">AI Powered</span>
          </motion.div>

          {/* Floating badge — bottom left */}
          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{ duration: 4, delay: 1.2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -left-8 bottom-12 flex items-center gap-2 rounded-2xl glass-card px-4 py-2"
          >
            <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
            <span className="text-[11px] font-semibold text-white">Top Rated</span>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
        <motion.div
          className="h-9 w-5 rounded-full border-2 border-white/20 p-1"
          aria-hidden
        >
          <motion.div
            className="h-2 w-1 rounded-full bg-brand-400 mx-auto"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity }}
          />
        </motion.div>
      </div>
    </section>
  );
}
