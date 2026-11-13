"use client";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { useLang } from "./LangProvider";
import { WhatsAppIcon, Phone, Mail, Clock, Social } from "./Icons";
import { site, waLink } from "@/lib/site";

export default function Navbar() {
  const { t, lang, toggle } = useLang();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 60);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const links = [
    ["#top", lang === "ar" ? "الرئيسية" : "Home"],
    ["#services", t.nav.services],
    ["#about", lang === "ar" ? "من نحن" : "About"],
    ["#how", t.nav.how],
    ["#contact", t.nav.contact],
  ] as const;

  const socials = (["x", "facebook", "linkedin", "instagram", "tiktok"] as const).map((k) => [k, site.socials[k]] as const);

  return (
    <>
      <div className="topbar">
        <div className="container topbar-row">
          <div className="topbar-social">
            {socials.map(([k, href]) => {
              const I = Social[k];
              return (
                <a key={k} href={href} target="_blank" rel="noopener noreferrer" aria-label={k}><I /></a>
              );
            })}
          </div>
          <div className="topbar-info">
            <a href={`mailto:${site.email}`}><Mail /> {site.email}</a>
            <span><Clock /> {t.top.hours}</span>
            <button className="lang-pill" onClick={toggle} aria-label="Switch language">
              {lang === "en" ? <span className="ar">العربية</span> : "EN"}
            </button>
          </div>
        </div>
      </div>

      <header className={`nav ${scrolled ? "scrolled" : ""} ${open ? "open" : ""}`}>
        <div className="container nav-row">
          <a href="#top" aria-label="Home" onClick={() => setOpen(false)}>
            <Logo />
          </a>
          <nav className="nav-links" aria-label="Main">
            {links.map(([h, l]) => (
              <a key={h} href={h}>{l}</a>
            ))}
          </nav>
          <div className="nav-contacts">
            <a className="nav-contact" href={waLink(t.contact.greeting)} target="_blank" rel="noopener noreferrer">
              <span className="nc-ico"><WhatsAppIcon width={18} height={18} /></span>
              <span><small>{t.top.wa}</small><b dir="ltr">{site.phoneDisplay}</b></span>
            </a>
            <a className="nav-contact hide-md" href={`tel:+${site.whatsapp}`}>
              <span className="nc-ico"><Phone /></span>
              <span><small>{t.top.call}</small><b dir="ltr">{site.phoneDisplay}</b></span>
            </a>
            <a className="btn btn-green nav-cta" href="#services">{t.top.apply}</a>
          </div>
          <button className="burger" aria-label="Menu" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
            <span /><span /><span />
          </button>
        </div>
        <div className="nav-band" aria-hidden="true" />
        <div className="drawer" aria-hidden={!open}>
          <nav aria-label="Mobile">
            {links.map(([h, l], i) => (
              <a key={h} href={h} onClick={() => setOpen(false)} style={{ transitionDelay: `${60 + i * 50}ms` }}>
                {l}
              </a>
            ))}
          </nav>
          <a className="btn btn-wa btn-lg" href={waLink(t.contact.greeting)} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>
            <WhatsAppIcon /> {t.nav.cta}
          </a>
          <a className="btn btn-outline btn-lg" href={`tel:+${site.whatsapp}`}>
            <Phone /> <span dir="ltr">{site.phoneDisplay}</span>
          </a>
          <button className="btn btn-outline btn-lg" onClick={toggle}>
            {lang === "en" ? <span className="ar">العربية</span> : "English"}
          </button>
        </div>
      </header>
    </>
  );
}
