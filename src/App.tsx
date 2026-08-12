import { useCallback, useState } from "react";
import Nav from "./components/Nav";
import InquiryModal from "./components/InquiryModal";
import {
  CargoExperience,
  Contact,
  Footer,
  Hero,
  Intro,
  Process,
  QuoteCta,
  Services,
  SolutionStatement,
  SpecialCargo,
  Why,
} from "./components/Sections";
import { CONTACT } from "./content";
import { I18nProvider, useI18n } from "./i18n";

function WhatsAppFab() {
  return (
    <a
      href={CONTACT.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`WhatsApp ${CONTACT.phone}`}
      className="fixed bottom-4 z-40 flex h-14 w-14 items-center justify-center rounded-full border-2 border-caramel bg-espresso text-cream shadow-[0_12px_28px_-14px_rgba(30,26,24,0.9)] transition-[transform,background-color,color] duration-300 hover:-translate-y-0.5 hover:bg-caramel hover:text-deep ltr:right-4 rtl:left-4 sm:bottom-6 sm:ltr:right-6 sm:rtl:left-6"
    >
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden>
        <path d="M12 2a10 10 0 00-8.6 15L2 22l5.2-1.4A10 10 0 1012 2zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .1-1.7-.1-.4-.1-.9-.3-1.6-.6-2.8-1.2-4.6-4-4.7-4.2-.1-.2-1.1-1.4-1.1-2.7s.7-1.9 1-2.2c.2-.2.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 1.9c.1.2.1.3 0 .5l-.4.5-.3.3c-.1.1-.2.3-.1.5.1.2.6 1.1 1.4 1.8 1 .9 1.8 1.2 2 1.3.2.1.4.1.5-.1l.7-.9c.2-.2.3-.2.5-.1l1.9.9c.2.1.4.2.4.3.1.2.1.7-.1 1.3z" />
      </svg>
    </a>
  );
}

function Site() {
  const { t } = useI18n();
  const [serviceId, setServiceId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const openQuote = useCallback((id: string | null) => {
    setServiceId(id);
    setOpen(true);
  }, []);

  return (
    <div className="min-h-screen bg-cream-soft">
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:z-[200] focus:rounded-full focus:bg-espresso focus:px-5 focus:py-2.5 focus:text-sm focus:text-cream ltr:focus:left-3 rtl:focus:right-3"
      >
        {t.nav.skip}
      </a>

      <Nav onQuote={() => openQuote(null)} />

      <main>
        <Hero onQuote={openQuote} />
        <Intro />
        <Services onQuote={openQuote} />
        <SpecialCargo />
        <Process />
        <Why />
        <CargoExperience />
        <SolutionStatement />
        <QuoteCta onQuote={openQuote} />
        <Contact onQuote={openQuote} />
      </main>

      <Footer onQuote={openQuote} />
      <WhatsAppFab />

      <InquiryModal
        open={open}
        serviceId={serviceId}
        onClose={() => setOpen(false)}
        onSelectService={(id) => setServiceId(id)}
      />
    </div>
  );
}

export default function App() {
  return (
    <I18nProvider>
      <Site />
    </I18nProvider>
  );
}
