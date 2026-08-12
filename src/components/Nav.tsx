import { useEffect, useState } from "react";
import { Btn } from "./ui";
import { useI18n } from "../i18n";
import type { Lang } from "../content";

const SECTIONS = ["home", "services", "cargo", "process", "about", "contact"] as const;

export function Logo({ className = "h-10" }: { className?: string }) {
  return (
    <img
      src="/img/IMG_20260812_225140_990.PNG"
      alt="Arvin Tajik — International Trade & Logistics"
      width={140}
      height={40}
      className={`${className} w-auto object-contain`}
    />
  );
}

export function LangSwitch({ tone = "light" }: { tone?: "light" | "dark" }) {
  const { lang, setLang, t } = useI18n();
  const opts: { key: Lang; label: string }[] = [
    { key: "en", label: "EN" },
    { key: "fa", label: "فارسی" },
  ];
  const shell = tone === "dark" ? "border-caramel/40 bg-deep/30" : "border-coffee/30 bg-cream/70";
  return (
    <div className={`inline-flex items-center rounded-full border p-0.5 ${shell}`} role="group" aria-label={t.nav.language}>
      {opts.map((o) => {
        const on = lang === o.key;
        return (
          <button
            key={o.key}
            type="button"
            onClick={() => setLang(o.key)}
            aria-pressed={on}
            lang={o.key}
            className={`rounded-full px-3 py-1.5 text-[0.7rem] font-bold tracking-wide transition-colors duration-300 ${
              on
                ? "bg-espresso text-cream shadow-[0_6px_14px_-8px_rgba(75,46,42,0.9)]"
                : tone === "dark"
                  ? "text-caramel hover:text-cream"
                  : "text-coffee hover:text-espresso"
            }`}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

export default function Nav({ onQuote }: { onQuote: () => void }) {
  const { t } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  const links = SECTIONS.map((id) => [`#${id}`, t.nav[id as keyof typeof t.nav] as string, id] as const);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (vis[0]) setActive(vis[0].target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5] },
    );
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color] duration-300 ${
        scrolled
          ? "border-b border-caramel/40 bg-cream/92 shadow-[0_10px_30px_-24px_rgba(30,26,24,0.7)] backdrop-blur-lg"
          : "border-b border-transparent"
      }`}
    >
      <nav className="container-x flex h-[72px] items-center justify-between gap-4" aria-label="Main navigation">
        <a href="#home" className="flex items-center gap-3" aria-label={t.brand.nameCased}>
          <Logo className="h-9" />
          <span className="hidden sm:block">
            <span className="block font-display text-[0.95rem] leading-tight tracking-[0.2em] text-espresso">
              {t.brand.name}
            </span>
            <span className="block text-[0.6rem] tracking-[0.14em] text-coffee uppercase">{t.brand.short}</span>
          </span>
        </a>

        <ul className="hidden items-center gap-7 lg:flex">
          {links.map(([href, label, id]) => (
            <li key={href}>
              <a
                href={href}
                aria-current={active === id ? "true" : undefined}
                className={`relative py-1 text-[0.82rem] font-medium transition-colors after:absolute after:-bottom-0.5 after:h-px after:bg-caramel after:transition-all after:duration-300 after:content-[''] ltr:after:left-0 rtl:after:right-0 ${
                  active === id
                    ? "text-espresso after:w-full"
                    : "text-coffee/80 after:w-0 hover:text-espresso hover:after:w-full"
                }`}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          <LangSwitch />
          <Btn size="sm" onClick={onQuote}>
            {t.nav.quote}
          </Btn>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <LangSwitch />
          <button
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t.nav.close : t.nav.open}
            className="flex h-11 w-11 shrink-0 flex-col items-center justify-center gap-1.5 rounded-full border border-coffee/30 bg-cream/70 transition-colors hover:border-coffee"
          >
            <span
              className={`block h-px w-5 bg-espresso transition-transform duration-300 ${open ? "translate-y-[3px] rotate-45" : ""}`}
            />
            <span
              className={`block h-px w-5 bg-espresso transition-transform duration-300 ${open ? "-translate-y-[3px] -rotate-45" : ""}`}
            />
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        className={`overflow-hidden border-t border-caramel/40 bg-cream/98 backdrop-blur-lg transition-[max-height,opacity] duration-400 lg:hidden ${
          open ? "max-h-[85vh] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="container-x flex flex-col py-4">
          {links.map(([href, label], i) => (
            <li
              key={href}
              style={{ transitionDelay: open ? `${i * 45 + 50}ms` : "0ms" }}
              className={`transition-all duration-400 ${open ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}`}
            >
              <a
                href={href}
                onClick={() => setOpen(false)}
                className="block border-b border-caramel/45 py-4 font-display text-xl text-espresso"
              >
                {label}
              </a>
            </li>
          ))}
          <li className="pt-5 pb-2">
            <Btn
              className="w-full"
              onClick={() => {
                setOpen(false);
                onQuote();
              }}
            >
              {t.nav.quote}
            </Btn>
          </li>
        </ul>
      </div>
    </header>
  );
}
