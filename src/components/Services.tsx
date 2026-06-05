"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Globe,
  Code2,
  Workflow,
  BrainCircuit,
  FileText,
  Check,
  type LucideIcon,
} from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Reveal, StaggerGroup, itemVariants } from "./ui/Reveal";

const serviceImages: Record<string, string> = {
  websites: "/websites.jpg",
  systems: "/systems.jpg",
  automation: "/automation.jpg",
  ai: "/ai.jpg",
  cv: "/cv.jpg",
};

const icons: Record<string, LucideIcon> = {
  websites: Globe,
  systems: Code2,
  automation: Workflow,
  ai: BrainCircuit,
  cv: FileText,
};

// Pre-seeded star data — no Math.random() to avoid SSR/hydration mismatch
const STARS = [
  { x: 8,  y: 12, s: 1.5, o: 0.7, d: 2.1 }, { x: 22, y: 5,  s: 1.0, o: 0.5, d: 3.4 },
  { x: 38, y: 18, s: 2.0, o: 0.8, d: 1.8 }, { x: 55, y: 8,  s: 1.2, o: 0.6, d: 4.2 },
  { x: 72, y: 22, s: 1.8, o: 0.9, d: 2.7 }, { x: 85, y: 6,  s: 1.0, o: 0.4, d: 3.1 },
  { x: 15, y: 35, s: 1.5, o: 0.6, d: 2.5 }, { x: 45, y: 30, s: 2.2, o: 0.7, d: 1.9 },
  { x: 62, y: 42, s: 1.0, o: 0.5, d: 3.8 }, { x: 78, y: 35, s: 1.5, o: 0.8, d: 2.3 },
  { x: 92, y: 14, s: 1.2, o: 0.6, d: 4.5 }, { x: 5,  y: 55, s: 1.8, o: 0.4, d: 2.0 },
  { x: 30, y: 50, s: 1.0, o: 0.7, d: 3.2 }, { x: 50, y: 58, s: 2.0, o: 0.5, d: 1.7 },
  { x: 68, y: 52, s: 1.5, o: 0.9, d: 2.9 }, { x: 88, y: 48, s: 1.2, o: 0.6, d: 4.1 },
  { x: 12, y: 68, s: 1.0, o: 0.5, d: 3.6 }, { x: 35, y: 72, s: 1.8, o: 0.7, d: 2.2 },
  { x: 58, y: 65, s: 1.5, o: 0.4, d: 1.5 }, { x: 76, y: 70, s: 2.0, o: 0.8, d: 3.0 },
  { x: 95, y: 60, s: 1.2, o: 0.6, d: 2.8 }, { x: 20, y: 82, s: 1.0, o: 0.5, d: 4.3 },
  { x: 42, y: 88, s: 1.5, o: 0.7, d: 2.4 }, { x: 65, y: 85, s: 1.8, o: 0.6, d: 3.5 },
];

