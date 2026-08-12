import { useEffect, useMemo, useRef, useState } from "react";
import { CONTACT, SERVICES, getCustomerFields, resolveFields, type Field } from "../content";
import { useI18n } from "../i18n";
import { Btn, Icon } from "./ui";

const ALLOWED = [".pdf", ".jpg", ".jpeg", ".png", ".doc", ".docx", ".xls", ".xlsx"];
const MAX_SIZE = 5 * 1024 * 1024;
const MAX_FILES = 5;

type Values = Record<string, string>;
type Channel = "email" | "whatsapp" | "telegram";

function buildInquiryText(
  serviceTitle: string | undefined,
  shipmentType: string | null | undefined,
  customerFields: Field[],
  activeFields: Field[],
  values: Values,
  chips: Record<string, string[]>,
  fileNames: string[],
) {
  return [
    `Service: ${serviceTitle ?? ""}`,
    shipmentType ? `Shipment type: ${shipmentType}` : "",
    ...[...customerFields, ...activeFields]
      .map((fd) =>
        fd.type === "chips"
          ? chips[fd.name]?.length
            ? `${fd.label}: ${chips[fd.name].join(", ")}`
            : ""
          : values[fd.name]
            ? `${fd.label}: ${values[fd.name]}`
            : "",
      )
      .filter(Boolean),
    fileNames.length ? `Documents: ${fileNames.join(", ")}` : "",
  ]
    .filter(Boolean)
    .join("\n");
}

