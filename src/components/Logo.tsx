"use client";

import { site } from "@/lib/site";
import { useLanguage } from "@/lib/i18n/LanguageContext";

/** The "ND" monogram, inspired by the Nexa Digital logo. */
export function LogoMark({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      role="img"
      aria-label="Nexa Digital"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="nd-blue" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#53a5ff" />
          <stop offset="100%" stopColor="#1763ad" />
        </linearGradient>
        <linearGradient id="nd-silver" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#eef2f8" />
          <stop offset="100%" stopColor="#9fb0c6" />
        </linearGradient>
      </defs>

      {/* pixel / dissolve accent */}
      <g fill="url(#nd-blue)" opacity="0.9">
        <rect x="2" y="10" width="5" height="5" rx="1" />
        <rect x="9" y="4" width="6" height="6" rx="1" />
        <rect x="3" y="20" width="4" height="4" rx="1" opacity="0.6" />
      </g>

      {/* Letter N */}
      <path
        d="M14 56V12h9l16 24V12h9"
        stroke="url(#nd-blue)"
        strokeWidth="9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Letter D */}
      <path
        d="M40 12h8c9.4 0 16 8.5 16 22S57.4 56 48 56h-8"
        stroke="url(#nd-silver)"
        strokeWidth="9"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

/** Full logo: monogram + wordmark. */
export function Logo({
  showText = true,
  className = "",
}: {
  showText?: boolean;
  className?: string;
}) {
  const { locale } = useLanguage();
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark className="h-9 w-9 shrink-0 drop-shadow-[0_0_12px_rgba(46,155,255,0.45)]" />
      {showText && (
        <span className="flex flex-col leading-none">
          <span className="font-display text-lg font-bold tracking-wide">
            <span className="gradient-text">NEXA</span>{" "}
            <span className="silver-text">DIGITAL</span>
          </span>
          <span className="mt-0.5 text-[9px] font-medium uppercase tracking-[0.25em] text-silver/50">
            {locale === "ar" ? site.taglineAr : site.tagline}
          </span>
        </span>
      )}
    </span>
  );
}
