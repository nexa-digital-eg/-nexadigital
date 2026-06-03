"use client";

import { useEffect, useRef } from "react";

type P = {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: [number, number, number];
};

const COLORS: [number, number, number][] = [
  [46, 155, 255], // brand blue
  [56, 189, 248], // cyan
  [126, 188, 255], // light blue
];

/**
 * Lightweight canvas particle field — glowing blue "embers" that drift
 * upward across the hero. Pure canvas (no deps), respects reduced motion.
 */
export function Particles({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let particles: P[] = [];
    let raf = 0;

    const count = () => Math.min(90, Math.round((w * h) / 16000));

    const make = (atBottom: boolean): P => {
      const maxLife = 260 + Math.random() * 320;
      return {
        x: Math.random() * w,
        y: atBottom ? h + Math.random() * 40 : Math.random() * h,
        r: 0.8 + Math.random() * 2.4,
        vx: (Math.random() - 0.5) * 0.25,
        vy: -(0.15 + Math.random() * 0.6),
        life: atBottom ? 0 : Math.random() * maxLife,
        maxLife,
        color: COLORS[(Math.random() * COLORS.length) | 0],
      };
    };

    const resize = () => {
      const parent = canvas.parentElement;
      w = parent?.clientWidth ?? window.innerWidth;
      h = parent?.clientHeight ?? window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      particles = Array.from({ length: count() }, () => make(false));
    };

    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";

      for (const p of particles) {
        p.life += 1;
        p.x += p.vx + Math.sin((p.y + p.x) * 0.01) * 0.18;
        p.y += p.vy;

        // fade in then out over lifetime
        const t = p.life / p.maxLife;
        const fade = Math.sin(Math.min(t, 1) * Math.PI);
        const a = Math.max(0, fade) * 0.9;
        const [r, g, b] = p.color;

        // soft halo
        ctx.fillStyle = `rgba(${r},${g},${b},${a * 0.18})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 3.4, 0, Math.PI * 2);
        ctx.fill();

        // bright core
        ctx.fillStyle = `rgba(${r},${g},${b},${a})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();

        if (p.y < -20 || p.life > p.maxLife) {
          Object.assign(p, make(true));
        }
      }
      ctx.globalCompositeOperation = "source-over";
      raf = requestAnimationFrame(tick);
    };

    resize();
    raf = requestAnimationFrame(tick);
    window.addEventListener("resize", resize);

    // Pause when the tab is hidden (saves battery)
    const onVis = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
      } else {
        raf = requestAnimationFrame(tick);
      }
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={`pointer-events-none absolute inset-0 ${className}`}
    />
  );
}
