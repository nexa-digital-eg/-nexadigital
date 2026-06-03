"use client";

import { useState, type FormEvent } from "react";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { whatsappLink } from "@/lib/site";

type Status = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const { t, locale } = useLanguage();
  const f = t.contact.form;
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const payload = {
      name: String(data.get("name") || "").trim(),
      phone: String(data.get("phone") || "").trim(),
      email: String(data.get("email") || "").trim(),
      service: String(data.get("service") || "").trim(),
      message: String(data.get("message") || "").trim(),
      company: String(data.get("company") || ""), // honeypot
      locale,
    };

    if (!payload.name || !payload.message || !payload.phone) {
      setStatus("error");
      setErrorMsg(f.validation);
      return;
    }

    // Build a tidy WhatsApp message and open the chat (primary delivery).
    const L =
      locale === "ar"
        ? {
            greet: "رسالة جديدة من موقع نكسا ديجيتال",
            name: "الاسم",
            phone: "الموبايل",
            email: "الإيميل",
            service: "الخدمة",
            msg: "الرسالة",
          }
        : {
            greet: "New message from the Nexa Digital website",
            name: "Name",
            phone: "Phone",
            email: "Email",
            service: "Service",
            msg: "Message",
          };

    const lines = [
      `*${L.greet}*`,
      `${L.name}: ${payload.name}`,
      `${L.phone}: ${payload.phone}`,
      payload.email ? `${L.email}: ${payload.email}` : null,
      payload.service ? `${L.service}: ${payload.service}` : null,
      `${L.msg}: ${payload.message}`,
    ].filter(Boolean) as string[];

    window.open(whatsappLink(lines.join("\n")), "_blank", "noopener,noreferrer");

    // Best-effort: also store the lead if a database is configured.
    fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).catch(() => {});

    setStatus("success");
    setErrorMsg("");
    form.reset();
  }

  if (status === "success") {
    return (
      <div className="glass-card flex flex-col items-center justify-center gap-4 p-10 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500/15 text-green-400">
          <CheckCircle2 className="h-9 w-9" />
        </span>
        <p className="text-lg font-semibold text-white">{f.success}</p>
        <button
          onClick={() => setStatus("idle")}
          className="btn-ghost mt-2"
          type="button"
        >
          {f.heading}
        </button>
      </div>
    );
  }

  const fieldClass =
    "w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-silver-light placeholder:text-silver/35 outline-none transition-colors focus:border-brand-400/60 focus:bg-white/[0.05]";
  const labelClass = "mb-1.5 block text-sm font-medium text-silver/80";

  return (
    <form onSubmit={onSubmit} className="glass-card p-6 sm:p-8" noValidate>
      <h3 className="font-display text-xl font-bold text-white">{f.heading}</h3>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className={labelClass}>
            {f.name}
          </label>
          <input
            id="cf-name"
            name="name"
            type="text"
            required
            placeholder={f.namePlaceholder}
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="cf-phone" className={labelClass}>
            {f.phone}
          </label>
          <input
            id="cf-phone"
            name="phone"
            type="tel"
            required
            dir="ltr"
            placeholder={f.phonePlaceholder}
            className={`${fieldClass} text-start`}
          />
        </div>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-email" className={labelClass}>
            {f.email}
          </label>
          <input
            id="cf-email"
            name="email"
            type="email"
            dir="ltr"
            placeholder={f.emailPlaceholder}
            className={`${fieldClass} text-start`}
          />
        </div>
        <div>
          <label htmlFor="cf-service" className={labelClass}>
            {f.service}
          </label>
          <select
            id="cf-service"
            name="service"
            defaultValue=""
            className={`${fieldClass} appearance-none`}
          >
            <option value="" disabled>
              {f.serviceDefault}
            </option>
            {t.services.items.map((s) => (
              <option key={s.key} value={s.title} className="bg-nexa-800">
                {s.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="cf-message" className={labelClass}>
          {f.message}
        </label>
        <textarea
          id="cf-message"
          name="message"
          required
          rows={4}
          placeholder={f.messagePlaceholder}
          className={`${fieldClass} resize-none`}
        />
      </div>

      {/* Honeypot: hidden from users, catches bots */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
      />

      {status === "error" && (
        <p className="mt-4 flex items-center gap-2 text-sm text-red-400">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {errorMsg}
        </p>
      )}

      <button type="submit" className="btn-primary mt-6 w-full">
        <Send className="h-4 w-4" />
        {f.submit}
      </button>
    </form>
  );
}
