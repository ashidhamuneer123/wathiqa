import { SVGProps } from "react";
import type { ServiceKey } from "@/lib/content";

const S = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...p} />
);

export const ServiceIcon = ({ k }: { k: ServiceKey }) => {
  switch (k) {
    case "passport": return <S><rect x="5" y="3" width="14" height="18" rx="2" /><circle cx="12" cy="10" r="3" /><path d="M9 17h6" /></S>;
    case "emergency": return <S><path d="M2 16l20-6-3-3-6 2-6-5-2 1 4 6-5 2-2-2-1 1z" /><path d="M3 21h18" /></S>;
    case "mohre": return <S><path d="M12 3v18M5 7h14M5 7l-3 7a3 3 0 0 0 6 0zM19 7l-3 7a3 3 0 0 0 6 0zM8 21h8" /></S>;
    case "visa": return <S><rect x="3" y="5" width="18" height="14" rx="2" /><circle cx="9" cy="11" r="2" /><path d="M6 16c.5-1.5 1.7-2 3-2s2.5.5 3 2M14 10h4M14 13h3" /></S>;
    case "typing": return <S><rect x="2" y="6" width="20" height="12" rx="2" /><path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M7 14h10" /></S>;
    case "pcc": return <S><path d="M12 3l8 3v6c0 4.5-3.4 8.2-8 9-4.6-.8-8-4.5-8-9V6z" /><path d="M9 12l2 2 4-4" /></S>;
    case "translation": return <S><path d="M4 5h8M8 3v2M5 9c1.5 3 4 5 7 6M11 5c-1 4-3.5 7-7 9" /><path d="M13 21l4-9 4 9M14.5 18h5" /></S>;
    case "attestation": return <S><circle cx="12" cy="9" r="5" /><path d="M9 13.5L7 21l5-2.5L17 21l-2-7.5" /></S>;
  }
};

export const WhatsAppIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2zm5.8 14.03c-.24.68-1.42 1.31-1.96 1.36-.5.05-1.13.07-1.82-.11-.42-.13-.96-.31-1.65-.61-2.9-1.25-4.8-4.17-4.94-4.36-.14-.19-1.18-1.57-1.18-3s.75-2.13 1.02-2.42c.26-.29.58-.36.77-.36h.55c.18 0 .42-.07.65.5.24.58.82 2 .89 2.15.07.14.12.31.02.5-.1.19-.14.31-.29.48-.14.17-.3.38-.43.5-.14.14-.29.3-.13.59.17.29.74 1.22 1.59 1.98 1.09.97 2.01 1.27 2.3 1.42.29.14.46.12.62-.07.17-.19.72-.84.91-1.13.19-.29.38-.24.65-.14.26.1 1.68.79 1.97.94.29.14.48.22.55.34.07.12.07.7-.17 1.38z" />
  </svg>
);

export const Social = {
  instagram: () => <S><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".6" fill="currentColor" /></S>,
  facebook: () => <S><path d="M15 3h-2.5A4.5 4.5 0 0 0 8 7.5V10H5v4h3v7h4v-7h3l1-4h-4V7.5c0-.3.2-.5.5-.5H15z" /></S>,
  tiktok: () => <S><path d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5" /><path d="M14 3c.5 3 2.5 5 5.5 5" /></S>,
  x: () => <S><path d="M4 4l16 16M20 4L4 20" /></S>,
  linkedin: () => <S><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7" /></S>,
};

export const Phone = () => <S><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" /></S>;
export const Pin = () => <S><path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z" /><circle cx="12" cy="10" r="2.5" /></S>;
export const Clock = () => <S><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></S>;
export const Mail = () => <S><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></S>;
export const Arrow = () => <S className="flip-rtl"><path d="M5 12h14M13 6l6 6-6 6" /></S>;
