import type { Metadata, Viewport } from "next";
import { Cairo, Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import { site } from "@/lib/site";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
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
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: "Smart Solutions. Digital Future.",
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/icon.svg" }],
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
        className={`${cairo.variable} ${inter.variable} ${spaceGrotesk.variable} font-sans`}
      >
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
