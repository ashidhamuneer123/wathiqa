"use client";
import dynamic from "next/dynamic";
import { FormEvent, useState } from "react";
import { useLang } from "./LangProvider";
import { Reveal, TiltCard, CountUp, WhenVisible, useIsMobile } from "./ui";
import { ServiceIcon, WhatsAppIcon, Arrow, Phone, Pin, Clock, Mail, Social } from "./Icons";
import { Logo } from "./Logo";
import { site, waLink } from "@/lib/site";
import type { ServiceKey } from "@/lib/content";

const SkylineScene = dynamic(() => import("./three/SkylineScene"), { ssr: false });
const StampScene = dynamic(() => import("./three/StampScene"), { ssr: false });

const SERVICE_KEYS: ServiceKey[] = ["passport", "emergency", "mohre", "visa", "typing", "pcc", "translation", "attestation"];

export function Hero() {
  const { t, lang } = useLang();
  const mobile = useIsMobile();
  return (
    <section id="top" className="hero">
      <div className="hero-pattern" aria-hidden="true" />
      <div className="container hero-row">
        <div className="hero-copy">
          <span className="kicker">{t.hero.kicker}</span>
          <h1>
            <span className="line">{t.hero.title1}</span>
            <span className="line accent">{t.hero.title2}</span>
          </h1>
          {lang === "en" ? (
            <p className="hero-ar ar" lang="ar" dir="rtl">{site.nameAr} {site.taglineAr}</p>
          ) : (
            <p className="hero-ar" lang="en" dir="ltr">{site.nameEn} {site.taglineEn}</p>
          )}
          <p className="hero-sub">{t.hero.sub}</p>
          <div className="hero-ctas">
            <a className="btn btn-wa btn-lg" href={waLink(t.contact.greeting)} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon /> {t.hero.cta1}
            </a>
            <a className="btn btn-outline btn-lg" href="#services">
              {t.hero.cta2} <Arrow />
            </a>
          </div>
          <ul className="badges">
            {t.hero.badges.map((b) => (
              <li key={b}><span className="tick" aria-hidden="true">✓</span>{b}</li>
            ))}
          </ul>
        </div>
        <div className="hero-visual">
          <div className="sun" aria-hidden="true" />
          <div className="hero-canvas">
            <SkylineScene compact={mobile} />
          </div>
          <div className="float-chip chip-a"><span className="dot" />{lang === "ar" ? "تمت الموافقة" : "Visa approved"}</div>
          <div className="float-chip chip-b"><WhatsAppIcon width={16} height={16} />{lang === "ar" ? "تحديث فوري" : "Live status on WhatsApp"}</div>
        </div>
      </div>
    </section>
  );
}

export function Authorities() {
  const { t } = useLang();
  const names = ["MOHRE", "GDRFA Dubai", "ICP", "Dubai Police", "MOFA", "Tas-heel", "Amer", "Tawjeeh", "Embassies & Consulates", "Dubai Courts"];
  return (
    <div className="marquee" aria-label={t.authorities}>
      <span className="marquee-label">{t.authorities}</span>
      <div className="marquee-track">
        <div className="marquee-inner">
          {[...names, ...names].map((n, i) => (
            <span key={i} className="marquee-item">{n}<i aria-hidden="true">◆</i></span>
          ))}
        </div>
      </div>
    </div>
  );
}

const CAT_ICON: Record<string, ServiceKey> = { mohre: "mohre", immigration: "visa", police: "passport", embassy: "emergency", typing: "typing" };

