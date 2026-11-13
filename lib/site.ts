// ─────────────────────────────────────────────────────────────
//  SITE CONFIG — change these values for each client
// ─────────────────────────────────────────────────────────────
export const site = {
  nameEn: "WATHIQA",
  nameAr: "وثيقة",
  taglineEn: "Documents Clearing Services",
  taglineAr: "لخدمات متابعة المعاملات",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://wathiqa-template.vercel.app",
  // WhatsApp number in international format, digits only (no +, no spaces)
  whatsapp: "971500000000",
  phoneDisplay: "+971 50 000 0000",
  email: "info@yourdomain.ae",
  locationEn: "Dubai, United Arab Emirates",
  locationAr: "دبي، الإمارات العربية المتحدة",
  mapQuery: "Al Karama, Dubai",
  hoursEn: "Mon – Sat · 8:00 AM – 9:00 PM",
  hoursAr: "الإثنين – السبت · ٨:٠٠ ص – ٩:٠٠ م",
  socials: {
    instagram: "https://instagram.com/",
    facebook: "https://facebook.com/",
    tiktok: "https://tiktok.com/",
    x: "https://x.com/",
    linkedin: "https://linkedin.com/",
  },
};

export const waLink = (text: string) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
