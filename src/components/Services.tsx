"use client";

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

const icons: Record<string, LucideIcon> = {
  websites: Globe,
  systems: Code2,
  automation: Workflow,
  ai: BrainCircuit,
  cv: FileText,
};

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
          <p className="mt-4 text-silver/65 sm:text-lg">{t.services.subtitle}</p>
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

                <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-gradient shadow-glow">
                  <Icon className="h-7 w-7 text-white" />
                </div>

                <h3 className="mt-6 font-display text-xl font-bold text-white">
                  {service.title}
                </h3>
                <p className="mt-1 text-sm font-semibold gradient-text">
                  {service.slogan}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-silver/65">
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

          {/* CTA card to fill the grid nicely */}
          <motion.div
            variants={itemVariants}
            className="glass-card relative flex flex-col items-start justify-center overflow-hidden bg-brand-gradient p-7 text-white"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.25),transparent_60%)]" />
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