export function Services() {
  const { t } = useLang();
  const [active, setActive] = useState(0);
  const cat = t.explorer.cats[active];
  return (
    <section id="services" className="section services">
      <div className="container">
        <Reveal>
          <div className="explorer">
            <div className="explorer-head">
              <div>
                <h2>{t.explorer.title}</h2>
                <p>{t.explorer.sub}</p>
              </div>
            </div>
            <div className="explorer-tabs" role="tablist">
              {t.explorer.cats.map((c, i) => (
                <button key={c.key} role="tab" aria-selected={i === active} className={`etab ${i === active ? "on" : ""}`} onClick={() => setActive(i)}>
                  <span className="etab-ico"><ServiceIcon k={CAT_ICON[c.key]} /></span>
                  <span className="etab-name">{c.name}</span>
                </button>
              ))}
            </div>
            <div className="explorer-body" key={cat.key}>
              <h3 className="explorer-cat">{cat.name} <span className="arrow-circle"><Arrow /></span></h3>
              <ul className="svc-list">
                {cat.items.map((it, i) => (
                  <li key={it} style={{ animationDelay: `${i * 45}ms` }}>
                    <a href={waLink(`${t.contact.greeting}: ${it}`)} target="_blank" rel="noopener noreferrer">
                      <span className="svc-li-ico"><ServiceIcon k={CAT_ICON[cat.key]} /></span>
                      <span className="svc-li-name">{it}</span>
                      <span className="svc-li-go"><Arrow /></span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        <div className="svc-grid">
          {SERVICE_KEYS.slice(0, 4).map((k, i) => {
            const s = t.services.items[k];
            return (
              <Reveal key={k} delay={i * 70}>
                <TiltCard className="svc-card">
                  <div className="svc-icon"><ServiceIcon k={k} /></div>
                  <span className="svc-tag">{s.tag}</span>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                  <a className="svc-link" href={waLink(`${t.contact.greeting}: ${s.title}`)} target="_blank" rel="noopener noreferrer">
                    <WhatsAppIcon width={18} height={18} /> {t.services.ask}
                  </a>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function About() {
  const { lang } = useLang();
  const ar = lang === "ar";
  const points = ar
    ? ["مكتب مرخّص في دبي", "فريق علاقات حكومية ذو خبرة", "خدمة بالعربية والإنجليزية ولغات أخرى", "متابعة كل معاملة حتى الإنجاز"]
    : ["Licensed office in Dubai", "Experienced PRO / government-relations team", "Service in Arabic, English and more", "Every file followed up until it is done"];
  return (
    <section id="about" className="section about">
      <div className="container about-row">
        <Reveal className="about-media">
          {/* Replace /public/images/about-main.jpg and about-small.jpg with your own photos */}
          <TiltCard className="about-img-main">
            <img src="/images/about-main.jpg" alt={ar ? "مكتبنا في دبي" : "Our service counter in Dubai"} loading="lazy" />
          </TiltCard>
          <div className="about-img-small">
            <img src="/images/about-small.jpg" alt={ar ? "فريقنا" : "Our team"} loading="lazy" />
          </div>
          <div className="about-badge">
            <b>{ar ? "+١٠" : "10+"}</b>
            <span>{ar ? "سنوات خبرة" : "Years of experience"}</span>
          </div>
        </Reveal>
        <Reveal>
          <span className="kicker">{ar ? "من نحن" : "About us"}</span>
          <h2 className="h2">{ar ? "شريكك الموثوق لكل معاملة حكومية في الإمارات." : "Your trusted partner for every government transaction in the UAE."}</h2>
          <p className="muted">
            {ar
              ? "نساعد الأفراد والعائلات والشركات على إنجاز معاملاتهم مع الجهات الحكومية بسرعة ودقة، دون عناء الطوابير أو الأخطاء في الطلبات."
              : "We help individuals, families and companies complete their government paperwork quickly and correctly — no queues, no rejected applications, no guesswork."}
          </p>
          <ul className="about-points">
            {points.map((p) => (
              <li key={p}><span className="tick" aria-hidden="true">✓</span>{p}</li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

export function HowItWorks() {
  const { t } = useLang();
  return (
    <section id="how" className="section how">
      <div className="container how-row">
        <div className="how-copy">
          <Reveal>
            <span className="kicker">{t.how.kicker}</span>
            <h2 className="h2">{t.how.title}</h2>
          </Reveal>
          <ol className="steps">
            {t.how.steps.map((s, i) => (
              <Reveal key={i} delay={i * 120}>
                <li className="step">
                  <span className="step-n">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3>{s.t}</h3>
                    <p>{s.d}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
        <WhenVisible className="how-canvas">
          <StampScene />
        </WhenVisible>
      </div>
    </section>
  );
}

export function Stats() {
  const { t } = useLang();
  return (
    <section className="stats">
      <div className="container">
        <div className="stats-grid">
          {t.stats.map((s, i) => (
            <Reveal key={i} delay={i * 90}>
              <div className="stat">
                <b><CountUp to={s.n} suffix={s.s} /></b>
                <span>{s.l}</span>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="stats-note">{t.statsNote}</p>
      </div>
    </section>
  );
}

export function Why() {
  const { t } = useLang();
  return (
    <section id="why" className="section why">
      <div className="container">
        <Reveal>
          <span className="kicker">{t.why.kicker}</span>
          <h2 className="h2">{t.why.title}</h2>
        </Reveal>
        <div className="why-grid">
          {t.why.items.map((w, i) => (
            <Reveal key={i} delay={i * 90}>
              <TiltCard className="why-card">
                <div className="cube" aria-hidden="true">
                  <span className="f1" /><span className="f2" /><span className="f3" /><span className="f4" /><span className="f5" /><span className="f6" />
                </div>
                <h3>{w.t}</h3>
                <p>{w.d}</p>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CtaBanner() {
  const { t, lang } = useLang();
  return (
    <section className="cta-band">
      <svg className="cta-skyline" viewBox="0 0 1200 160" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 160V120h40v-20h30v20h25V90h20v30h40V70h15V40h6v30h15v50h30v-35h40v35h30V95l20-20 20 20v25h35V60h10V20h4V0h2v20h4v40h10v60h40v-45h50v45h30V80h25l15-20 15 20v40h40v-30h20V50h30v70h25v-25h45v25h30V75c30 0 40 20 40 45h40V85h20v35h45V65h12V35h4v30h12v55h40v-40h30v40h40v-25h35v25h60v40z" fill="currentColor" />
      </svg>
      <div className="container cta-row">
        <div>
          <h2>{lang === "ar" ? "تحتاج إنجاز معاملتك اليوم؟" : "Need it done today?"}</h2>
          <p>{lang === "ar" ? "أرسل مستنداتك عبر واتساب وسيتواصل معك فريقنا خلال دقائق." : "Send your documents on WhatsApp and our team will get back to you within minutes."}</p>
        </div>
        <a className="btn btn-white btn-lg" href={waLink(t.contact.greeting)} target="_blank" rel="noopener noreferrer">
          <WhatsAppIcon /> {t.hero.cta1}
        </a>
      </div>
    </section>
  );
}

export function Contact() {
  const { t, lang } = useLang();
  const [form, setForm] = useState({ name: "", phone: "", service: "", message: "" });
  const submit = (e: FormEvent) => {
    e.preventDefault();
    const svc = form.service || t.services.items.passport.title;
    const lines = [
      `${t.contact.greeting}: ${svc}`,
      form.name && `${t.contact.name}: ${form.name}`,
      form.phone && `${t.contact.phone}: ${form.phone}`,
      form.message,
    ].filter(Boolean);
    window.open(waLink(lines.join("\n")), "_blank", "noopener");
  };
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(site.mapQuery)}&output=embed`;
  return (
    <section id="contact" className="section contact">
      <div className="container contact-row">
        <div className="contact-info">
          <Reveal>
            <span className="kicker">{t.contact.kicker}</span>
            <h2 className="h2">{t.contact.title}</h2>
            <p className="muted">{t.contact.sub}</p>
          </Reveal>
          <ul className="info-list">
            <li><Pin /><div><b>{t.contact.visit}</b><span>{lang === "ar" ? site.locationAr : site.locationEn}</span></div></li>
            <li><Phone /><div><b>{t.contact.call}</b><a href={`tel:+${site.whatsapp}`} dir="ltr">{site.phoneDisplay}</a></div></li>
            <li><Mail /><div><b>Email</b><a href={`mailto:${site.email}`}>{site.email}</a></div></li>
            <li><Clock /><div><b>{t.contact.hours}</b><span>{lang === "ar" ? site.hoursAr : site.hoursEn}</span></div></li>
          </ul>
          <div className="map">
            <iframe title="Map" src={mapSrc} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </div>
        </div>
        <Reveal className="form-wrap">
          <form className="form" onSubmit={submit}>
            <label>
              {t.contact.name}
              <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} autoComplete="name" />
            </label>
            <label>
              {t.contact.phone}
              <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} autoComplete="tel" dir="ltr" />
            </label>
            <label>
              {t.contact.service}
              <select value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })}>
                {SERVICE_KEYS.map((k) => (
                  <option key={k} value={t.services.items[k].title}>{t.services.items[k].title}</option>
                ))}
              </select>
            </label>
            <label>
              {t.contact.message}
              <textarea rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
            </label>
            <button type="submit" className="btn btn-wa btn-lg btn-block">
              <WhatsAppIcon /> {t.contact.send}
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  const { t } = useLang();
  const socials = Object.entries(site.socials) as [keyof typeof Social, string][];
  return (
    <footer className="footer">
      <div className="flagline" aria-hidden="true"><i /><i /><i /><i /></div>
      <div className="container footer-row">
        <Logo light />
        <div className="socials">
          {socials.map(([k, href]) => {
            const I = Social[k];
            return (
              <a key={k} href={href} target="_blank" rel="noopener noreferrer" aria-label={k}>
                <I />
              </a>
            );
          })}
          <a href={waLink(t.contact.greeting)} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
            <WhatsAppIcon width={20} height={20} />
          </a>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} {site.nameEn} · <span className="ar">{site.nameAr} {site.taglineAr}</span>. {t.footer.rights}</span>
        <span>{t.footer.template}</span>
      </div>
    </footer>
  );
}

export function WhatsAppFloat() {
  const { t } = useLang();
  return (
    <a className="wa-float" href={waLink(t.contact.greeting)} target="_blank" rel="noopener noreferrer" aria-label={t.waFloat}>
      <span className="wa-pulse" aria-hidden="true" />
      <WhatsAppIcon width={30} height={30} />
      <span className="wa-tip">{t.waFloat}</span>
    </a>
  );
}
