import { useEffect, useRef, type ReactNode } from "react";

/* Scroll reveal — one observer per section, CSS-driven */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add("in");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    );
    el.querySelectorAll(".reveal").forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);
  return ref;
}

export function Section({
  id,
  children,
  className = "",
  tone = "light",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  tone?: "light" | "cream" | "caramel" | "dark" | "espresso" | "coffee";
}) {
  const ref = useReveal<HTMLElement>();
  const tones = {
    light: "bg-cream-soft text-espresso",
    cream: "bg-cream text-espresso",
    caramel: "wash-warm text-espresso",
    dark: "on-dark wash-deep text-cream",
    espresso: "on-dark bg-espresso text-cream",
    coffee: "on-dark wash-coffee text-cream",
  }[tone];
  return (
    <section id={id} ref={ref} className={`relative py-20 sm:py-24 lg:py-28 ${tones} ${className}`}>
      {children}
    </section>
  );
}

export function Kicker({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <p className={`kicker reveal mb-4 flex items-center gap-3 ${dark ? "text-caramel" : "text-coffee"}`}>
      <span className={`inline-block h-px w-7 ${dark ? "bg-caramel/60" : "bg-coffee/45"}`} aria-hidden />
      {children}
    </p>
  );
}

export function H2({
  children,
  className = "",
  as: Tag = "h2",
}: {
  children: ReactNode;
  className?: string;
  as?: "h2" | "h3";
}) {
  return (
    <Tag className={`reveal text-[1.85rem] leading-[1.15] sm:text-4xl lg:text-[2.7rem] ${className}`}>{children}</Tag>
  );
}

export function Btn({
  as = "button",
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...rest
}: {
  as?: "button" | "a";
  variant?: "primary" | "dark" | "outline" | "outlineLight" | "link";
  size?: "sm" | "md";
  className?: string;
  children: ReactNode;
  [k: string]: unknown;
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-[0.12em] uppercase transition-[background-color,color,border-color,transform,box-shadow] duration-300 active:translate-y-0";
  const sizes = { sm: "px-5 py-2.5 text-[0.68rem]", md: "px-7 py-3.5 text-[0.72rem]" }[size];
  const variants = {
    primary:
      "bg-espresso text-cream hover:bg-coffee hover:-translate-y-0.5 shadow-[0_10px_24px_-14px_rgba(75,46,42,0.8)]",
    dark: "bg-caramel text-deep hover:bg-cream hover:-translate-y-0.5 shadow-[0_10px_24px_-16px_rgba(198,165,141,0.9)]",
    outline: "border border-coffee/40 text-coffee hover:border-coffee hover:bg-coffee hover:text-cream hover:-translate-y-0.5",
    outlineLight: "border border-caramel/50 text-caramel hover:border-caramel hover:bg-caramel hover:text-deep hover:-translate-y-0.5",
    link: "text-coffee hover:text-espresso !px-0 !py-0",
  }[variant];
  const Cmp = as as "button";
  return (
    <Cmp className={`${base} ${sizes} ${variants} ${className}`} {...rest}>
      {children}
    </Cmp>
  );
}

/* ---------------- Icons ---------------- */
const PATHS: Record<string, string> = {
  air: "M2.5 13.2L21.5 5.5l-5.2 15.2-3.1-6-6.7-1.5z",
  sea: "M3 18.5c1.9 1.4 3.8 1.4 5.7 0s3.8-1.4 5.7 0 3.8 1.4 5.6 0M5.5 15.5V7.8L12 5l6.5 2.8v7.7M12 5V2.5",
  rail: "M7 3.5h10v11H7zM9.5 18.5L6.5 22M14.5 18.5l3 3.5M7 14.5h10M9.5 7h5M9.5 11h.01M14.5 11h.01",
  road: "M3.5 7.5h10.5v9H3.5zM14 10.5h3.6l2.9 3.3v2.7H14zM7 20a1.7 1.7 0 100-3.4A1.7 1.7 0 007 20zM17.5 20a1.7 1.7 0 100-3.4 1.7 1.7 0 000 3.4z",
  multimodal: "M3 16.5h5l3-9h4M15 7.5h6M18 4.5l3 3-3 3M3 16.5l3 3M13 16.5h8",
  project: "M3 20.5h18M6 20.5V10l6-4.5 6 4.5v10.5M9.5 20.5v-5h5v5",
  sourcing: "M10.8 4.2a6.6 6.6 0 106.6 6.6 6.6 6.6 0 00-6.6-6.6zM20.5 20.5l-4.4-4.4M8 10.8h5.6M10.8 8v5.6",
  payment: "M2.5 6.5h19v11h-19zM2.5 10.5h19M6 14.5h4M17 14.5h1.5",
  customs: "M12 2.5l8 3.4v5.6c0 4.8-3.3 7.7-8 10-4.7-2.3-8-5.2-8-10V5.9zM9 12l2.2 2.2L15.5 10",
  check: "M4.5 12.5l5 5 10-11",
  phone: "M6 3.5h3.5l1.8 4.5-2.6 1.7a12.5 12.5 0 005.6 5.6l1.7-2.6 4.5 1.8V18a2.5 2.5 0 01-2.5 2.5A16.5 16.5 0 013.5 6 2.5 2.5 0 016 3.5z",
  mail: "M3 6h18v12H3zM3 7l9 6.5L21 7",
  pin: "M12 21.5s7.2-6.2 7.2-11.3a7.2 7.2 0 10-14.4 0C4.8 15.3 12 21.5 12 21.5zM12 9.4v.01",
  clock: "M12 21a9 9 0 100-18 9 9 0 000 18zM12 7v5.4l3.4 2",
  globe: "M12 21a9 9 0 100-18 9 9 0 000 18zM3.5 12h17M12 3a15 15 0 010 18 15 15 0 010-18z",
  route: "M6.5 20a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM17.5 9a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM17.5 9v3.5a5 5 0 01-5 5H6.5",
  layers: "M12 3l9 4.5-9 4.5-9-4.5L12 3zM3 12.5L12 17l9-4.5M3 17L12 21.5 21 17",
  book: "M4 4.5h6a3 3 0 013 3v12a2.5 2.5 0 00-2.5-2.5H4zM20 4.5h-6a3 3 0 00-3 3v12a2.5 2.5 0 012.5-2.5H20z",
  badge: "M12 15.5a5.5 5.5 0 100-11 5.5 5.5 0 000 11zM8.5 14.5L7 21.5l5-2.5 5 2.5-1.5-7",
  spark: "M12 3l2 6.2L20 12l-6 2.8L12 21l-2-6.2L4 12l6-2.8z",
};

export function Icon({ name, className = "h-5 w-5" }: { name: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={1.4} aria-hidden>
      <path d={PATHS[name] ?? PATHS.spark} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
