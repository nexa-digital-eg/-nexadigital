"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Sparkles, MessageCircle } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { whatsappLink } from "@/lib/site";
import { LogoMark } from "./Logo";
import { GridGlow } from "./ui/Background";

const floatingChips = [
  { label: "Websites", x: "top-8 left-0", delay: 0 },
  { label: "AI", x: "top-1/3 -right-2", delay: 0.6 },
  { label: "Automation", x: "bottom-10 left-4", delay: 1.2 },
  { label: "Systems", x: "bottom-1/3 -right-4", delay: 1.8 },
];

export function Hero() {
  const { t, locale } = useLanguage();
  const Arrow = locale === "ar" ? ArrowLeft : ArrowRight;

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-24 pb-16"
    >
      <GridGlow />

      <div className="container-nexa grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
        {/* Copy */}
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
            <span className="gradient-text">{t.hero.titleB}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-silver/70 sm:text-lg lg:mx-0"
          >
            {t.hero.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-9 flex flex-col items-center gap-3 sm:flex-row lg:justify-start sm:justify-center"
          >
            <a
              href={whatsappLink(t.contact.whatsappMsg)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full sm:w-auto"
            >
              <MessageCircle className="h-4 w-4" />
              {t.hero.ctaPrimary}
            </a>
            <a href="#services" className="btn-ghost w-full sm:w-auto">
              {t.hero.ctaSecondary}
              <Arrow className="h-4 w-4" />
            </a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-8 text-xs uppercase tracking-[0.18em] text-silver/40"
          >
            {t.hero.trustedBy}
          </motion.p>
        </div>

        {/* Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto hidden aspect-square w-full max-w-md lg:block"
        >
          {/* rotating rings */}
          <div className="absolute inset-0 rounded-full border border-brand-400/20" />
          <div className="absolute inset-8 rounded-full border border-brand-400/10" />
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "conic-gradient(from 0deg, rgba(46,155,255,0.0), rgba(46,155,255,0.25), rgba(56,189,248,0.0))",
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          />

          {/* center logo */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-float rounded-3xl border border-white/10 bg-white/[0.03] p-10 backdrop-blur-xl shadow-glow-lg">
              <LogoMark className="h-32 w-32" />
            </div>
          </div>

          {/* floating chips */}
          {floatingChips.map((chip) => (
            <motion.span
              key={chip.label}
              className={`absolute ${chip.x} glass rounded-full px-3 py-1.5 text-xs font-semibold text-brand-200 shadow-glow`}
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: chip.delay,
                ease: "easeInOut",
              }}
            >
              {chip.label}
            </motion.span>
          ))}
        </motion.div>
      </div>

      {/* scroll hint */}
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