function RocketScene() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Deep space gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 70% 25%, rgba(46,155,255,0.22) 0%, transparent 55%), linear-gradient(170deg, #030d1e 0%, #041628 55%, #020a15 100%)",
        }}
      />

      {/* Stars */}
      {STARS.map((s, i) => (
        <motion.span
          key={i}
          aria-hidden
          className="absolute rounded-full bg-white"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.s,
            height: s.s,
            opacity: s.o,
          }}
          animate={{ opacity: [s.o * 0.3, s.o, s.o * 0.3] }}
          transition={{ duration: s.d, repeat: Infinity, ease: "easeInOut", delay: i * 0.15 }}
        />
      ))}

      {/* Orbit ring */}
      <motion.div
        aria-hidden
        className="absolute right-[-50px] top-[-50px] h-64 w-64 rounded-full"
        style={{
          background:
            "conic-gradient(from 0deg, rgba(46,155,255,0), rgba(46,155,255,0.45), rgba(56,189,248,0))",
          WebkitMask:
            "radial-gradient(farthest-side, transparent calc(100% - 1.5px), #000 calc(100% - 1.5px))",
          mask: "radial-gradient(farthest-side, transparent calc(100% - 1.5px), #000 calc(100% - 1.5px))",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />

      {/* Small inner ring */}
      <motion.div
        aria-hidden
        className="absolute right-[-25px] top-[-25px] h-36 w-36 rounded-full border border-sky-400/15"
        animate={{ rotate: -360 }}
        transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
      />

      {/* Rocket */}
      <motion.div
        aria-hidden
        className="absolute right-10 top-4"
        animate={{ y: [0, -12, 0], rotate: [0, 3, -3, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Glow halo */}
        <div
          className="absolute inset-0 -z-10 scale-[2] rounded-full blur-2xl"
          style={{ background: "rgba(56,189,248,0.25)" }}
        />
        <svg
          width="70"
          height="110"
          viewBox="0 0 70 110"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="rktBody" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#7dd3fc" />
              <stop offset="100%" stopColor="#e0f2fe" />
            </linearGradient>
            <linearGradient id="rktFin" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#1d4ed8" />
              <stop offset="100%" stopColor="#1e3a8a" />
            </linearGradient>
            <linearGradient id="rktExhaust" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="1" />
              <stop offset="40%" stopColor="#0ea5e9" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#7dd3fc" stopOpacity="0" />
            </linearGradient>
            <radialGradient id="rktWindow">
              <stop offset="0%" stopColor="#bae6fd" />
              <stop offset="100%" stopColor="#0369a1" />
            </radialGradient>
          </defs>

          {/* Exhaust flame */}
          <motion.ellipse
            cx="35" cy="99" rx="8" ry="14"
            fill="url(#rktExhaust)"
            animate={{ ry: [14, 20, 12, 18, 14], opacity: [0.9, 1, 0.7, 1, 0.9] }}
            transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Left fin */}
          <path d="M24 78 L12 100 L30 84 Z" fill="url(#rktFin)" />
          {/* Right fin */}
          <path d="M46 78 L58 100 L40 84 Z" fill="url(#rktFin)" />

          {/* Body */}
          <rect x="27" y="32" width="16" height="54" rx="8" fill="url(#rktBody)" />

          {/* Nose cone */}
          <path d="M27 35 Q35 4 43 35 Z" fill="url(#rktBody)" />

          {/* Window */}
          <circle cx="35" cy="50" r="5.5" fill="url(#rktWindow)" />
          <circle cx="35" cy="50" r="3.5" fill="#0c4a6e" />
          <circle cx="33.5" cy="48.5" r="1" fill="#bae6fd" opacity="0.9" />

          {/* Body edge glow */}
          <rect x="27" y="32" width="16" height="54" rx="8" fill="none" stroke="#93c5fd" strokeWidth="0.6" opacity="0.7" />
          <path d="M27 35 Q35 4 43 35 Z" fill="none" stroke="#93c5fd" strokeWidth="0.6" opacity="0.7" />
        </svg>
      </motion.div>

      {/* Launch trail */}
      <motion.div
        aria-hidden
        className="absolute bottom-0 right-[52px] w-[2px] rounded-full"
        style={{ background: "linear-gradient(to bottom, rgba(56,189,248,0.6), transparent)" }}
        animate={{ height: ["20%", "35%", "20%"], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

export function Services() {
  const { t } = useLanguage();

  return (
    <section id="services" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="container-nexa">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="section-eyebrow">{t.services.eyebrow}</span>
          <h2 className="mt-5 font-display text-3xl font-bold sm:text-4xl lg:text-5xl text-balance">
            {t.services.title}
          </h2>
          <p className="mt-4 text-silver/82 sm:text-lg">{t.services.subtitle}</p>
        </Reveal>

        <StaggerGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {t.services.items.map((service) => {
            const Icon = icons[service.key] ?? Globe;
            return (
              <motion.article
                key={service.key}
                variants={itemVariants}
                className="group glass-card card-hover relative overflow-hidden p-7"
              >
                {/* hover glow */}
                <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-brand-500/0 blur-2xl transition-all duration-500 group-hover:bg-brand-500/20" />

                {serviceImages[service.key] && (
                  <div className="relative mb-5 h-44 w-full overflow-hidden rounded-xl">
                    <Image
                      src={serviceImages[service.key]}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                )}

                <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-gradient shadow-glow">
                  <Icon className="h-7 w-7 text-white" />
                </div>

                <h3 className="mt-6 font-display text-xl font-bold text-white">
                  {service.title}
                </h3>
                <p className="mt-1 text-sm font-semibold gradient-text">
                  {service.slogan}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-silver/82">
                  {service.desc}
                </p>

                <ul className="mt-5 space-y-2">
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-sm text-silver/80"
                    >
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-500/15 text-brand-300">
                        <Check className="h-3 w-3" />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.article>
            );
          })}

          {/* CTA card — animated rocket launch scene */}
          <motion.div
            variants={itemVariants}
            className="glass-card relative flex flex-col items-start justify-end overflow-hidden p-7 text-white"
          >
            <RocketScene />

            <h3 className="relative font-display text-2xl font-bold">
              {t.contact.title}
            </h3>
            <p className="relative mt-3 text-sm text-white/85">
              {t.services.subtitle}
            </p>
            <a
              href="#contact"
              className="relative mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-brand-700 transition-transform hover:scale-105"
            >
              {t.nav.cta}
            </a>
          </motion.div>
        </StaggerGroup>
      </div>
    </section>
  );
}
