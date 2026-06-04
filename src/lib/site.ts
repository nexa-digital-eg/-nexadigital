/**
 * Central place for Nexa Digital's contact & brand details.
 * Update values here and they propagate across the whole site.
 */

export const site = {
  name: "Nexa Digital",
  nameAr: "نكسا ديجيتال",
  tagline: "Smart Solutions. Digital Future.",
  taglineAr: "حلول ذكية. مستقبل رقمي.",
  email: "nexadigital666@gmail.com",
  // Phone for direct calls (local display + tel: link)
  phone: "01068746736",
  phoneIntl: "+201068746736",
  // WhatsApp (international format without "+" for wa.me links)
  whatsapp: "01068221068",
  whatsappIntl: "201068221068",
  facebook: "https://www.facebook.com/61567643876045",
  url: "https://nexadigital.example.com",
  location: {
    en: "Egypt",
    ar: "مصر",
  },
} as const;

/** Pre-filled WhatsApp message link */
export function whatsappLink(message?: string) {
  const text = message
    ? `?text=${encodeURIComponent(message)}`
    : "";
  return `https://wa.me/${site.whatsappIntl}${text}`;
}

export const mailLink = `mailto:${site.email}`;
export const telLink = `tel:${site.phoneIntl}`;

export const socials = {
  whatsapp: whatsappLink(),
  email: mailLink,
  phone: telLink,
  facebook: site.facebook,
} as const;
