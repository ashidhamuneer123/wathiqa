"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { dict, Dict, Lang } from "@/lib/content";

const Ctx = createContext<{ lang: Lang; t: Dict; toggle: () => void }>({
  lang: "en",
  t: dict.en,
  toggle: () => {},
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("lang");
      if (saved === "ar" || saved === "en") setLang(saved);
    } catch {}
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    try {
      localStorage.setItem("lang", lang);
    } catch {}
  }, [lang]);

  return (
    <Ctx.Provider value={{ lang, t: dict[lang], toggle: () => setLang((l) => (l === "en" ? "ar" : "en")) }}>
      {children}
    </Ctx.Provider>
  );
}

export const useLang = () => useContext(Ctx);