export default function InquiryModal({
  open,
  serviceId,
  onClose,
  onSelectService,
}: {
  open: boolean;
  serviceId: string | null;
  onClose: () => void;
  onSelectService: (id: string) => void;
}) {
  const { t, lang, dir } = useI18n();
  const f = t.form;
  const service = useMemo(() => SERVICES.find((s) => s.id === serviceId) ?? null, [serviceId]);
  const copy = service ? t.serviceCopy[service.id] : null;
  const panelRef = useRef<HTMLDivElement>(null);

  const [variant, setVariant] = useState<string | null>(null);
  const [values, setValues] = useState<Values>({});
  const [chips, setChips] = useState<Record<string, string[]>>({});
  const [files, setFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [channel, setChannel] = useState<Channel>("email");

  const customerFields = useMemo(() => getCustomerFields(lang), [lang]);

  useEffect(() => {
    if (!open) return;
    setVariant(service?.variants ? null : "default");
    setValues({});
    setChips({});
    setFiles([]);
    setErrors({});
    setDone(false);
    setSending(false);
    setChannel("email");
  }, [serviceId, open, service]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && panelRef.current) {
        const nodes = panelRef.current.querySelectorAll<HTMLElement>(
          'a[href],button:not([disabled]),input,select,textarea,[tabindex]:not([tabindex="-1"])',
        );
        if (!nodes.length) return;
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        } else if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    const timer = setTimeout(() => panelRef.current?.querySelector<HTMLElement>("input,button")?.focus(), 80);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      clearTimeout(timer);
    };
  }, [open, onClose]);

  if (!open) return null;

  const activeFields: Field[] = service
    ? service.variants
      ? resolveFields(service.variants.find((v) => v.key === variant)?.defs ?? [], lang)
      : resolveFields(service.defs ?? [], lang)
    : [];

  const set = (name: string, v: string) => {
    setValues((p) => ({ ...p, [name]: v }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: "" }));
  };

  const toggleChip = (field: string, opt: string) =>
    setChips((p) => {
      const cur = p[field] ?? [];
      return { ...p, [field]: cur.includes(opt) ? cur.filter((x) => x !== opt) : [...cur, opt] };
    });

  const onFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const picked = Array.from(e.target.files ?? []);
    const valid = picked.filter((x) => x.size <= MAX_SIZE && ALLOWED.some((ext) => x.name.toLowerCase().endsWith(ext)));
    setErrors((p) => ({ ...p, files: valid.length !== picked.length ? f.errFiles : "" }));
    setFiles(valid.slice(0, MAX_FILES));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    [...customerFields, ...activeFields].forEach((fd) => {
      if (fd.required && !values[fd.name]?.trim()) e[fd.name] = f.errRequired;
    });
    if (values.email && !/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(values.email.trim())) e.email = f.errEmail;
    setErrors(e);
    if (Object.keys(e).length) {
      const first = panelRef.current?.querySelector<HTMLElement>(`[name="${Object.keys(e)[0]}"]`);
      first?.focus();
      first?.scrollIntoView({ block: "center", behavior: "smooth" });
    }
    return !Object.keys(e).length;
  };

  const deliver = async (text: string, subject: string) => {
    if (channel === "whatsapp") {
      window.open(`https://wa.me/${CONTACT.phoneRaw}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
      return;
    }
    if (channel === "telegram") {
      window.open(`https://t.me/arvin_tajik?text=${encodeURIComponent(text)}`, "_blank", "noopener");
      return;
    }
    // email — try API first, then mailto fallback
    try {
      const body = new FormData();
      body.append(
        "payload",
        JSON.stringify({
          to: CONTACT.email,
          subject,
          service: copy?.title,
          serviceId: service?.id,
          language: lang,
          shipmentType: service?.variants ? variant : undefined,
          channel: "email",
          ...values,
          ...chips,
          fileNames: files.map((x) => x.name),
        }),
      );
      files.forEach((file, i) => body.append(`file_${i}`, file));
      const res = await fetch("/api/inquiry", { method: "POST", body });
      if (!res.ok) throw new Error();
    } catch {
      window.open(
        `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`,
        "_blank",
        "noopener",
      );
    }
  };

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (values._hp) return; // honeypot
    if (!validate()) return;
    setSending(true);
    const subject = `New ${copy?.title} Inquiry — Arvin Tajik`;
    const text = buildInquiryText(
      copy?.title,
      service?.variants ? variant : undefined,
      customerFields,
      activeFields,
      values,
      chips,
      files.map((x) => x.name),
    );
    await deliver(text, subject);
    setSending(false);
    setDone(true);
  };

  const inputCls =
    "w-full rounded-xl border bg-cream-soft px-4 py-3 text-sm text-espresso transition-colors placeholder:text-espresso/35 focus:border-coffee focus:bg-white";

  const renderField = (fd: Field) => {
    const err = errors[fd.name];
    const border = err ? "border-red-500" : "border-caramel/60";
    if (fd.type === "chips") {
      const sel = chips[fd.name] ?? [];
      return (
        <fieldset key={fd.name} className="sm:col-span-2">
          <legend className="mb-2 text-xs font-semibold text-coffee">{fd.label}</legend>
          <div className="flex flex-wrap gap-2">
            {fd.options?.map((o) => {
              const on = sel.includes(o);
              return (
                <button
                  type="button"
                  key={o}
                  aria-pressed={on}
                  onClick={() => toggleChip(fd.name, o)}
                  className={`rounded-full border px-4 py-2 text-xs font-medium transition-colors duration-300 ${
                    on
                      ? "border-espresso bg-espresso text-cream"
                      : "border-caramel/70 bg-cream-soft text-espresso/75 hover:border-coffee hover:bg-caramel/25"
                  }`}
                >
                  {o}
                </button>
              );
            })}
          </div>
        </fieldset>
      );
    }

    // Combobox: select from list OR type a custom value (used for Incoterms)
    if (fd.type === "combobox") {
      const listId = `list_${fd.name}`;
      return (
        <div key={fd.name} className={fd.full ? "sm:col-span-2" : ""}>
          <label htmlFor={`fld_${fd.name}`} className="mb-1.5 block text-xs font-semibold text-coffee">
            {fd.label}
            {fd.required && <span className="text-caramel"> *</span>}
          </label>
          <input
            id={`fld_${fd.name}`}
            name={fd.name}
            list={listId}
            dir="ltr"
            placeholder={fd.placeholder}
            className={`${inputCls} ${border} text-start`}
            value={values[fd.name] ?? ""}
            onChange={(e) => set(fd.name, e.target.value)}
            aria-invalid={!!err}
            aria-describedby={fd.hint ? `hint_${fd.name}` : undefined}
            autoComplete="off"
          />
          <datalist id={listId}>
            {fd.options?.map((o) => (
              <option key={o} value={o} />
            ))}
          </datalist>
          {fd.hint && !err && (
            <p id={`hint_${fd.name}`} className="mt-1 text-[0.7rem] text-espresso/50">
              {fd.hint}
            </p>
          )}
          {err && <p className="mt-1 text-[0.72rem] font-medium text-red-600">{err}</p>}
        </div>
      );
    }

    const isLatin =
      fd.type === "email" ||
      fd.type === "tel" ||
      fd.type === "number" ||
      fd.type === "date" ||
      fd.name === "hsCode";
    return (
      <div key={fd.name} className={fd.full || fd.type === "textarea" ? "sm:col-span-2" : ""}>
        <label htmlFor={`fld_${fd.name}`} className="mb-1.5 block text-xs font-semibold text-coffee">
          {fd.label}
          {fd.required && <span className="text-caramel"> *</span>}
        </label>
        {fd.type === "textarea" ? (
          <textarea
            id={`fld_${fd.name}`}
            name={fd.name}
            rows={3}
            className={`${inputCls} ${border}`}
            value={values[fd.name] ?? ""}
            onChange={(e) => set(fd.name, e.target.value)}
            aria-invalid={!!err}
            aria-describedby={fd.hint ? `hint_${fd.name}` : undefined}
          />
        ) : fd.type === "select" ? (
          <select
            id={`fld_${fd.name}`}
            name={fd.name}
            className={`${inputCls} ${border}`}
            value={values[fd.name] ?? ""}
            onChange={(e) => set(fd.name, e.target.value)}
            aria-invalid={!!err}
          >
            <option value="">{f.select}</option>
            {fd.options?.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        ) : (
          <input
            id={`fld_${fd.name}`}
            name={fd.name}
            type={fd.type ?? "text"}
            dir={isLatin ? "ltr" : undefined}
            placeholder={fd.placeholder}
            className={`${inputCls} ${border} ${isLatin ? "text-start" : ""}`}
            value={values[fd.name] ?? ""}
            onChange={(e) => set(fd.name, e.target.value)}
            aria-invalid={!!err}
            aria-describedby={fd.hint ? `hint_${fd.name}` : undefined}
          />
        )}
        {fd.hint && !err && (
          <p id={`hint_${fd.name}`} className="mt-1 text-[0.7rem] text-espresso/50">
            {fd.hint}
          </p>
        )}
        {err && <p className="mt-1 text-[0.72rem] font-medium text-red-600">{err}</p>}
      </div>
    );
  };

  const channels: { key: Channel; label: string; detail: string }[] = [
    { key: "email", label: f.sendEmail, detail: CONTACT.email },
    { key: "whatsapp", label: f.sendWhatsapp, detail: CONTACT.phone },
    { key: "telegram", label: f.sendTelegram, detail: CONTACT.telegramHandle },
  ];

  return (
    <div
      className="fade-in fixed inset-0 z-[100] overflow-y-auto bg-deep/75 p-0 backdrop-blur-sm sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="inq-title"
      dir={dir}
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        ref={panelRef}
        className="modal-in mx-auto w-full max-w-3xl overflow-hidden bg-cream shadow-2xl sm:my-4 sm:rounded-3xl"
      >
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-caramel/40 bg-espresso px-5 py-5 text-cream sm:px-8">
          <div>
            <p className="kicker text-caramel">{done ? f.confirm : f.eyebrow}</p>
            <h2 id="inq-title" className="mt-1.5 text-xl sm:text-2xl">
              {done ? f.successTitle : (copy?.formTitle ?? f.pickTitle)}
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label={f.closeLabel}
            className="shrink-0 rounded-full border border-caramel/50 px-3 py-2 text-xs text-caramel transition-colors hover:bg-caramel hover:text-deep"
          >
            ✕
          </button>
        </div>

        {done ? (
          <div className="px-6 py-16 text-center sm:px-12">
            <div className="mx-auto mb-7 flex h-20 w-20 items-center justify-center rounded-full border-2 border-caramel bg-cream-soft">
              <svg viewBox="0 0 24 24" className="h-9 w-9 stroke-coffee" fill="none" strokeWidth={2}>
                <path className="check-path" d="M4.5 12.5l5 5 10-11" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3 className="text-2xl text-espresso">{f.successHead}</h3>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-espresso/70">{f.successBody}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Btn onClick={onClose}>{f.close}</Btn>
              <Btn as="a" variant="outline" href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer">
                {f.successWhatsapp}
              </Btn>
              <Btn as="a" variant="outline" href={CONTACT.telegram} target="_blank" rel="noopener noreferrer">
                {f.sendTelegram}
              </Btn>
            </div>
          </div>
        ) : !service ? (
          <div className="px-5 py-8 sm:px-8">
            <p className="mb-6 text-sm text-espresso/70">{f.pickIntro}</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {SERVICES.map((s) => {
                const c = t.serviceCopy[s.id];
                return (
                  <button
                    key={s.id}
                    onClick={() => onSelectService(s.id)}
                    className="group flex items-start gap-3 rounded-2xl border border-caramel/60 bg-cream-soft p-4 text-start transition-all duration-300 hover:-translate-y-0.5 hover:border-coffee hover:bg-caramel/20 hover:shadow-[0_12px_30px_-20px_rgba(75,46,42,0.7)]"
                  >
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-espresso text-caramel transition-colors group-hover:bg-coffee group-hover:text-cream">
                      <Icon name={s.icon} className="h-4 w-4" />
                    </span>
                    <span>
                      <span className="block text-sm font-semibold text-espresso">{c.title}</span>
                      <span className="mt-0.5 line-clamp-2 block text-xs text-espresso/60">{c.desc}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <form onSubmit={submit} noValidate className="px-5 py-7 sm:px-8">
            <p className="mb-7 text-sm leading-relaxed text-espresso/70">{copy?.formIntro}</p>

            <input
              type="text"
              name="_hp"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="pointer-events-none absolute h-0 w-0 opacity-0"
              onChange={(e) => set("_hp", e.target.value)}
            />

            <h3 className="kicker mb-4 text-coffee">{f.yourDetails}</h3>
            <div className="grid gap-4 sm:grid-cols-2">{customerFields.map(renderField)}</div>

            {service.variants && copy && (
              <>
                <h3 className="kicker mt-9 mb-4 border-t border-caramel/50 pt-7 text-coffee">{f.shipmentType}</h3>
                <p className="mb-3 text-sm text-espresso/75">{copy.variantQuestion}</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {service.variants.map((v) => {
                    const on = variant === v.key;
                    return (
                      <button
                        type="button"
                        key={v.key}
                        aria-pressed={on}
                        onClick={() => setVariant(v.key)}
                        className={`rounded-2xl border px-5 py-4 text-start transition-all duration-300 ${
                          on
                            ? "border-espresso bg-espresso text-cream"
                            : "border-caramel/60 bg-cream-soft text-espresso hover:border-coffee hover:bg-caramel/20"
                        }`}
                      >
                        <span className="block text-base font-semibold" dir="ltr">
                          {v.key}
                        </span>
                        <span className={`mt-0.5 block text-xs ${on ? "text-caramel" : "text-espresso/60"}`}>
                          {copy.variantCaptions?.[v.key]}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </>
            )}

            {activeFields.length > 0 && (
              <div key={variant ?? "default"} className="fade-in">
                <h3 className="kicker mt-9 mb-4 border-t border-caramel/50 pt-7 text-coffee">
                  {copy?.title} {f.detailsSuffix}
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">{activeFields.map(renderField)}</div>

                <h3 className="kicker mt-9 mb-4 border-t border-caramel/50 pt-7 text-coffee">{f.documents}</h3>
                <label
                  htmlFor="inq_files"
                  className="block cursor-pointer rounded-2xl border border-dashed border-coffee/45 bg-cream-soft px-4 py-7 text-center transition-colors hover:border-coffee hover:bg-caramel/15"
                >
                  <span className="block text-sm font-medium text-espresso">{f.uploadTitle}</span>
                  <span className="mt-1 block text-xs text-espresso/55">{f.uploadHint}</span>
                </label>
                <input
                  id="inq_files"
                  type="file"
                  multiple
                  accept={ALLOWED.join(",")}
                  className="sr-only"
                  onChange={onFiles}
                />
                {files.length > 0 && (
                  <ul className="mt-3 space-y-1 text-xs text-coffee">
                    {files.map((x) => (
                      <li key={x.name}>• {x.name}</li>
                    ))}
                  </ul>
                )}
                {errors.files && <p className="mt-2 text-xs text-red-600">{errors.files}</p>}

                {/* ---- Submission channel ---- */}
                <h3 className="kicker mt-9 mb-2 border-t border-caramel/50 pt-7 text-coffee">{f.sendVia}</h3>
                <p className="mb-4 text-xs text-espresso/55">{f.sendViaHint}</p>
                <div className="grid gap-3 sm:grid-cols-3" role="radiogroup" aria-label={f.sendVia}>
                  {channels.map((c) => {
                    const on = channel === c.key;
                    return (
                      <button
                        type="button"
                        key={c.key}
                        role="radio"
                        aria-checked={on}
                        onClick={() => setChannel(c.key)}
                        className={`rounded-2xl border px-4 py-4 text-start transition-all duration-300 ${
                          on
                            ? "border-espresso bg-espresso text-cream"
                            : "border-caramel/60 bg-cream-soft text-espresso hover:border-coffee hover:bg-caramel/20"
                        }`}
                      >
                        <span className="block text-sm font-semibold">{c.label}</span>
                        <span
                          className={`mt-1 block text-[0.72rem] ${on ? "text-caramel" : "text-espresso/55"}`}
                          dir="ltr"
                        >
                          {c.detail}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-9 flex flex-col gap-3 border-t border-caramel/50 pt-7 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs text-espresso/55">{f.requiredNote}</p>
                  <Btn type="submit" disabled={sending} className="w-full sm:w-auto">
                    {sending ? f.sending : f.submit}
                  </Btn>
                </div>
              </div>
            )}

            {service.variants && !variant && (
              <p className="mt-6 rounded-xl border border-caramel/50 bg-caramel/20 px-4 py-3 text-sm text-espresso/75">
                {f.chooseOption}
              </p>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
