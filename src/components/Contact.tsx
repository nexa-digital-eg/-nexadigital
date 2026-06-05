"use client";

import { motion } from "framer-motion";
import { MessageCircle, Phone, Mail, MapPin } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Reveal } from "./ui/Reveal";
import { ContactForm } from "./ContactForm";
import { site, whatsappLink, mailLink, telLink } from "@/lib/site";

export function Contact() {
  const { t, locale } = useLanguage();

  const channels = [
    {
      icon: MessageCircle,
      label: t.contact.whatsapp,
      value: site.whatsapp,
      href: whatsappLink(t.contact.whatsappMsg),
      iconBg: "bg-emerald-500",
      glow: "rgba(16,185,129,0.35)",
      border: "hover:border-emerald-400/50",
      badge: "WhatsApp",
    },
    {
      icon: Phone,
      label: t.contact.call,
      value: site.phone,
      href: telLink,
      iconBg: "bg-brand-500",
      glow: "rgba(46,155,255,0.35)",
      border: "hover:border-brand-400/50",
      badge: null,
    },
    {
      icon: Mail,
      label: t.contact.email,
      value: site.email,
      href: mailLink,
      iconBg: "bg-violet-500",
      glow: "rgba(139,92,246,0.35)",
      border: "hover:border-violet-400/50",
      badge: null,
    },
  ];

  return (
    <section id="contact" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="container-nexa">
        <div className="glass-card relative overflow-hidden p-6 sm:p-10 lg:p-14">
          {/* glow */}
          <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-brand-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -right-16 h-72 w-72 rounded-full bg-cyan-500/15 blur-3xl" />

          <div className="relative grid gap-10 lg:grid-cols-2 lg:gap-14">
            {/* Left: copy + direct channels */}
            <Reveal>
              <span className="section-eyebrow">{t.contact.eyebrow}</span>
              <h2 className="mt-5 font-display text-3xl font-bold sm:text-4xl text-balance">
                {t.contact.title}
              </h2>
              <p className="mt-5 leading-relaxed text-silver/85 sm:text-lg">
                {t.contact.subtitle}
              </p>

              <div className="mt-4 flex items-center gap-2 text-sm text-silver/78">
                <MapPin className="h-4 w-4 text-brand-300" />
                {locale === "ar" ? site.location.ar : site.location.en}
              </div>

              <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-brand-300">
                {t.contact.orDirect}
              </p>
              <div className="mt-3 flex flex-col gap-3">
                {channels.map((channel, i) => {
                  const Icon = channel.icon;
                  return (
                    <motion.a
                      key={channel.label}
                      href={channel.href}
                      target={channel.href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, duration: 0.45 }}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className={`group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4 transition-all duration-300 ${channel.border}`}
                      style={{ boxShadow: "0 0 0 0 transparent" }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 32px ${channel.glow}`;
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.boxShadow = "0 0 0 0 transparent";
                      }}
                    >
                      {/* bg shimmer on hover */}
                      <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.04] to-transparent transition-transform duration-500 group-hover:translate-x-full" />

                      {/* icon */}
                      <div className="relative shrink-0">
                        <div
                          className="pointer-events-none absolute inset-0 scale-150 rounded-full blur-md opacity-50 transition-opacity duration-300 group-hover:opacity-90"
                          style={{ background: channel.glow }}
                        />
                        <span className={`relative flex h-12 w-12 items-center justify-center rounded-xl ${channel.iconBg} shadow-lg`}>
                          <Icon className="h-5 w-5 text-white" />
                        </span>
                      </div>

                      {/* text */}
                      <span className="min-w-0 flex-1">
                        <span className="flex items-center gap-2">
                          <span className="block text-sm font-bold text-white">
                            {channel.label}
                          </span>
                          {channel.badge && (
                            <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-emerald-400">
                              {channel.badge}
                            </span>
                          )}
                        </span>
                        <span
                          dir="ltr"
                          className="mt-0.5 block truncate text-sm text-silver/65 transition-colors duration-200 group-hover:text-silver-light"
                        >
                          {channel.value}
                        </span>
                      </span>

                      {/* arrow */}
                      <svg
                        className={`h-4 w-4 shrink-0 text-silver/30 transition-all duration-300 group-hover:text-white group-hover:translate-x-1 ${locale === "ar" ? "rotate-180 group-hover:-translate-x-1 group-hover:translate-x-0" : ""}`}
                        fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </motion.a>
                  );
                })}
              </div>

              <p className="mt-5 text-sm text-brand-300">{t.contact.formNote}</p>
            </Reveal>

            {/* Right: form */}
            <Reveal from="left">
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
