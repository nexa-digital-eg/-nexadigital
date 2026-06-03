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
      accent: "from-green-500/30 to-emerald-500/10",
    },
    {
      icon: Phone,
      label: t.contact.call,
      value: site.phone,
      href: telLink,
      accent: "from-brand-500/30 to-cyan-500/10",
    },
    {
      icon: Mail,
      label: t.contact.email,
      value: site.email,
      href: mailLink,
      accent: "from-cyan-500/25 to-brand-600/15",
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
              <p className="mt-5 leading-relaxed text-silver/70 sm:text-lg">
                {t.contact.subtitle}
              </p>

              <div className="mt-4 flex items-center gap-2 text-sm text-silver/60">
                <MapPin className="h-4 w-4 text-brand-300" />
                {locale === "ar" ? site.location.ar : site.location.en}
              </div>

              <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-brand-300">
                {t.contact.orDirect}
              </p>
              <div className="mt-3 flex flex-col gap-3">
                {channels.map((channel) => {
                  const Icon = channel.icon;
                  return (
                    <motion.a
                      key={channel.label}
                      href={channel.href}
                      target={channel.href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      whileHover={{ x: locale === "ar" ? -6 : 6 }}
                      className={`group flex items-center gap-4 rounded-2xl border border-white/10 bg-gradient-to-br ${channel.accent} p-4 transition-colors hover:border-brand-400/40`}
                    >
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white backdrop-blur">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-sm font-semibold text-white">
                          {channel.label}
                        </span>
                        <span
                          dir="ltr"
                          className="block truncate text-sm text-silver/70 group-hover:text-silver-light"
                        >
                          {channel.value}
                        </span>
                      </span>
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
