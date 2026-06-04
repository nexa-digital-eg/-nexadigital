"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Reveal, StaggerGroup, itemVariants } from "./ui/Reveal";

function initials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("");
}

export function Testimonials() {
  const { t } = useLanguage();

  return (
    <section className="relative py-20 sm:py-28">
      <div className="container-nexa">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="section-eyebrow">{t.testimonials.eyebrow}</span>
          <h2 className="mt-5 font-display text-3xl font-bold sm:text-4xl lg:text-5xl text-balance">
            {t.testimonials.title}
          </h2>
        </Reveal>

        <StaggerGroup className="mt-14 grid gap-6 md:grid-cols-3">
          {t.testimonials.items.map((item) => (
            <motion.figure
              key={item.name}
              variants={itemVariants}
              className="glass-card relative flex flex-col p-7"
            >
              <Quote className="h-9 w-9 text-brand-500/40" />
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-silver/80">
                “{item.quote}”
              </blockquote>

              <div className="mt-5 flex items-center gap-1 text-brand-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>

              <figcaption className="mt-5 flex items-center gap-3 border-t border-white/10 pt-5">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-gradient font-bold text-white">
                  {initials(item.name)}
                </span>
                <span>
                  <span className="block font-semibold text-white">
                    {item.name}
                  </span>
                  <span className="block text-xs text-silver/55">
                    {item.role}
                  </span>
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
