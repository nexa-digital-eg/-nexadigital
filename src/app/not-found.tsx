"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ArrowLeft, Home, MessageCircle } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { whatsappLink } from "@/lib/site";
import { GridGlow } from "@/components/ui/Background";

export default function NotFound() {
  const { t, locale } = useLanguage();
  const Arrow = locale === "ar" ? ArrowLeft : ArrowRight;

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
      <GridGlow />

      {/* ambient glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[500px] w-[500px] rounded-full bg-brand-500/10 blur-[120px]" />
      </div>

      <div className="relative z-10">
        {/* 404 number */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-[140px] font-black leading-none tracking-tighter sm:text-[180px]"
          style={{
            background: "linear-gradient(135deg, #2e9bff 0%, #38bdf8 40%, rgba(46,155,255,0.2) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          404
        </motion.div>

        {/* text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h1 className="mt-2 font-display text-2xl font-bold text-white sm:text-3xl">
            {locale === "ar" ? "الصفحة غير موجودة" : "Page Not Found"}
          </h1>
          <p className="mx-auto mt-4 max-w-md text-silver/70">
            {locale === "ar"
              ? "يبدو إن الصفحة دي اتشالت أو الرابط غلط. ارجع للرئيسية أو تواصل معنا."
              : "This page doesn't exist or the link is broken. Go back home or contact us."}
          </p>
        </motion.div>

        {/* buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
        >
          <Link
            href="/"
            className="btn-primary inline-flex items-center gap-2"
          >
            <Home className="h-4 w-4" />
            {locale === "ar" ? "الصفحة الرئيسية" : "Go Home"}
          </Link>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost inline-flex items-center gap-2"
          >
            <MessageCircle className="h-4 w-4" />
            {locale === "ar" ? "تواصل معنا" : "Contact Us"}
            <Arrow className="h-4 w-4" />
          </a>
        </motion.div>
      </div>
    </div>
  );
}
