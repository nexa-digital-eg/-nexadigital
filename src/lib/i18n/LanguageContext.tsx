"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { translations, type Locale, type Dictionary } from "./translations";

type LanguageContextValue = {
  locale: Locale;
  dir: "rtl" | "ltr";
  t: Dictionary;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined
);

const STORAGE_KEY = "nexa-locale";

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Default to Arabic for the primary (Egyptian) audience.
  const [locale, setLocaleState] = useState<Locale>("ar");

  // Hydrate from saved preference / browser language on mount.
  useEffect(() => {
    const saved = (typeof window !== "undefined" &&
      window.localStorage.getItem(STORAGE_KEY)) as Locale | null;
    if (saved === "ar" || saved === "en") {
      setLocaleState(saved);
      return;
    }
    if (typeof navigator !== "undefined" && navigator.language) {
      setLocaleState(navigator.language.toLowerCase().startsWith("ar") ? "ar" : "en");
    }
  }, []);

  // Keep <html> lang/dir in sync with the active locale.
  useEffect(() => {
    const dir = translations[locale].dir;
    document.documentElement.lang = locale;
    document.documentElement.dir = dir;
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore storage errors (e.g. private mode) */
    }
  }, []);

  const toggleLocale = useCallback(() => {
    setLocale(locale === "ar" ? "en" : "ar");
  }, [locale, setLocale]);

  const value: LanguageContextValue = {
    locale,
    dir: translations[locale].dir as "rtl" | "ltr",
    t: translations[locale],
    setLocale,
    toggleLocale,
  };

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}
