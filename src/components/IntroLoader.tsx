"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/**
 * Opening splash animation: shows the Nexa Digital logo on load,
 * then reveals the site. Click anywhere to skip.
 */
export function IntroLoader() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Respect users who prefer reduced motion — skip the intro.
    const reduce = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduce) {
      setShow(false);
      return;
    }

    document.body.style.overflow = "hidden";
    const timer = setTimeout(() => setShow(false), 2600);
    return () => clearTimeout(timer);
  }, []);

  // Restore scrolling once the intro is gone.
  useEffect(() => {
    if (!show) document.body.style.overflow = "";
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="intro"
          onClick={() => setShow(false)}
          className="fixed inset-0 z-[100] flex cursor-pointer items-center justify-center bg-nexa-900"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.06 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* ambient glow */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-500/20 blur-3xl"
              animate={{ opacity: [0.3, 0.7, 0.3], scale: [0.9, 1.1, 0.9] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          {/* rotating ring */}
          <motion.div
            className="absolute h-72 w-72 rounded-full sm:h-96 sm:w-96"
            style={{
              background:
                "conic-gradient(from 0deg, rgba(46,155,255,0), rgba(46,155,255,0.5), rgba(56,189,248,0))",
              WebkitMask:
                "radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 2px))",
              mask: "radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 2px))",
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />

          <div className="relative flex flex-col items-center">
            {/* logo */}
            <motion.img
              src="/logo-lockup.png"
              alt="Nexa Digital"
              className="w-64 object-contain sm:w-80"
              initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            />

            {/* progress bar */}
            <div className="mt-8 h-0.5 w-44 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full bg-brand-gradient"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
            </div>

            <motion.p
              className="mt-4 text-xs uppercase tracking-[0.3em] text-silver/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              Smart Solutions. Digital Future.
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
