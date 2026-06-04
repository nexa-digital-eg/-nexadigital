"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Reveal, StaggerGroup, itemVariants } from "./ui/Reveal";
import { whatsappLink } from "@/lib/site";

// A soft gradient per card to keep the visuals lively without real images yet.
const gradients = [
  "from-brand-500/30 to-cyan-500/10",
  "from-cyan-500/25 to-brand-700/20",
  "from-brand-600/30 to-indigo-500/10",
  "from-sky-500/25 to-brand-500/15",
  "from-blue-500/25 to-cyan-400/15",
  "from-brand-400/25 to-brand-700/25",
];

export function Portfolio() {
  const { t } = useLanguage();

  return (
    <section id="work" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="container-nexa">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="section-eyebrow">{t.work.eyebrow}</span>
          <h2 className="mt-5 font-display text-3xl font-bold sm:text-4xl lg:text-5xl text-balance">
            {t.work.title}
          </h2>
          <p className="mt-4 text-silver/82 sm:text-lg">{t.work.subtitle}</p>
        </Reveal>

        <StaggerGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {t.work.items.map((item, i) => (
            <motion.a
              key={item.title}
              href={whatsappLink(t.contact.whatsappMsg)}
              target="_blank"
              rel="noopener noreferrer"
              variants={itemVariants}
              className="group glass-card card-hover relative overflow-hidden"
            >
              {/* gradient banner */}
              <div
                className={`relative flex h-44 items-center justify-center bg-gradient-to-br ${
                  gradients[i % gradients.length]
                }`}
              >
                <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_center,rgba(255,255,255,0.15)_1px,transparent_1px)] [background-size:18px_18px]" />
                <span className="font-display text-5xl font-black text-white/15">
                  0{i + 1}
                </span>
                <span className="absolute end-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white opacity-0 backdrop-blur transition-all duration-300 group-hover:opacity-100">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>

              <div className="p-6">
                <span className="text-xs font-semibold uppercase tracking-wider text-brand-300">
                  {item.category}
                </span>
                <h3 className="mt-2 font-display text-lg font-bold text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-silver/78">{item.desc}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-300 transition-colors group-hover:text-brand-200">
                  {t.work.viewProject}
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
            </motion.a>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
