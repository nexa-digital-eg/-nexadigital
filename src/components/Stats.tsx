"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageContext";

type Stat = { value: number; suffix: string; labelKey: keyof StatLabels };
type StatLabels = {
  projects: string;
  clients: string;
  experience: string;
  support: string;
};

const stats: Stat[] = [
  { value: 120, suffix: "+", labelKey: "projects" },
  { value: 80, suffix: "+", labelKey: "clients" },
  { value: 5, suffix: "+", labelKey: "experience" },
  { value: 24, suffix: "/7", labelKey: "support" },
];

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const duration = 1400;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * to));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
}

export function Stats() {
  const { t } = useLanguage();

  return (
    <section className="relative py-12">
      <div className="container-nexa">
        <div className="glass-card grid grid-cols-2 gap-6 px-6 py-10 sm:gap-8 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.labelKey} className="text-center">
              <div className="font-display text-4xl font-extrabold gradient-text sm:text-5xl">
                <Counter to={stat.value} suffix={stat.suffix} />
              </div>
              <div className="mt-2 text-sm font-medium text-silver/82">
                {t.stats[stat.labelKey]}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
