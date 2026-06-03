"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/** Scattered pixel particles that converge into the center as the logo forms. */
const PARTICLES = [
  { x: -260, y: -120, s: 10, d: 0.0 },
  { x: -200, y: 90, s: 7, d: 0.05 },
  { x: 240, y: -150, s: 12, d: 0.1 },
  { x: 300, y: 60, s: 8, d: 0.15 },
  { x: -300, y: 30, s: 9, d: 0.08 },
  { x: 160, y: 200, s: 6, d: 0.2 },
  { x: -150, y: -200, s: 11, d: 0.12 },
  { x: 220, y: 170, s: 9, d: 0.18 },
  { x: -240, y: 180, s: 7, d: 0.22 },
  { x: 120, y: -220, s: 10, d: 0.06 },
  { x: 330, y: -40, s: 6, d: 0.25 },
  { x: -330, y: -60, s: 8, d: 0.16 },
  { x: 40, y: 260, s: 7, d: 0.28 },
  { x: -60, y: -270, s: 9, d: 0.1 },
];

export function IntroLoader() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const reduce = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduce) {
      setShow(false);
      return;
    }
    document.body.style.overflow = "hidden";
    const timer = setTimeout(() => setShow(false), 3400);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!show) document.body.style.overflow = "";
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="intro"
          onClick={() => setShow(false)}
          className="fixed inset-0 z-[100] flex cursor-pointer items-center justify-center overflow-hidden bg-nexa-950"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.18, filter: "blur(10px)" }}
          transition={{ duration: 0.85, ease: [0.7, 0, 0.84, 0] }}
        >
          {/* animated grid */}
          <motion.div
            aria-hidden
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "linear-gradient(rgba(46,155,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(46,155,255,0.12) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.3 }}
            transition={{ duration: 1.6, ease: "easeOut" }}
          />

          {/* pulsing core glow */}
          <motion.div
            aria-hidden
            className="absolute h-[420px] w-[420px] rounded-full bg-brand-500/25 blur-3xl"
            animate={{ opacity: [0.2, 0.7, 0.4], scale: [0.8, 1.15, 1] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* shockwave rings */}
          {[0, 1].map((i) => (
            <motion.div
              key={`wave-${i}`}
              aria-hidden
              className="absolute h-64 w-64 rounded-full border border-brand-400/40"
              initial={{ scale: 0, opacity: 0.6 }}
              animate={{ scale: [0, 3.4], opacity: [0.6, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: 0.9 + i * 0.6,
                ease: "easeOut",
              }}
            />
          ))}

          {/* counter-rotating gradient rings */}
          <motion.div
            aria-hidden
            className="absolute h-80 w-80 rounded-full sm:h-[26rem] sm:w-[26rem]"
            style={{
              background:
                "conic-gradient(from 0deg, rgba(46,155,255,0), rgba(46,155,255,0.55), rgba(56,189,248,0))",
              WebkitMask:
                "radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 2px))",
              mask: "radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 2px))",
            }}
            initial={{ opacity: 0, rotate: 0 }}
            animate={{ opacity: 1, rotate: 360 }}
            transition={{
              opacity: { duration: 0.6, delay: 0.5 },
              rotate: { duration: 3.5, repeat: Infinity, ease: "linear" },
            }}
          />
          <motion.div
            aria-hidden
            className="absolute h-64 w-64 rounded-full sm:h-80 sm:w-80"
            style={{
              background:
                "conic-gradient(from 180deg, rgba(56,189,248,0), rgba(126,188,255,0.4), rgba(46,155,255,0))",
              WebkitMask:
                "radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 2px))",
              mask: "radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 2px))",
            }}
            initial={{ opacity: 0, rotate: 0 }}
            animate={{ opacity: 1, rotate: -360 }}
            transition={{
              opacity: { duration: 0.6, delay: 0.6 },
              rotate: { duration: 5, repeat: Infinity, ease: "linear" },
            }}
          />

          {/* converging pixel particles */}
          {PARTICLES.map((p, i) => (
            <motion.span
              key={`p-${i}`}
              aria-hidden
              className="absolute rounded-[2px] bg-gradient-to-br from-brand-300 to-brand-600 shadow-glow"
              style={{ width: p.s, height: p.s }}
              initial={{ x: p.x, y: p.y, opacity: 0, scale: 0 }}
              animate={{ x: 0, y: 0, opacity: [0, 1, 0], scale: [0, 1, 0.3] }}
              transition={{ duration: 1.1, delay: p.d, ease: "easeIn" }}
            />
          ))}

          {/* the full logo with a light sweep */}
          <div className="relative flex flex-col items-center">
            <div className="relative overflow-hidden">
              <motion.img
                src="/logo-full.png"
                alt="Nexa Digital"
                className="w-72 object-contain drop-shadow-[0_0_45px_rgba(46,155,255,0.45)] sm:w-96"
                initial={{ opacity: 0, scale: 0.45, filter: "blur(24px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                transition={{
                  duration: 1,
                  delay: 0.55,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
              {/* sweeping shine */}
              <motion.div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(105deg, transparent 38%, rgba(255,255,255,0.55) 50%, transparent 62%)",
                  mixBlendMode: "screen",
                }}
                initial={{ x: "-130%" }}
                animate={{ x: "130%" }}
                transition={{ duration: 0.9, delay: 1.2, ease: "easeInOut" }}
              />
            </div>

            {/* progress bar */}
            <div className="mt-8 h-1 w-52 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full rounded-full bg-brand-gradient shadow-glow"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2.6, delay: 0.6, ease: "easeInOut" }}
              />
            </div>

            <motion.p
              className="mt-4 text-xs uppercase tracking-[0.35em] text-silver/45"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.7 }}
            >
              Smart Solutions. Digital Future.
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
