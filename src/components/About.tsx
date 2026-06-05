"use client";

import { ShieldCheck, Clock, Cpu, Headset, type LucideIcon } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Reveal } from "./ui/Reveal";

const pointIcons: LucideIcon[] = [ShieldCheck, Clock, Cpu, Headset];

/* ─── Neural-network visualization ─────────────────────────────────────────
   All positions are pre-seeded (no Math.random) to avoid SSR/hydration mismatch.
   viewBox: 360 × 300
─────────────────────────────────────────────────────────────────────────── */
const VW = 360;
const VH = 300;

const NODES = [
  // id  x    y    r   label   main
  { id: 0,  x: 180, y: 150, r: 22, label: "ND",   main: true  },
  { id: 1,  x:  58, y:  58, r: 12, label: "Web",  main: false },
  { id: 2,  x: 294, y:  48, r: 11, label: "AI",   main: false },
  { id: 3,  x:  32, y: 192, r: 12, label: "UX",   main: false },
  { id: 4,  x: 310, y: 198, r: 11, label: "Dev",  main: false },
  { id: 5,  x: 130, y: 264, r: 10, label: "Auto", main: false },
  { id: 6,  x: 248, y: 260, r:  9, label: "CV",   main: false },
  { id: 7,  x: 228, y:  92, r:  5, label: "",     main: false },
  { id: 8,  x:  92, y: 132, r:  5, label: "",     main: false },
  { id: 9,  x: 262, y: 138, r:  5, label: "",     main: false },
  { id: 10, x: 148, y:  46, r:  4, label: "",     main: false },
  { id: 11, x: 328, y: 128, r:  4, label: "",     main: false },
];

const EDGES: [number, number][] = [
  [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6],
  [1, 8], [1, 10], [2, 7], [2, 11],
  [3, 8], [4, 9], [4, 11],
  [5, 6], [5, 8], [7, 9], [10, 7],
];

const PULSES = [
  { from: 0, to: 1, dur: "2.4s", begin: "0s"    },
  { from: 1, to: 0, dur: "2.4s", begin: "1.2s"  },
  { from: 0, to: 2, dur: "3.1s", begin: "0.8s"  },
  { from: 0, to: 3, dur: "2.8s", begin: "0.4s"  },
  { from: 3, to: 0, dur: "2.8s", begin: "1.8s"  },
  { from: 0, to: 4, dur: "2.2s", begin: "1.2s"  },
  { from: 0, to: 5, dur: "3.4s", begin: "0.6s"  },
  { from: 0, to: 6, dur: "2.9s", begin: "1.8s"  },
  { from: 1, to: 8, dur: "1.9s", begin: "0.3s"  },
  { from: 2, to: 7, dur: "2.1s", begin: "1.1s"  },
  { from: 4, to: 9, dur: "2.5s", begin: "0.7s"  },
  { from: 3, to: 8, dur: "2.3s", begin: "1.4s"  },
];

