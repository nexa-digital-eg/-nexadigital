"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowLeft, ArrowRight, Sparkles, MessageCircle } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { whatsappLink } from "@/lib/site";
import { GridGlow } from "./ui/Background";
import { Particles } from "./Particles";

// Service keywords that orbit around the logo
const orbitChips = ["Websites", "Systems", "Automation", "AI", "CV"];
const ORBIT_RADIUS = 172; // px, relative to the fixed-size visual
const ORBIT_DURATION = 22; // seconds per revolution

export function Hero() {
  const { t, locale } = useLanguage();
  const Arrow = locale === "ar" ? ArrowLeft : ArrowRight;

  // Mouse-based parallax tilt for the hero visual
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 150, damping: 20 });
  const smy = useSpring(my, { stiffness: 150, damping: 20 });
  const rotateY = useTransform(smx, [-0.5, 0.5], [12, -12]);
  const rotateX = useTransform(smy, [-0.5, 0.5], [-12, 12]);

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  }
  function onMouseLeave() {
    mx.set(0);
    my.set(0);
  }

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

        {/* Visual */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          style={{ rotateX, rotateY, transformPerspective: 1000 }}
          className="relative mx-auto hidden aspect-square w-full max-w-[420px] lg:block [transform-style:preserve-3d]"
        >
          {/* orbit path rings */}
          <div className="absolute inset-0 rounded-full border border-white/10" />
          <div className="absolute inset-[14%] rounded-full border border-white/[0.06]" />

          {/* rotating conic accent */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "conic-gradient(from 0deg, rgba(46,155,255,0), rgba(46,155,255,0.28), rgba(56,189,248,0))",
              WebkitMask:
                "radial-gradient(farthest-side, transparent calc(100% - 1.5px), #000 calc(100% - 1.5px))",
              mask: "radial-gradient(farthest-side, transparent calc(100% - 1.5px), #000 calc(100% - 1.5px))",
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
          />

          {/* orbiting service chips */}
          <motion.div
            className="absolute inset-0"
            animate={{ rotate: 360 }}
            transition={{ duration: ORBIT_DURATION, repeat: Infinity, ease: "linear" }}
          >
            {orbitChips.map((label, i) => {
              const angle = (360 / orbitChips.length) * i;
              return (
                <div
                  key={label}
                  className="absolute left-1/2 top-1/2"
                  style={{ transform: `rotate(${angle}deg) translateX(${ORBIT_RADIUS}px)` }}
                >
                  <div style={{ transform: "translate(-50%, -50%)" }}>
                    <motion.div
                      animate={{ rotate: [-angle, -angle - 360] }}
                      transition={{
                        duration: ORBIT_DURATION,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      <span className="block whitespace-nowrap rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-xs font-semibold text-brand-200 shadow-glow backdrop-blur-md">
                        {label}
                      </span>
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </motion.div>

          {/* center app-icon tile */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="relative rounded-[1.9rem] bg-gradient-to-br from-brand-400/70 via-brand-500/30 to-cyan-400/40 p-[2px] shadow-glow-lg"
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              style={{ z: 60 }}
            >
              {/* glow halo */}
              <div className="pointer-events-none absolute -inset-6 rounded-[2.4rem] bg-brand-500/20 blur-2xl" />
              <div className="relative overflow-hidden rounded-[1.8rem]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/icon-512.png"
                  alt="Nexa Digital"
                  className="h-40 w-40 object-cover sm:h-44 sm:w-44"
                  loading="eager"
                  decoding="async"
                />
                {/* sheen */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/15" />
              </div>
            </motion.div>
          </div>
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
