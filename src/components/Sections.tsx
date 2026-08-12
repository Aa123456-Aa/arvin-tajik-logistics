import { CARGO_IMAGES, CONTACT, SERVICES } from "../content";
import { useI18n } from "../i18n";
import { Btn, H2, Icon, Kicker, Section } from "./ui";
import { LangSwitch, Logo } from "./Nav";

type Quote = (serviceId: string | null) => void;

/* ============================ HERO ============================ */
export function Hero({ onQuote }: { onQuote: Quote }) {
  const { t } = useI18n();
  return (
    <section id="home" className="wash-warm relative isolate overflow-hidden pt-28 pb-16 sm:pt-32 lg:pt-36 lg:pb-24">
      <div className="grain pointer-events-none absolute inset-0 -z-10 opacity-70" aria-hidden />
      <div
        className="pointer-events-none absolute -top-32 -z-10 h-[420px] w-[420px] rounded-full bg-caramel/40 blur-3xl ltr:-right-24 rtl:-left-24"
        aria-hidden
      />
      <div className="container-x grid items-center gap-12 lg:grid-cols-[1.05fr_.95fr] lg:gap-16">
        <div>
          <p className="kicker inline-flex items-center gap-2 rounded-full border border-coffee/35 bg-cream px-4 py-2 text-coffee">
            <span className="h-1.5 w-1.5 rounded-full bg-caramel" aria-hidden />
            {t.hero.badge}
          </p>
          <h1 className="mt-7 font-display text-[2.6rem] leading-[1.05] text-espresso sm:text-6xl lg:text-[4.1rem]">
            {t.brand.nameCased}
          </h1>
          <p className="mt-4 text-sm font-semibold tracking-[0.16em] text-coffee uppercase sm:text-base">
            {t.brand.role}
          </p>
          <p className="mt-5 flex flex-wrap gap-x-3 gap-y-1 text-[0.8rem] text-espresso/70">
            {t.hero.tags.map((tag, i) => (
              <span key={tag} className="flex items-center gap-3">
                {i > 0 && <span className="text-caramel">•</span>}
                {tag}
              </span>
            ))}
          </p>
          <p className="mt-7 max-w-xl text-base leading-relaxed text-espresso/75 sm:text-lg">{t.hero.lead}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Btn onClick={() => onQuote(null)}>{t.nav.quote}</Btn>
            <Btn as="a" href="#services" variant="outline">
              {t.hero.explore}
            </Btn>
          </div>
        </div>

        <div className="relative">
          <div className="relative overflow-hidden rounded-[2rem] border-2 border-cream shadow-[0_30px_60px_-40px_rgba(30,26,24,0.7)]">
            <img
              src="/img/IMG_20260812_225143_906.PNG"
              alt={t.hero.photoAlt}
              width={800}
              height={960}
              fetchPriority="high"
              className="aspect-[4/5] w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 hidden rounded-2xl border border-caramel/50 bg-cream px-5 py-4 shadow-[0_18px_40px_-28px_rgba(30,26,24,0.8)] sm:block ltr:-left-4 rtl:-right-4">
            <p className="font-display text-xl text-espresso">{t.hero.modes}</p>
            <p className="text-[0.68rem] tracking-[0.14em] text-coffee uppercase">{t.hero.modesCaption}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================ INTRO ============================ */
export function Intro() {
  const { t } = useI18n();
  return (
    <Section tone="light">
      <div className="container-x grid gap-10 lg:grid-cols-[.85fr_1.15fr] lg:gap-16">
        <div>
          <Kicker>{t.intro.kicker}</Kicker>
          <H2 className="text-espresso">{t.intro.title}</H2>
        </div>
        <div className="space-y-5 lg:pt-2">
          {t.intro.paragraphs.map((p, i) => (
            <p
              key={p}
              className={`reveal leading-relaxed ${
                i === 0
                  ? "border-caramel font-display text-2xl text-espresso ltr:border-l-2 ltr:pl-5 rtl:border-r-2 rtl:pr-5 sm:text-[1.7rem]"
                  : "text-espresso/70"
              }`}
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              {p}
            </p>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ============================ SERVICES ============================ */
export function Services({ onQuote }: { onQuote: Quote }) {
  const { t } = useI18n();
  return (
    <Section id="services" tone="cream">
      <div className="container-x">
        <div className="mb-12 max-w-2xl">
          <Kicker>{t.services.kicker}</Kicker>
          <H2 className="text-espresso">{t.services.title}</H2>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => {
            const c = t.serviceCopy[s.id];
            return (
              <article
                key={s.id}
                className="reveal group flex flex-col rounded-2xl border border-caramel/50 bg-cream-soft p-6 transition-[transform,box-shadow,border-color,background-color] duration-300 hover:-translate-y-1 hover:border-coffee hover:bg-cream hover:shadow-[0_24px_50px_-32px_rgba(75,46,42,0.85)] sm:p-7"
                style={{ transitionDelay: `${(i % 3) * 60}ms` }}
              >
                <div className="mb-6 flex items-start justify-between gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-espresso text-caramel transition-colors duration-300 group-hover:bg-coffee group-hover:text-cream">
                    <Icon name={s.icon} className="h-5 w-5" />
                  </span>
                  <span className="font-display text-2xl text-caramel">{s.no}</span>
                </div>
                <h3 className="text-xl text-espresso">{c.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-espresso/70">{c.desc}</p>

                {c.bullets && (
                  <ul className="mt-5 space-y-3 border-t border-caramel/50 pt-5">
                    {c.bullets.map((b) => (
                      <li key={b.t}>
                        <p className="text-sm font-semibold text-coffee">{b.t}</p>
                        <p className="mt-0.5 text-[0.8rem] leading-relaxed text-espresso/65">{b.d}</p>
                      </li>
                    ))}
                  </ul>
                )}

                {c.list && (
                  <ul className="mt-5 space-y-2 border-t border-caramel/50 pt-5">
                    {c.list.map((l) => (
                      <li key={l} className="flex items-start gap-2.5 text-[0.82rem] text-espresso/70">
                        <Icon name="check" className="mt-1 h-3.5 w-3.5 shrink-0 text-caramel" />
                        {l}
                      </li>
                    ))}
                  </ul>
                )}

                <button
                  onClick={() => onQuote(s.id)}
                  className="mt-7 inline-flex items-center gap-2 self-start rounded-full bg-caramel/25 px-4 py-2.5 text-[0.7rem] font-bold tracking-[0.14em] text-espresso uppercase transition-colors duration-300 hover:bg-espresso hover:text-cream"
                >
                  {t.services.quote}
                  <span className="dir-arrow" aria-hidden>
                    →
                  </span>
                  <span className="sr-only">
                    {t.services.quoteFor} {c.title}
                  </span>
                </button>
              </article>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

/* ============================ SPECIALIZED CARGO ============================ */
export function SpecialCargo() {
  const { t } = useI18n();
  return (
    <Section tone="espresso">
      <div className="container-x grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div>
          <Kicker dark>{t.special.kicker}</Kicker>
          <H2 className="text-cream">{t.special.title}</H2>
          <p className="reveal mt-6 font-display text-xl text-caramel">{t.special.lead}</p>
          <p className="reveal mt-6 max-w-lg text-sm leading-relaxed text-cream/70">{t.special.note}</p>
        </div>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {t.special.items.map((item, i) => (
            <li
              key={item}
              className="reveal flex min-h-[88px] items-end rounded-xl border border-caramel/35 bg-coffee/35 p-4 text-sm leading-snug text-cream transition-colors duration-300 hover:border-caramel hover:bg-caramel hover:text-deep"
              style={{ transitionDelay: `${(i % 3) * 50}ms` }}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

/* ============================ PROCESS ============================ */
export function Process() {
  const { t } = useI18n();
  return (
    <Section id="process" tone="caramel">
      <div className="container-x">
        <div className="mb-14 max-w-xl">
          <Kicker>{t.process.kicker}</Kicker>
          <H2 className="text-espresso">{t.process.title}</H2>
        </div>

        <ol className="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 xl:gap-4">
          <span
            className="absolute top-[9px] hidden h-px w-full bg-gradient-to-r from-coffee/20 via-coffee/60 to-coffee/20 ltr:left-0 rtl:right-0 xl:block"
            aria-hidden
          />
          {t.process.steps.map((s, i) => (
            <li
              key={s.no}
              className="reveal relative ltr:pl-7 rtl:pr-7 xl:ltr:pl-0 xl:rtl:pr-0"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <span
                className="absolute top-1.5 h-full w-px bg-coffee/25 ltr:left-0 rtl:right-0 xl:hidden"
                aria-hidden
              />
              <span className="absolute top-[3px] h-[10px] w-[10px] rounded-full border-2 border-cream bg-coffee ltr:left-[-4px] rtl:right-[-4px] xl:relative xl:top-0 xl:mb-7 xl:block xl:ltr:left-0 xl:rtl:right-0" />
              <p className="font-display text-sm tracking-[0.18em] text-coffee">{s.no}</p>
              <h3 className="mt-1 text-lg text-espresso">{s.t}</h3>
              <p className="mt-2 pb-2 text-[0.82rem] leading-relaxed text-espresso/70">{s.d}</p>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}

/* ============================ WHY ============================ */
export function Why() {
  const { t } = useI18n();
  const icons = ["badge", "spark", "route", "globe", "layers", "book"];
  return (
    <Section id="about" tone="light">
      <div className="container-x">
        <div className="mb-12 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-xl">
            <Kicker>{t.why.kicker}</Kicker>
            <H2 className="text-espresso">{t.why.title}</H2>
          </div>
          <div className="reveal flex items-center gap-4 rounded-2xl border border-caramel bg-espresso px-6 py-5">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-caramel text-deep">
              <Icon name="badge" />
            </span>
            <span>
              <span className="block text-[0.64rem] tracking-[0.16em] text-caramel uppercase">
                {t.why.qualification.t}
              </span>
              <span className="block font-display text-xl text-cream">{t.why.qualification.d}</span>
            </span>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {t.why.items.map((it, i) => (
            <div
              key={it.t}
              className="reveal rounded-2xl border border-caramel/45 bg-cream p-6 transition-[transform,border-color,background-color] duration-300 hover:-translate-y-1 hover:border-coffee sm:p-7"
              style={{ transitionDelay: `${(i % 3) * 60}ms` }}
            >
              <span className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-caramel/35 text-coffee">
                <Icon name={icons[i]} />
              </span>
              <h3 className="text-lg text-espresso">{it.t}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-espresso/70">{it.d}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ============================ CARGO EXPERIENCE ============================ */
export function CargoExperience() {
  const { t } = useI18n();
  return (
    <Section id="cargo" tone="cream">
      <div className="container-x">
        <div className="mb-12 max-w-xl">
          <Kicker>{t.cargo.kicker}</Kicker>
          <H2 className="text-espresso">{t.cargo.title}</H2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {t.cargo.items.map((c, i) => (
            <article
              key={c.t}
              className="reveal group overflow-hidden rounded-2xl border border-caramel/50 bg-cream-soft transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-coffee hover:shadow-[0_24px_50px_-32px_rgba(75,46,42,0.8)]"
              style={{ transitionDelay: `${(i % 3) * 60}ms` }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={CARGO_IMAGES[i]}
                  alt=""
                  aria-hidden
                  loading="lazy"
                  decoding="async"
                  width={640}
                  height={420}
                  className="aspect-[16/10] w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
                />
                <span
                  className="absolute inset-0 bg-espresso/15 transition-opacity duration-500 group-hover:opacity-0"
                  aria-hidden
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg leading-snug text-espresso">{c.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-espresso/70">{c.d}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ============================ SOLUTION STATEMENT ============================ */
export function SolutionStatement() {
  const { t } = useI18n();
  return (
    <Section tone="dark" className="overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.16]"
        style={{ backgroundImage: "url(/img/hero.jpg)", backgroundSize: "cover", backgroundPosition: "center" }}
        aria-hidden
      />
      <div className="container-x relative max-w-3xl text-center">
        <span className="mx-auto mb-7 block h-px w-16 bg-caramel" aria-hidden />
        <H2 className="mx-auto text-cream">{t.solution.title}</H2>
        <div className="mt-8 space-y-4">
          {t.solution.paragraphs.map((p, i) => (
            <p key={p} className="reveal leading-relaxed text-cream/75" style={{ transitionDelay: `${i * 70}ms` }}>
              {p}
            </p>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ============================ QUOTE CTA ============================ */
export function QuoteCta({ onQuote }: { onQuote: Quote }) {
  const { t } = useI18n();
  return (
    <Section tone="light" className="!py-16 sm:!py-20">
      <div className="container-x">
        <div className="reveal wash-warm flex flex-col items-center gap-7 rounded-3xl border border-caramel px-6 py-12 text-center sm:px-12">
          <div className="max-w-xl">
            <H2 className="text-espresso">{t.cta.title}</H2>
            <p className="mt-4 text-espresso/75">{t.cta.text}</p>
          </div>
          <Btn onClick={() => onQuote(null)}>{t.nav.quote}</Btn>
        </div>
      </div>
    </Section>
  );
}

/* ============================ CONTACT ============================ */
export function Contact({ onQuote }: { onQuote: Quote }) {
  const { t } = useI18n();
  const items = [
    { icon: "phone", label: t.contact.labels.phone, value: CONTACT.phone, href: CONTACT.whatsapp, ltr: true },
    { icon: "mail", label: t.contact.labels.email, value: CONTACT.email, href: `mailto:${CONTACT.email}`, ltr: true },
    { icon: "pin", label: t.contact.labels.location, value: t.contact.location, href: null, ltr: false },
  ];
  return (
    <Section id="contact" tone="coffee">
      <div className="container-x grid gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <Kicker dark>{t.contact.kicker}</Kicker>
          <H2 className="text-cream">{t.contact.title}</H2>
          <p className="reveal mt-6 max-w-lg leading-relaxed text-cream/80">{t.contact.text}</p>
          <div className="reveal mt-9 flex flex-wrap gap-3">
            <Btn variant="dark" onClick={() => onQuote(null)}>
              {t.nav.quote}
            </Btn>
            <Btn as="a" variant="outlineLight" href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer">
              {t.contact.whatsapp}
            </Btn>
          </div>
        </div>

        <div className="reveal rounded-3xl border border-caramel/45 bg-deep/35 p-7 sm:p-9">
          <p className="font-display text-2xl text-cream">{t.brand.nameCased}</p>
          <p className="mt-1 text-xs tracking-[0.14em] text-caramel uppercase">{t.brand.role}</p>
          <ul className="mt-8 space-y-3">
            {items.map((it) => {
              const inner = (
                <>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-caramel/20 text-caramel">
                    <Icon name={it.icon} className="h-4 w-4" />
                  </span>
                  <span>
                    <span className="block text-[0.64rem] tracking-[0.16em] text-cream/55 uppercase">{it.label}</span>
                    <span className="block text-sm text-cream" dir={it.ltr ? "ltr" : undefined}>
                      {it.value}
                    </span>
                  </span>
                </>
              );
              return (
                <li key={it.label}>
                  {it.href ? (
                    <a
                      href={it.href}
                      target={it.href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 rounded-2xl border border-cream/15 px-5 py-4 transition-colors duration-300 hover:border-caramel hover:bg-caramel/10"
                    >
                      {inner}
                    </a>
                  ) : (
                    <div className="flex items-center gap-4 rounded-2xl border border-cream/15 px-5 py-4">{inner}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </Section>
  );
}

/* ============================ FOOTER ============================ */
export function Footer({ onQuote }: { onQuote: Quote }) {
  const { t } = useI18n();
  const links = (["home", "services", "cargo", "process", "contact"] as const).map(
    (id) => [`#${id}`, t.nav[id] as string] as const,
  );
  return (
    <footer className="on-dark bg-deep py-14 text-cream">
      <span className="container-x mb-12 block h-px bg-gradient-to-r from-transparent via-caramel/50 to-transparent" aria-hidden />
      <div className="container-x grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <Logo className="h-10" />
            <span className="font-display text-base tracking-[0.2em]">{t.brand.name}</span>
          </div>
          <p className="mt-4 text-sm text-caramel">{t.footer.role}</p>
          <p className="mt-2 max-w-sm text-xs leading-relaxed text-cream/50">{t.footer.tag}</p>
          <div className="mt-6">
            <LangSwitch tone="dark" />
          </div>
        </div>

        <nav aria-label="Footer navigation">
          <h2 className="kicker mb-4 text-caramel">{t.footer.explore}</h2>
          <ul className="space-y-2.5 text-sm text-cream/65">
            {links.map(([h, l]) => (
              <li key={h}>
                <a href={h} className="transition-colors hover:text-caramel">
                  {l}
                </a>
              </li>
            ))}
            <li>
              <button onClick={() => onQuote(null)} className="transition-colors hover:text-caramel">
                {t.nav.quote}
              </button>
            </li>
          </ul>
        </nav>

        <div>
          <h2 className="kicker mb-4 text-caramel">{t.footer.contact}</h2>
          <ul className="space-y-2.5 text-sm text-cream/65">
            <li>
              <a href={`mailto:${CONTACT.email}`} className="transition-colors hover:text-caramel" dir="ltr">
                {CONTACT.email}
              </a>
            </li>
            <li>
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-caramel"
                dir="ltr"
              >
                {CONTACT.phone}
              </a>
            </li>
            <li>
              <a
                href={CONTACT.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-caramel"
              >
                LinkedIn
              </a>
            </li>
            <li className="text-cream/45">{t.contact.location}</li>
          </ul>
        </div>
      </div>
      <div className="container-x mt-12 border-t border-caramel/25 pt-6 text-center text-xs text-cream/40">
        {t.footer.rights}
      </div>
    </footer>
  );
}
