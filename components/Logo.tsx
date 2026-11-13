import { site } from "@/lib/site";

/** Dummy brand mark: a folded document inside a UAE-flag ring. Replace freely. */
export function LogoMark({ size = 44 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <defs>
        <linearGradient id="lm-ring" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#00843D" />
          <stop offset=".5" stopColor="#00843D" />
          <stop offset=".5" stopColor="#111" />
          <stop offset="1" stopColor="#111" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="29" fill="#fff" stroke="url(#lm-ring)" strokeWidth="5" />
      <rect x="3" y="20" width="7" height="24" rx="2" fill="#E1261C" />
      <path d="M22 15h15l9 9v25a3 3 0 0 1-3 3H22a3 3 0 0 1-3-3V18a3 3 0 0 1 3-3z" fill="#0B2E59" />
      <path d="M37 15v9h9" fill="#C9A23A" />
      <path d="M25 37l5 5 10-11" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Logo({ light = false }: { light?: boolean }) {
  const c = light ? "#fff" : "var(--navy)";
  return (
    <span className="logo">
      <LogoMark />
      <span className="logo-text">
        <span className="logo-names" style={{ color: c }}>
          <b>{site.nameEn}</b>
          <i className="ar">{site.nameAr}</i>
        </span>
        <small style={{ color: light ? "#cfe0d5" : "var(--muted)" }}>{site.taglineEn}</small>
      </span>
    </span>
  );
}
