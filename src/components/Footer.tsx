"use client";

import { Phone, Mail, MessageCircle, Heart } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Logo } from "./Logo";
import { site, whatsappLink, mailLink, telLink } from "@/lib/site";

export function Footer() {
  const { t, locale } = useLanguage();
  const year = new Date().getFullYear();

  const quickLinks = [
    { id: "services", label: t.nav.services },
    { id: "about", label: t.nav.about },
    { id: "process", label: t.nav.process },
    { id: "work", label: t.nav.work },
    { id: "faq", label: t.nav.faq },
    { id: "contact", label: t.nav.contact },
  ];

  return (
    <footer className="relative border-t border-white/10 bg-nexa-950/60">
      <div className="container-nexa py-14">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* Brand */}
          <div>
            <Logo />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-silver/55">
              {t.footer.desc}
            </p>
          </div>

          {/* Quick links */}
          <nav>
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white">
              {t.footer.quickLinks}
            </h4>
            <ul className="mt-4 space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    className="text-sm text-silver/60 transition-colors hover:text-brand-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services */}
          <nav>
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white">
              {t.footer.ourServices}
            </h4>
            <ul className="mt-4 space-y-2.5">
              {t.services.items.map((service) => (
                <li key={service.key}>
                  <a
                    href="#services"
                    className="text-sm text-silver/60 transition-colors hover:text-brand-300"
                  >
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white">
              {t.footer.contactInfo}
            </h4>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href={whatsappLink(t.contact.whatsappMsg)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-silver/60 transition-colors hover:text-brand-300"
                >
                  <MessageCircle className="h-4 w-4 text-brand-300" />
                  <span dir="ltr">{site.whatsapp}</span>
                </a>
              </li>
              <li>
                <a
                  href={telLink}
                  className="flex items-center gap-3 text-sm text-silver/60 transition-colors hover:text-brand-300"
                >
                  <Phone className="h-4 w-4 text-brand-300" />
                  <span dir="ltr">{site.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={mailLink}
                  className="flex items-center gap-3 text-sm text-silver/60 transition-colors hover:text-brand-300"
                >
                  <Mail className="h-4 w-4 text-brand-300" />
                  <span dir="ltr">{site.email}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-sm text-silver/50">
            © {year} {locale === "ar" ? site.nameAr : site.name}.{" "}
            {t.footer.rights}
          </p>
          <p className="flex items-center gap-1.5 text-sm text-silver/50">
            {t.footer.madeWith}{" "}
            {locale === "ar" ? site.location.ar : site.location.en}
            <Heart className="h-3.5 w-3.5 fill-brand-500 text-brand-500" />
          </p>
        </div>
      </div>
    </footer>
  );
}