function NeuralViz() {
  return (
    <svg
      viewBox={`0 0 ${VW} ${VH}`}
      className="absolute inset-0 h-full w-full"
      aria-hidden
    >
      <defs>
        <radialGradient id="ab-main" cx="40%" cy="35%">
          <stop offset="0%" stopColor="#60b4ff" />
          <stop offset="100%" stopColor="#1763ad" />
        </radialGradient>
        <radialGradient id="ab-node" cx="40%" cy="35%">
          <stop offset="0%" stopColor="#1e4a7a" />
          <stop offset="100%" stopColor="#0a1f38" />
        </radialGradient>
        <filter id="ab-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="ab-glow-sm" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* edges */}
      {EDGES.map(([a, b]) => {
        const na = NODES[a], nb = NODES[b];
        return (
          <line
            key={`e${a}-${b}`}
            x1={na.x} y1={na.y}
            x2={nb.x} y2={nb.y}
            stroke="rgba(46,155,255,0.16)"
            strokeWidth="1"
          />
        );
      })}

      {/* data pulses */}
      {PULSES.map(({ from, to, dur, begin }) => {
        const na = NODES[from], nb = NODES[to];
        return (
          <circle
            key={`p${from}-${to}-${begin}`}
            r="2.8"
            fill="#38bdf8"
            filter="url(#ab-glow-sm)"
          >
            <animateMotion
              dur={dur}
              repeatCount="indefinite"
              begin={begin}
              path={`M${na.x},${na.y} L${nb.x},${nb.y}`}
            />
            <animate
              attributeName="opacity"
              values="0;1;1;0"
              keyTimes="0;0.1;0.9;1"
              dur={dur}
              repeatCount="indefinite"
              begin={begin}
            />
          </circle>
        );
      })}

      {/* nodes */}
      {NODES.map((node) => (
        <g key={node.id} filter={node.main ? "url(#ab-glow)" : undefined}>
          {/* pulse ring on main node */}
          {node.main && (
            <>
              <circle cx={node.x} cy={node.y} r={node.r + 12} fill="none" stroke="rgba(46,155,255,0.22)" strokeWidth="1">
                <animate attributeName="r" values={`${node.r + 10};${node.r + 22};${node.r + 10}`} dur="3s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.25;0;0.25" dur="3s" repeatCount="indefinite" />
              </circle>
              <circle cx={node.x} cy={node.y} r={node.r + 6} fill="none" stroke="rgba(83,165,255,0.3)" strokeWidth="1">
                <animate attributeName="r" values={`${node.r + 4};${node.r + 14};${node.r + 4}`} dur="3s" begin="0.5s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.3;0;0.3" dur="3s" begin="0.5s" repeatCount="indefinite" />
              </circle>
            </>
          )}
          {/* ambient glow disk */}
          <circle
            cx={node.x} cy={node.y}
            r={node.r * (node.main ? 2.8 : 2.2)}
            fill={node.main ? "rgba(46,155,255,0.10)" : "rgba(30,100,180,0.06)"}
          />
          {/* node body */}
          <circle
            cx={node.x} cy={node.y} r={node.r}
            fill={node.main ? "url(#ab-main)" : "url(#ab-node)"}
            stroke={node.main ? "rgba(96,180,255,0.7)" : "rgba(46,155,255,0.22)"}
            strokeWidth={node.main ? 1.5 : 1}
          />
          {/* label */}
          {node.label && (
            <text
              x={node.x} y={node.y}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize={node.main ? 9 : 6.5}
              fontWeight="700"
              fill={node.main ? "#ffffff" : "rgba(147,197,253,0.9)"}
              fontFamily="system-ui, -apple-system, sans-serif"
              letterSpacing="0.03em"
            >
              {node.label}
            </text>
          )}
        </g>
      ))}
    </svg>
  );
}

/* ─── About section ───────────────────────────────────────────────────────── */

export function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="container-nexa grid items-center gap-12 lg:grid-cols-2">

        {/* ── Visual: neural network ─────────────────────────────────────── */}
        <Reveal from="right" className="order-2 lg:order-1">
          <div className="relative mx-auto w-full max-w-md">
            {/* ambient outer glow */}
            <div className="pointer-events-none absolute inset-4 rounded-3xl bg-brand-500/20 blur-3xl" />

            <div
              className="glass-card relative overflow-hidden rounded-3xl"
              style={{ aspectRatio: `${VW}/${VH + 20}` }}
            >
              {/* deep space bg */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse at 55% 45%, rgba(30,80,160,0.28) 0%, transparent 65%), linear-gradient(160deg, #040d1e 0%, #020916 100%)",
                }}
              />

              {/* grid overlay */}
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.07]"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(46,155,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(46,155,255,1) 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }}
              />

              {/* neural network */}
              <NeuralViz />

              {/* status badge — top left */}
              <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-black/50 px-3 py-1 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[9px] font-bold uppercase tracking-widest text-emerald-400">Network Active</span>
              </div>

              {/* stats bar — bottom overlay */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-around rounded-2xl border border-white/[0.08] bg-black/55 px-3 py-2.5 backdrop-blur-md">
                {([ ["50+", "Projects"], ["30+", "Clients"], ["100%", "Satisfaction"], ["24/7", "Support"] ] as const).map(
                  ([val, lbl]) => (
                    <div key={lbl} className="flex flex-col items-center">
                      <span className="font-display text-sm font-extrabold gradient-text">{val}</span>
                      <span className="mt-0.5 text-[8px] font-medium uppercase tracking-wider text-silver/40">{lbl}</span>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </Reveal>

        {/* ── Copy ──────────────────────────────────────────────────────── */}
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
