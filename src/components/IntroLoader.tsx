"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// ─── Neon particle canvas ───────────────────────────────────────────────────

interface Particle {
  x: number; y: number;
  baseX: number; baseY: number;
  vx: number; vy: number;
  radius: number;
  alpha: number;
  color: string;
}

const COLORS = [
  "#38bdf8", "#2e9bff", "#7dd3fc",
  "#0ea5e9", "#a5f3fc", "#60a5fa",
];

function NeonCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const raf = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);
    const COUNT = Math.min(160, Math.floor((W * H) / 9000));

    const pts: Particle[] = Array.from({ length: COUNT }, () => {
      const x = Math.random() * W;
      const y = Math.random() * H;
      return {
        x, y, baseX: x, baseY: y,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 0.6,
        alpha: Math.random() * 0.5 + 0.25,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      };
    });

    const MOUSE_R = 160;
    const LINK_D = 130;

    function tick() {
      ctx.clearRect(0, 0, W, H);
      const mx = mouse.current.x;
      const my = mouse.current.y;

      // connections
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < LINK_D) {
            ctx.save();
            ctx.globalAlpha = (1 - d / LINK_D) * 0.22;
            ctx.strokeStyle = pts[i].color;
            ctx.lineWidth = 0.8;
            ctx.shadowBlur = 4;
            ctx.shadowColor = pts[i].color;
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.stroke();
            ctx.restore();
          }
        }
      }

      // particles
      for (const p of pts) {
        const dx = p.x - mx;
        const dy = p.y - my;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < MOUSE_R && d > 0) {
          const force = ((MOUSE_R - d) / MOUSE_R) * 2.2;
          p.vx += (dx / d) * force;
          p.vy += (dy / d) * force;
        }

        // soft pull back
        p.vx += (p.baseX - p.x) * 0.0012;
        p.vy += (p.baseY - p.y) * 0.0012;
        p.vx *= 0.94;
        p.vy *= 0.94;
        p.x += p.vx;
        p.y += p.vy;

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.shadowBlur = 14;
        ctx.shadowColor = p.color;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      raf.current = requestAnimationFrame(tick);
    }

    tick();

    const onMove = (e: MouseEvent) => { mouse.current = { x: e.clientX, y: e.clientY }; };
    const onResize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />;
}

// ─── Intro overlay ──────────────────────────────────────────────────────────

export function IntroLoader() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setShow(false);
      return;
    }
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => setShow(false), 3600);
    return () => clearTimeout(t);
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
          className="fixed inset-0 z-[100] flex cursor-pointer items-center justify-center overflow-hidden bg-[#04080f]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.12, filter: "blur(12px)" }}
          transition={{ duration: 0.8, ease: [0.7, 0, 0.84, 0] }}
        >
          {/* interactive neon particles */}
          <NeonCanvas />

          {/* subtle animated grid overlay */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(46,155,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(46,155,255,0.06) 1px, transparent 1px)",
              backgroundSize: "56px 56px",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.4 }}
          />

          {/* pulsing core glow */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute h-[460px] w-[460px] rounded-full bg-brand-500/20 blur-[80px]"
            animate={{ scale: [0.85, 1.15, 0.85], opacity: [0.3, 0.65, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* shockwave rings */}
          {[0, 1].map((i) => (
            <motion.div
              key={i}
              aria-hidden
              className="pointer-events-none absolute h-56 w-56 rounded-full border border-sky-400/35"
              initial={{ scale: 0.4, opacity: 0.6 }}
              animate={{ scale: [0.4, 3.6], opacity: [0.6, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, delay: 1 + i * 0.75, ease: "easeOut" }}
            />
          ))}

          {/* counter-rotating conic rings */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute h-80 w-80 rounded-full sm:h-[28rem] sm:w-[28rem]"
            style={{
              background:
                "conic-gradient(from 0deg, rgba(46,155,255,0), rgba(46,155,255,0.6), rgba(56,189,248,0))",
              WebkitMask:
                "radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 2px))",
              mask: "radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 2px))",
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute h-64 w-64 rounded-full sm:h-80 sm:w-80"
            style={{
              background:
                "conic-gradient(from 180deg, rgba(56,189,248,0), rgba(126,188,255,0.45), rgba(46,155,255,0))",
              WebkitMask:
                "radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 2px))",
              mask: "radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 2px))",
            }}
            animate={{ rotate: -360 }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          />

          {/* logo + progress */}
          <div className="relative z-10 flex flex-col items-center">
            {/* glow halo behind logo */}
            <motion.div
              aria-hidden
              className="absolute inset-0 -z-10 rounded-full blur-3xl"
              animate={{
                boxShadow: [
                  "0 0 60px 20px rgba(46,155,255,0.15)",
                  "0 0 100px 40px rgba(46,155,255,0.3)",
                  "0 0 60px 20px rgba(46,155,255,0.15)",
                ],
              }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* logo image with blur-in + sweep */}
            <div className="relative overflow-hidden">
              <motion.img
                src="/logo-full.png"
                alt="Nexa Digital"
                className="w-72 object-contain drop-shadow-[0_0_50px_rgba(46,155,255,0.55)] sm:w-[26rem]"
                initial={{ opacity: 0, scale: 0.5, filter: "blur(28px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                transition={{ duration: 1.1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              />
              {/* light sweep */}
              <motion.div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.55) 50%, transparent 65%)",
                  mixBlendMode: "screen",
                }}
                initial={{ x: "-140%" }}
                animate={{ x: "140%" }}
                transition={{ duration: 0.95, delay: 1.3, ease: "easeInOut" }}
              />
            </div>

            {/* progress bar */}
            <div className="mt-9 h-[3px] w-52 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: "linear-gradient(90deg,#0ea5e9,#38bdf8,#7dd3fc)",
                  boxShadow: "0 0 10px rgba(56,189,248,0.8)",
                }}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2.8, delay: 0.6, ease: "easeInOut" }}
              />
            </div>

            <motion.p
              className="mt-4 text-[10px] font-medium uppercase tracking-[0.38em] text-sky-400/55"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.8 }}
            >
              Smart Solutions. Digital Future.
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
