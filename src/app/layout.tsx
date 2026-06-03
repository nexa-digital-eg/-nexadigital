import type { Metadata, Viewport } from "next";
import { Cairo, Outfit, Sora } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import { site } from "@/lib/site";

// Arabic (and Latin fallback) — handles RTL content.
const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  display: "swap",
});

// Body text (Latin) — clean, premium, modern.
const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

// Display / headings (Latin) — premium modern.
const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description:
    "Nexa Digital is a full-service digital agency: websites, custom systems, automation, AI solutions, and professional CV & LinkedIn services. نكسا ديجيتال — حلول ذكية ومستقبل رقمي.",
  keywords: [
    "Nexa Digital",
    "نكسا ديجيتال",
    "web development",
    "تصميم مواقع",
    "AI solutions",
    "الذكاء الاصطناعي",
    "automation",
    "أتمتة",
    "systems",
    "أنظمة",
    "CV",
    "LinkedIn",
    "Egypt",
    "مصر",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  openGraph: {
    type: "website",
    title: `${site.name} — ${site.tagline}`,
    description:
      "Websites, Systems, Automation, AI Solutions, and CV & LinkedIn. Smart Solutions. Digital Future.",
    siteName: site.name,
    locale: "ar_EG",
    alternateLocale: "en_US",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: "Smart Solutions. Digital Future.",
    images: ["/og.jpg"],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: "/icon-512.png", type: "image/png", sizes: "256x256" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/icon-512.png" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#050816",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body
        className={`${cairo.variable} ${outfit.variable} ${sora.variable} font-sans`}
      >
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
