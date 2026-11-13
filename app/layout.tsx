import type { Metadata, Viewport } from "next";
import "@fontsource/montserrat/500.css";
import "@fontsource/montserrat/600.css";
import "@fontsource/montserrat/700.css";
import "@fontsource/montserrat/800.css";
import "@fontsource/noto-kufi-arabic/500.css";
import "@fontsource/noto-kufi-arabic/700.css";
import "@fontsource/noto-kufi-arabic/800.css";
import "./globals.css";
import { LangProvider } from "@/components/LangProvider";
import { site } from "@/lib/site";

const title = `${site.nameEn} | ${site.taglineEn} in Dubai — ${site.nameAr}`;
const description =
  "Visa cancellation, MOHRE labour cases, emergency certificates, lost passport reports, PCC, typing and legal translation in Dubai. Fast follow-up on WhatsApp.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title,
  description,
  keywords: ["document clearing Dubai", "typing centre Dubai", "visa cancellation", "MOHRE", "GDRFA", "emergency certificate", "PCC Dubai", "Tasheel", "Amer"],
  openGraph: {
    type: "website",
    url: site.url,
    siteName: `${site.nameEn} ${site.nameAr}`,
    title,
    description,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: `${site.nameEn} ${site.taglineEn}` }],
    locale: "en_AE",
    alternateLocale: ["ar_AE"],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/og.png"] },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#00843D",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: `${site.nameEn} ${site.taglineEn}`,
    alternateName: `${site.nameAr} ${site.taglineAr}`,
    url: site.url,
    telephone: site.phoneDisplay,
    email: site.email,
    address: { "@type": "PostalAddress", addressLocality: "Dubai", addressCountry: "AE" },
    sameAs: Object.values(site.socials),
  };
  return (
    <html lang="en" dir="ltr">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  );
}
