"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Reveal } from "./ui/Reveal";

/**
 * Add screenshot filenames here after uploading to /public/reviews/
 * e.g. "review-yousef.jpg", "review-ahmed.jpg" ...
 */
const REVIEW_IMAGES: string[] = [
  // filenames go here once uploaded
];

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
          <p className="mt-4 text-silver/70 sm:text-lg">
            {t.testimonials.subtitle}
          </p>
        </Reveal>

        {REVIEW_IMAGES.length > 0 ? (
          <div className="mt-14 columns-1 gap-4 sm:columns-2 lg:columns-3">
            {REVIEW_IMAGES.map((filename, i) => (
              <motion.div
                key={filename}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.5 }}
                className="mb-4 break-inside-avoid overflow-hidden rounded-2xl border border-white/10 shadow-lg"
              >
                <Image
                  src={`/reviews/${filename}`}
                  alt={`تقييم عميل ${i + 1}`}
                  width={600}
                  height={400}
                  className="w-full object-contain"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </motion.div>
            ))}
          </div>
        ) : (
          /* placeholder shown until images are uploaded */
          <p className="mt-14 text-center text-silver/40 text-sm">
            {/* images will appear here after upload */}
          </p>
        )}
      </div>
    </section>
  );
}
