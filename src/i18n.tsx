import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { DICT, type Dict, type Lang } from "./content";

type Ctx = { lang: Lang; t: Dict; dir: "ltr" | "rtl"; isRtl: boolean; setLang: (l: Lang) => void };
const Ctx = createContext<Ctx | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    if (typeof window === "undefined") return "en";
    const saved = window.localStorage.getItem("at_lang");
    if (saved === "en" || saved === "fa") return saved;
    return navigator.language?.toLowerCase().startsWith("fa") ? "fa" : "en";
  });

  const dir: "ltr" | "rtl" = lang === "fa" ? "rtl" : "ltr";

  useEffect(() => {
    const html = document.documentElement;
    html.lang = lang;
    html.dir = dir;
    html.classList.toggle("lang-fa", lang === "fa");
    window.localStorage.setItem("at_lang", lang);

    const t = DICT[lang];
    document.title = t.meta.title;
    const meta = (selector: string, attr: [string, string], value: string) => {
      let el = document.head.querySelector<HTMLMetaElement>(selector);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr[0], attr[1]);
        document.head.appendChild(el);
      }
      el.setAttribute("content", value);
    };
    meta('meta[name="description"]', ["name", "description"], t.meta.description);
    meta('meta[property="og:title"]', ["property", "og:title"], t.meta.title);
    meta('meta[property="og:description"]', ["property", "og:description"], t.meta.description);
    meta('meta[property="og:locale"]', ["property", "og:locale"], lang === "fa" ? "fa_IR" : "en_US");
  }, [lang, dir]);

  const value = useMemo<Ctx>(() => ({ lang, t: DICT[lang], dir, isRtl: dir === "rtl", setLang }), [lang, dir]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useI18n() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useI18n must be used inside I18nProvider");
  return c;
}
