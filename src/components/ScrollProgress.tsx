"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Thin gradient bar at the very top that tracks scroll progress. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-brand-gradient"
      style={{ scaleX }}
      aria-hidden
    />
  );
}
