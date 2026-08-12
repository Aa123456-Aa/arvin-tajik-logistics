export type Lang = "en" | "fa";

export const CONTACT = {
  phone: "+98 998 179 7972",
  phoneRaw: "989981797972",
  email: "Rwin.tajik@gmail.com",
  whatsapp: "https://wa.me/989981797972",
  telegram: "https://t.me/arvin_tajik",
  telegramHandle: "@arvin_tajik",
  linkedin: "https://www.linkedin.com/in/arvin-tajik-9a92ab339",
};

export const INCOTERMS = [
  "EXW",
  "FCA",
  "FAS",
  "FOB",
  "CFR",
  "CIF",
  "CPT",
  "CIP",
  "DAP",
  "DPU",
  "DDP",
] as const;

/* ------------------------------------------------------------------ */
/*  FORM FIELD SCHEMA                                                   */
/* ------------------------------------------------------------------ */

export type FieldType = "text" | "email" | "tel" | "date" | "number" | "textarea" | "select" | "chips" | "combobox";

export type FieldDef = {
  name: string;
  type?: FieldType;
  required?: boolean;
  options?: string[]; // option-group key
  optionGroup?: string;
  placeholder?: boolean;
  hint?: boolean;
  full?: boolean;
};

export type Field = {
  name: string;
  label: string;
  type?: FieldType;
  required?: boolean;
  options?: string[];
  placeholder?: string;
  hint?: string;
  full?: boolean;
};

/* ---- localized labels for every field name used anywhere ---- */
const FIELD_LABELS: Record<Lang, Record<string, string>> = {
  en: {
    fullName: "Full Name",
    company: "Company Name",
    email: "Email Address",
    phone: "Phone / WhatsApp",
    origin: "Origin",
    destination: "Destination",
    commodity: "Commodity",
    cargoDescription: "Cargo Description",
    incoterm: "Incoterm / Shipping Term",
    weight: "Total Weight",
    dimensions: "Dimensions (L × W × H)",
    packages: "Number of Packages",
    containers: "Number of Containers",
    containerType: "Container Type",
    volume: "Cargo Volume (CBM)",
    truckType: "Truck Type Required",
    deliveryDate: "Required Delivery Date",
    cargoConditions: "Special Cargo Conditions",
    specialRequirements: "Special Requirements",
    additionalRequirements: "Additional Requirements",
    message: "Additional Message",
    preferredMode: "Preferred Transportation Mode",
    routeRequirements: "Route & Transportation Requirements",
    packaging: "Packaging",
    transportRequirements: "Transportation Requirements",
    handlingRequirements: "Special Handling Requirements",
    additionalInfo: "Additional Information",
    product: "Product / Goods Required",
    productDescription: "Detailed Product Description",
    quantity: "Required Quantity",
    supplierCountry: "Supplier / Seller Country",
    desiredSupplierCountry: "Desired Supplier Country",
    destinationCountry: "Destination Country",
    purchaseDate: "Required Purchase Date",
    tradingCompanyType: "Type of Trading Company Required",
    budget: "Budget (if applicable)",
    purchaseRequirements: "Purchase Requirements",
    supplierRequirements: "Supplier Requirements",
    country: "Your Country",
    buyerCountry: "Buyer Country",
    currency: "Required Currency",
    amount: "Payment Amount (if applicable)",
    paymentDate: "Required Payment Date",
    transactionDetails: "Transaction Details",
    purchaseDescription: "Purchase Description",
    hsCode: "HS Code",
    destinationCustoms: "Destination Customs / Customs Office",
    arrivalDate: "Expected Arrival Date at Customs",
    transportMode: "Transportation Mode",
    customsRequirements: "Customs Requirements",
  },
  fa: {
    fullName: "نام و نام خانوادگی",
    company: "نام شرکت",
    email: "آدرس ایمیل",
    phone: "تلفن / واتساپ",
    origin: "مبدأ",
    destination: "مقصد",
    commodity: "کالا / Commodity",
    cargoDescription: "شرح کالا",
    incoterm: "اینکوترمز / شرایط حمل",
    weight: "وزن کل",
    dimensions: "ابعاد (طول × عرض × ارتفاع)",
    packages: "تعداد بسته",
    containers: "تعداد کانتینر",
    containerType: "نوع کانتینر",
    volume: "حجم بار (مترمکعب)",
    truckType: "نوع کامیون مورد نیاز",
    deliveryDate: "تاریخ تحویل مورد نیاز",
    cargoConditions: "شرایط ویژه بار",
    specialRequirements: "الزامات ویژه",
    additionalRequirements: "الزامات تکمیلی",
    message: "توضیحات تکمیلی",
    preferredMode: "روش حمل ترجیحی",
    routeRequirements: "الزامات مسیر و حمل‌ونقل",
    packaging: "نوع بسته‌بندی",
    transportRequirements: "الزامات حمل‌ونقل",
    handlingRequirements: "الزامات ویژه جابه‌جایی",
    additionalInfo: "اطلاعات تکمیلی",
    product: "کالای مورد نیاز",
    productDescription: "شرح دقیق کالا",
    quantity: "مقدار مورد نیاز",
    supplierCountry: "کشور تأمین‌کننده / فروشنده",
    desiredSupplierCountry: "کشور تأمین‌کننده مورد نظر",
    destinationCountry: "کشور مقصد",
    purchaseDate: "تاریخ خرید مورد نیاز",
    tradingCompanyType: "نوع شرکت بازرگانی مورد نیاز",
    budget: "بودجه (در صورت وجود)",
    purchaseRequirements: "الزامات خرید",
    supplierRequirements: "الزامات تأمین‌کننده",
    country: "کشور شما",
    buyerCountry: "کشور خریدار",
    currency: "ارز مورد نیاز",
    amount: "مبلغ پرداخت (در صورت وجود)",
    paymentDate: "تاریخ پرداخت مورد نیاز",
    transactionDetails: "جزئیات معامله",
    purchaseDescription: "شرح خرید",
    hsCode: "کد اچ‌اس (HS Code)",
    destinationCustoms: "گمرک مقصد / اداره گمرک",
    arrivalDate: "تاریخ تخمینی ورود بار به گمرک",
    transportMode: "روش حمل",
    customsRequirements: "الزامات گمرکی",
  },
};

const HINTS: Record<Lang, Record<string, string>> = {
  en: {
    dimensions: "Dimensions are essential for accurate pricing.",
    hsCode: "Optional. Enter your HS Code if available.",
    incoterm: "Select a standard Incoterm or type your preferred shipping / trade term.",
    productDescription: "Specifications, models, grades, brands, standards or certifications required.",
    supplierRequirements: "Certifications, payment terms, minimum order quantity, delivery terms.",
    routeRequirements: "Corridors to use or avoid, transit constraints, border considerations.",
    handlingRequirements: "Lifting points, crane requirements, escorts, permits, route surveys.",
    transactionDetails: "Parties involved, payment terms and any existing arrangements.",
  },
  fa: {
    dimensions: "ابعاد دقیق برای محاسبه صحیح نرخ حمل ضروری است.",
    hsCode: "اختیاری. در صورت وجود، کد اچ‌اس (HS Code) خود را وارد کنید.",
    incoterm: "یک اینکوترمز استاندارد را انتخاب کنید یا شرایط حمل / تجاری مورد نظر خود را تایپ کنید.",
    productDescription: "مشخصات فنی، مدل، گرید، برند، استانداردها یا گواهی‌های مورد نیاز.",
    supplierRequirements: "گواهی‌ها، شرایط پرداخت، حداقل مقدار سفارش، شرایط تحویل.",
    routeRequirements: "کریدورهای مورد نظر یا غیرقابل استفاده، محدودیت ترانزیت، ملاحظات مرزی.",
    handlingRequirements: "نقاط بارگیری، نیاز به جرثقیل، اسکورت، مجوزها، بررسی مسیر.",
    transactionDetails: "طرف‌های درگیر، شرایط پرداخت و توافق‌های موجود.",
  },
};

const PLACEHOLDERS: Record<Lang, Record<string, string>> = {
  en: {
    weight: "e.g. 1,250 kg",
    dimensions: "e.g. 120 × 80 × 95 cm",
    volume: "e.g. 4.2 CBM",
    hsCode: "e.g. 8471.30",
    incoterm: "e.g. FOB, CIF, or custom term",
  },
  fa: {
    weight: "مثال: ۱۲۵۰ کیلوگرم",
    dimensions: "مثال: ۱۲۰ × ۸۰ × ۹۵ سانتی‌متر",
    volume: "مثال: ۴٫۲ مترمکعب",
    hsCode: "مثال: 8471.30",
    incoterm: "مثال: FOB، CIF یا شرایط سفارشی",
  },
};

const OPTIONS: Record<Lang, Record<string, string[]>> = {
  en: {
    conditions: ["Battery", "Dangerous Goods", "Temperature-Controlled", "High-Value", "Branded", "Other"],
    containerType: ["20GP", "40GP", "40HC", "Other"],
    truckType: ["Standard Trailer", "Refrigerated", "Flatbed", "Tanker", "Not Sure — Advise"],
    preferredMode: ["Air + Road", "Sea + Road", "Sea + Rail", "Rail + Road", "Air + Sea", "Not Sure — Recommend a Route"],
    packaging: ["Crated", "Skidded / Palletised", "On Frame", "Uncrated / Bare", "Other"],
    tradingCompanyType: [
      "Manufacturer Direct",
      "Authorised Distributor",
      "General Trading Company",
      "Specialised Trading Company",
      "Not Sure — Advise",
    ],
    currency: ["USD", "EUR", "AED", "CNY", "TRY", "GBP", "RUB", "Other"],
    transportMode: ["Air", "Sea", "Rail", "Road", "Multimodal"],
    incoterm: ["EXW", "FCA", "FAS", "FOB", "CFR", "CIF", "CPT", "CIP", "DAP", "DPU", "DDP"],
  },
  fa: {
    conditions: ["باتری", "کالای خطرناک (DG)", "کنترل دما", "باارزش", "برندی", "سایر"],
    containerType: ["۲۰ فوت (20GP)", "۴۰ فوت (40GP)", "۴۰ فوت مرتفع (40HC)", "سایر"],
    truckType: ["تریلر استاندارد", "یخچالی", "کفی (Flatbed)", "تانکر", "مطمئن نیستم — راهنمایی کنید"],
    preferredMode: [
      "هوایی + جاده‌ای",
      "دریایی + جاده‌ای",
      "دریایی + ریلی",
      "ریلی + جاده‌ای",
      "هوایی + دریایی",
      "مطمئن نیستم — مسیر پیشنهاد دهید",
    ],
    packaging: ["جعبه چوبی", "پالت‌بندی‌شده", "روی فریم", "بدون بسته‌بندی", "سایر"],
    tradingCompanyType: [
      "مستقیم از تولیدکننده",
      "نماینده رسمی توزیع",
      "شرکت بازرگانی عمومی",
      "شرکت بازرگانی تخصصی",
      "مطمئن نیستم — راهنمایی کنید",
    ],
    currency: ["دلار (USD)", "یورو (EUR)", "درهم (AED)", "یوان (CNY)", "لیر (TRY)", "پوند (GBP)", "روبل (RUB)", "سایر"],
    transportMode: ["هوایی", "دریایی", "ریلی", "جاده‌ای", "چندوجهی"],
    incoterm: ["EXW", "FCA", "FAS", "FOB", "CFR", "CIF", "CPT", "CIP", "DAP", "DPU", "DDP"],
  },
};

const f = (name: string, extra: Partial<FieldDef> = {}): FieldDef => ({ name, ...extra });

const CUSTOMER_DEFS: FieldDef[] = [
  f("fullName", { required: true }),
  f("company"),
  f("email", { type: "email", required: true }),
  f("phone", { type: "tel", required: true }),
];

const D = {
  origin: f("origin", { required: true }),
  destination: f("destination", { required: true }),
  commodity: f("commodity", { required: true }),
  cargoDesc: f("cargoDescription", { type: "textarea", required: true, full: true }),
  weight: f("weight", { placeholder: true }),
  dims: f("dimensions", { placeholder: true, hint: true }),
  dimsReq: f("dimensions", { placeholder: true, hint: true, required: true }),
  packages: f("packages", { type: "number" }),
  containers: f("containers", { type: "number", required: true }),
  containerType: f("containerType", { type: "select", optionGroup: "containerType" }),
  deliveryDate: f("deliveryDate", { type: "date" }),
  conditions: f("cargoConditions", { type: "chips", optionGroup: "conditions", full: true }),
  requirements: f("additionalRequirements", { type: "textarea", full: true }),
  special: f("specialRequirements", { type: "textarea", full: true }),
  message: f("message", { type: "textarea", full: true }),
  hsCode: f("hsCode", { placeholder: true, hint: true }),
  incoterm: f("incoterm", {
    type: "combobox",
    optionGroup: "incoterm",
    placeholder: true,
    hint: true,
  }),
};

export function resolveFields(defs: FieldDef[], lang: Lang): Field[] {
  return defs.map((d) => ({
    name: d.name,
    label: FIELD_LABELS[lang][d.name] ?? d.name,
    type: d.type,
    required: d.required,
    full: d.full,
    options: d.optionGroup ? OPTIONS[lang][d.optionGroup] : undefined,
    placeholder: d.placeholder ? PLACEHOLDERS[lang][d.name] : undefined,
    hint: d.hint ? HINTS[lang][d.name] : undefined,
  }));
}

export const getCustomerFields = (lang: Lang) => resolveFields(CUSTOMER_DEFS, lang);

/* ------------------------------------------------------------------ */
/*  SERVICES                                                            */
/* ------------------------------------------------------------------ */

export type ServiceCopy = {
  title: string;
  desc: string;
  bullets?: { t: string; d: string }[];
  list?: string[];
  formTitle: string;
  formIntro: string;
  variantQuestion?: string;
  variantCaptions?: Record<string, string>;
};

export type Service = {
  id: string;
  no: string;
  icon: string;
  variants?: { key: string; defs: FieldDef[] }[];
  defs?: FieldDef[];
};

export const SERVICES: Service[] = [
  {
    id: "air",
    no: "01",
    icon: "air",
    defs: [
      D.origin,
      D.destination,
      D.commodity,
      D.hsCode,
      D.incoterm,
      D.weight,
      D.dims,
      D.packages,
      D.deliveryDate,
      D.cargoDesc,
      D.conditions,
      D.special,
      D.message,
    ],
  },
  {
    id: "sea",
    no: "02",
    icon: "sea",
    variants: [
      {
        key: "FCL",
        defs: [
          D.origin,
          D.destination,
          D.commodity,
          D.hsCode,
          D.incoterm,
          D.containers,
          D.containerType,
          D.weight,
          D.deliveryDate,
          D.cargoDesc,
          D.conditions,
          D.requirements,
          D.message,
        ],
      },
      {
        key: "LCL",
        defs: [
          D.origin,
          D.destination,
          D.commodity,
          D.hsCode,
          D.incoterm,
          D.packages,
          D.weight,
          D.dimsReq,
          f("volume", { placeholder: true }),
          D.deliveryDate,
          D.cargoDesc,
          D.conditions,
          D.requirements,
          D.message,
        ],
      },
    ],
  },
  {
    id: "rail",
    no: "03",
    icon: "rail",
    defs: [
      D.origin,
      D.destination,
      D.commodity,
      D.hsCode,
      D.incoterm,
      D.containers,
      D.containerType,
      D.weight,
      D.deliveryDate,
      D.cargoDesc,
      D.conditions,
      D.requirements,
      D.message,
    ],
  },
  {
    id: "road",
    no: "04",
    icon: "road",
    variants: [
      {
        key: "FTL",
        defs: [
          D.origin,
          D.destination,
          D.commodity,
          D.hsCode,
          D.incoterm,
          D.weight,
          f("truckType", { type: "select", optionGroup: "truckType" }),
          D.deliveryDate,
          D.cargoDesc,
          D.conditions,
          D.special,
          D.message,
        ],
      },
      {
        key: "LTL",
        defs: [
          D.origin,
          D.destination,
          D.commodity,
          D.hsCode,
          D.incoterm,
          D.packages,
          D.weight,
          D.dimsReq,
          D.deliveryDate,
          D.cargoDesc,
          D.conditions,
          D.special,
          D.message,
        ],
      },
    ],
  },
  {
    id: "multimodal",
    no: "05",
    icon: "multimodal",
    defs: [
      D.origin,
      D.destination,
      D.commodity,
      D.hsCode,
      D.incoterm,
      D.weight,
      D.dims,
      D.packages,
      D.deliveryDate,
      f("preferredMode", { type: "select", optionGroup: "preferredMode" }),
      D.cargoDesc,
      f("routeRequirements", { type: "textarea", full: true, hint: true }),
      D.conditions,
      D.requirements,
      D.message,
    ],
  },
  {
    id: "project",
    no: "06",
    icon: "project",
    defs: [
      D.commodity,
      D.hsCode,
      D.incoterm,
      D.cargoDesc,
      D.weight,
      D.dimsReq,
      D.packages,
      f("packaging", { type: "select", optionGroup: "packaging" }),
      D.origin,
      D.destination,
      D.deliveryDate,
      f("transportRequirements", { type: "textarea", full: true }),
      f("handlingRequirements", { type: "textarea", full: true, hint: true }),
      f("additionalInfo", { type: "textarea", full: true }),
    ],
  },
  {
    id: "sourcing",
    no: "07",
    icon: "sourcing",
    defs: [
      f("product", { required: true }),
      f("productDescription", { type: "textarea", required: true, full: true, hint: true }),
      f("quantity", { required: true }),
      f("desiredSupplierCountry"),
      f("destinationCountry", { required: true }),
      f("purchaseDate", { type: "date" }),
      f("tradingCompanyType", { type: "select", optionGroup: "tradingCompanyType" }),
      f("budget"),
      f("purchaseRequirements", { type: "textarea", full: true }),
      f("supplierRequirements", { type: "textarea", full: true, hint: true }),
      D.requirements,
      D.message,
    ],
  },
  {
    id: "payment",
    no: "08",
    icon: "payment",
    defs: [
      f("country", { required: true }),
      f("buyerCountry", { required: true }),
      f("supplierCountry", { required: true }),
      f("currency", { type: "select", required: true, optionGroup: "currency" }),
      f("amount"),
      f("paymentDate", { type: "date" }),
      f("transactionDetails", { type: "textarea", required: true, full: true, hint: true }),
      f("purchaseDescription", { type: "textarea", full: true }),
      f("additionalInfo", { type: "textarea", full: true }),
    ],
  },
  {
    id: "customs",
    no: "09",
    icon: "customs",
    defs: [
      f("hsCode", { required: true, hint: true, placeholder: true }),
      f("commodity", { required: true }),
      f("weight", { required: true, placeholder: true }),
      D.dimsReq,
      D.packages,
      f("origin", { required: true }),
      f("destinationCustoms", { required: true }),
      f("arrivalDate", { type: "date", required: true }),
      f("transportMode", { type: "select", optionGroup: "transportMode" }),
      D.incoterm,
      D.cargoDesc,
      f("customsRequirements", { type: "textarea", full: true }),
      f("additionalInfo", { type: "textarea", full: true }),
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  UI + SECTION COPY                                                   */
/* ------------------------------------------------------------------ */

const EN = {
  dir: "ltr" as const,
  meta: {
    title: "Arvin Tajik — International Trade & Logistics Specialist",
    description:
      "Air, sea, rail, road and multimodal transportation, project cargo, international sourcing, payment coordination and customs clearance.",
  },
  brand: { name: "ARVIN TAJIK", nameCased: "Arvin Tajik", role: "International Trade & Logistics Specialist", short: "Trade & Logistics" },
  nav: {
    home: "Home",
    services: "Services",
    cargo: "Cargo",
    process: "Process",
    about: "Why Me",
    contact: "Contact",
    quote: "Request a Quote",
    open: "Open menu",
    close: "Close menu",
    skip: "Skip to content",
    language: "Language",
  },
  hero: {
    badge: "FIATA Certified",
    tags: ["Freight Forwarding", "Project Cargo", "Multimodal Transportation", "International Trade"],
    lead: "Practical logistics solutions for complex international shipments — from sourcing and international payments to transportation, customs clearance and final delivery.",
    explore: "Explore Services",
    modes: "Air · Sea · Rail · Road",
    modesCaption: "Multimodal Coordination",
    photoAlt: "Arvin Tajik, International Trade & Logistics Specialist",
  },
  intro: {
    kicker: "Introduction",
    title: "International logistics, built around your cargo",
    paragraphs: [
      "Every shipment has its own requirements.",
      "Cargo type, destination, urgency, regulations, budget and current transportation conditions can all affect the right logistics solution.",
      "I work with customers to assess these requirements and coordinate the most practical transportation and trade solution — including specialized and multimodal routes when a conventional shipping method is not suitable.",
    ],
  },
  services: {
    kicker: "Services",
    title: "Transportation, trade and customs — coordinated",
    subtitle: "Each service has its own inquiry form, asking only the questions that matter for that shipment type.",
    quote: "Request a Quote",
    quoteFor: "for",
  },
  special: {
    kicker: "Specialized & Complex Cargo",
    title: "Some cargo requires considerably more planning than a standard shipment",
    lead: "I have practical experience coordinating:",
    items: [
      "Dangerous Goods",
      "Pharmaceutical Cargo",
      "Temperature-Controlled Cargo",
      "High-Value Cargo",
      "IT & Server Shipments",
      "Technology Cargo",
      "Branded Cargo",
      "Special Cargo",
      "Project Cargo",
    ],
    note: "Cargo specifications, restrictions, urgency and documentation requirements are assessed before determining the appropriate transportation solution.",
  },
  process: {
    kicker: "Process",
    title: "From purchase to delivery",
    steps: [
      { no: "01", t: "Sourcing", d: "Finding and coordinating with a suitable supplier or Trading Company." },
      { no: "02", t: "Purchase", d: "Coordinating the commercial and purchasing process." },
      { no: "03", t: "International Payment", d: "Coordinating the required payment arrangements." },
      { no: "04", t: "Cargo", d: "Reviewing cargo specifications, restrictions and documentation." },
      { no: "05", t: "Transportation", d: "Selecting and coordinating Air, Sea, Rail, Road or Multimodal transportation." },
      { no: "06", t: "Customs", d: "Coordinating import procedures and customs clearance." },
      { no: "07", t: "Delivery", d: "Coordinating the final stage of transportation and delivery." },
    ],
  },
  why: {
    kicker: "Why customers work with me",
    title: "Coordination, not just quotation",
    items: [
      { t: "Practical Experience", d: "Hands-on experience in international freight forwarding and transportation coordination." },
      { t: "Complex Cargo", d: "Experience with Dangerous Goods, pharmaceutical, temperature-controlled, high-value and technology shipments." },
      { t: "Flexible Routing", d: "Ability to evaluate different transportation modes and develop multimodal solutions when required." },
      { t: "International Coordination", d: "Coordination with overseas agents, airlines, carriers, customs and logistics partners." },
      { t: "End-to-End Support", d: "The ability to coordinate sourcing, trading, international payments, transportation and customs as connected parts of one process." },
      { t: "Trade Knowledge", d: "Practical knowledge of Incoterms, freight documentation and international shipping procedures." },
    ],
    qualification: { t: "Professional Qualification", d: "FIATA Certified" },
  },
  cargo: {
    kicker: "Cargo Experience",
    title: "Cargo I coordinate",
    items: [
      { t: "Technology & IT", d: "Servers, networking equipment, IT hardware and other technology shipments." },
      { t: "High-Value Cargo", d: "Shipments requiring careful planning, routing and handling." },
      { t: "Dangerous Goods", d: "Cargo requiring specialized transportation, documentation and regulatory considerations." },
      { t: "Pharmaceutical & Temperature-Controlled", d: "Shipments requiring controlled transportation conditions and appropriate handling." },
      { t: "Industrial & Project Cargo", d: "Specialized and project-related shipments requiring customized transportation planning." },
      { t: "Branded Cargo", d: "Branded shipments requiring additional attention to documentation, handling or transportation requirements." },
    ],
  },
  solution: {
    title: "A solution for the shipment — not just a rate",
    paragraphs: [
      "A freight quotation is only one part of international logistics.",
      "The right solution depends on the cargo, route, timing, restrictions and operational requirements.",
      "My approach is to understand the shipment first, evaluate the available options and coordinate a solution that makes sense for the specific situation.",
    ],
  },
  cta: {
    title: "Have a shipment in mind?",
    text: "Send me the details of your cargo and I will review the requirements and available logistics options.",
  },
  contact: {
    kicker: "Contact",
    title: "Let's move your cargo",
    text: "Whether you need a freight solution, customs clearance, international sourcing, payment coordination or a complete trade and logistics service, send me your requirements.",
    whatsapp: "WhatsApp",
    labels: { phone: "Phone / WhatsApp", email: "Email", location: "Location" },
    location: "Karaj, Iran",
  },
  footer: {
    role: "International Trade & Logistics",
    tag: "Freight Forwarding • Project Cargo • Multimodal Transportation • Sourcing • Customs Clearance",
    explore: "Explore",
    contact: "Contact",
    rights: "© 2026 Arvin Tajik. All rights reserved.",
  },
  form: {
    eyebrow: "Request a Quote",
    confirm: "Confirmation",
    pickTitle: "Select a service",
    pickIntro: "Select the service you need — the inquiry form will adapt to that shipment type.",
    yourDetails: "Your Details",
    shipmentType: "Shipment Type",
    detailsSuffix: "Details",
    documents: "Documents",
    uploadTitle: "Upload supporting documents",
    uploadHint: "Invoice, packing list, cargo specifications — PDF, JPG, PNG, DOC, XLS · max 5 files · 5 MB each",
    requiredNote: "Fields marked * are required.",
    submit: "Submit Inquiry",
    sending: "Sending…",
    select: "Select…",
    chooseOption: "Choose an option above to continue.",
    closeLabel: "Close inquiry form",
    close: "Close",
    successTitle: "Inquiry received",
    successHead: "Thank you for contacting me.",
    successBody:
      "Your inquiry has been received successfully. I will review the shipment details and get back to you regarding the available solution.",
    successWhatsapp: "Message on WhatsApp",
    errRequired: "Required",
    errEmail: "Enter a valid email address",
    errFiles: "Some files were rejected (type or size).",
    sendVia: "Send inquiry via",
    sendViaHint: "Choose your preferred way to send this inquiry.",
    sendEmail: "Email",
    sendWhatsapp: "WhatsApp",
    sendTelegram: "Telegram",
    customIncoterm: "Or type a custom shipping / trade term",
  },
  serviceCopy: {
    air: {
      title: "Air Freight",
      desc: "For urgent, time-sensitive, high-value and specialized shipments.",
      formTitle: "Air Freight Inquiry",
      formIntro: "Cargo dimensions are especially important for air freight — please provide them as accurately as possible.",
    },
    sea: {
      title: "Sea Freight",
      desc: "FCL and LCL solutions for commercial, industrial and larger-volume cargo.",
      formTitle: "Sea Freight Inquiry",
      formIntro: "Select your shipment type so the right details can be reviewed.",
      variantQuestion: "Is this an FCL or LCL shipment?",
      variantCaptions: { FCL: "Full Container Load", LCL: "Less than Container Load" },
    },
    rail: {
      title: "Rail Freight",
      desc: "Efficient alternatives for selected international trade routes.",
      formTitle: "Rail Freight Inquiry",
      formIntro: "Rail freight is handled as a full-container transportation request.",
    },
    road: {
      title: "Road Transportation",
      desc: "International and regional trucking, including pickup and delivery coordination.",
      formTitle: "Road Transportation Inquiry",
      formIntro: "Select the load type so the relevant details can be collected.",
      variantQuestion: "Is this an FTL or LTL shipment?",
      variantCaptions: { FTL: "Full Truckload", LTL: "Less than Truckload" },
    },
    multimodal: {
      title: "Multimodal Transportation",
      desc: "Combining two or more transportation modes to create practical routes when a single mode cannot efficiently serve the shipment. Multimodal solutions can be particularly valuable for complex routes, restricted corridors and challenging transportation conditions where flexibility and alternative routing are essential.",
      formTitle: "Multimodal Transportation Inquiry",
      formIntro: "Describe the route and transportation requirements as fully as possible.",
    },
    project: {
      title: "Project Cargo",
      desc: "For industrial, oversized or project-related shipments, transportation needs to be planned around the cargo.",
      bullets: [
        { t: "Cargo Assessment", d: "Review of weight, dimensions, packaging and special requirements." },
        { t: "Route Planning", d: "Evaluation of available routes and transportation modes." },
        { t: "Transportation Coordination", d: "Coordination with carriers, overseas agents and logistics partners." },
        { t: "Documentation & Customs", d: "Coordination of required shipping and customs procedures." },
      ],
      formTitle: "Project Cargo Inquiry",
      formIntro: "For industrial, oversized and project-related shipments.",
    },
    sourcing: {
      title: "International Sourcing & Trading",
      desc: "International logistics can begin before the cargo even exists. If you need to purchase goods from abroad, I can assist with sourcing and trading coordination — so sourcing and transportation requirements are considered together from the beginning of the transaction.",
      list: [
        "Finding suitable Trading Companies",
        "Supplier and seller coordination",
        "Purchase coordination",
        "Commercial communication",
        "Import procurement",
        "Trading arrangements",
        "Coordination between buyer, seller and logistics parties",
      ],
      formTitle: "International Sourcing & Trading Inquiry",
      formIntro: "Describe what you want to purchase and the type of supplier or Trading Company you need.",
    },
    payment: {
      title: "International Payment Coordination",
      desc: "International purchases may require coordination between multiple parties and payment channels. I assist with coordinating international payment arrangements between buyers, suppliers, sellers and Trading Companies as part of the overall trade process.",
      formTitle: "International Payment Coordination Inquiry",
      formIntro: "This inquiry focuses on your international payment requirements only.",
    },
    customs: {
      title: "Customs Clearance",
      desc: "Once the cargo arrives, customs clearance becomes the next critical stage. I provide coordination and support throughout the import process.",
      list: [
        "Import customs clearance",
        "Customs documentation",
        "HS Code coordination",
        "Customs cost estimation",
        "Customs broker coordination",
        "Import procedures",
        "Coordination between consignee, customs and logistics parties",
      ],
      formTitle: "Customs Clearance Inquiry",
      formIntro: "HS Code, cargo details and the expected arrival date at customs are the most important information.",
    },
  } as Record<string, ServiceCopy>,
};

export type Dict = typeof EN;

const FA: Dict = {
  dir: "rtl" as unknown as "ltr",
  meta: {
    title: "آروین تاجیک — متخصص تجارت و لجستیک بین‌المللی",
    description:
      "حمل هوایی، دریایی، ریلی، جاده‌ای و چندوجهی، بار پروژه‌ای، تأمین بین‌المللی، هماهنگی پرداخت و ترخیص کالا.",
  },
  brand: {
    name: "آروین تاجیک",
    nameCased: "آروین تاجیک",
    role: "متخصص تجارت و لجستیک بین‌المللی",
    short: "تجارت و لجستیک",
  },
  nav: {
    home: "خانه",
    services: "خدمات",
    cargo: "انواع بار",
    process: "فرآیند",
    about: "چرا من",
    contact: "تماس",
    quote: "درخواست قیمت",
    open: "باز کردن منو",
    close: "بستن منو",
    skip: "پرش به محتوا",
    language: "زبان",
  },
  hero: {
    badge: "دارای گواهی FIATA",
    tags: ["فورواردینگ", "بار پروژه‌ای", "حمل‌ونقل چندوجهی", "تجارت بین‌الملل"],
    lead: "راهکارهای عملی لجستیک برای محموله‌های پیچیده بین‌المللی — از تأمین کالا و پرداخت‌های بین‌المللی تا حمل‌ونقل، ترخیص کالا و تحویل نهایی.",
    explore: "مشاهده خدمات",
    modes: "هوایی · دریایی · ریلی · جاده‌ای",
    modesCaption: "هماهنگی چندوجهی",
    photoAlt: "آروین تاجیک، متخصص تجارت و لجستیک بین‌المللی",
  },
  intro: {
    kicker: "معرفی",
    title: "لجستیک بین‌المللی، طراحی‌شده بر اساس بار شما",
    paragraphs: [
      "هر محموله الزامات خاص خود را دارد.",
      "نوع کالا، مقصد، فوریت، مقررات، بودجه و شرایط جاری حمل‌ونقل، همگی می‌توانند بر انتخاب راهکار درست لجستیکی اثر بگذارند.",
      "من در کنار مشتریان این الزامات را بررسی می‌کنم و عملی‌ترین راهکار حمل‌ونقل و تجاری را هماهنگ می‌کنم — از جمله مسیرهای تخصصی و چندوجهی، در مواردی که روش حمل متعارف پاسخگو نیست.",
    ],
  },
  services: {
    kicker: "خدمات",
    title: "حمل‌ونقل، تجارت و گمرک — یکپارچه و هماهنگ",
    subtitle: "هر خدمت فرم درخواست اختصاصی خود را دارد و تنها اطلاعات مرتبط با همان نوع محموله را می‌پرسد.",
    quote: "درخواست قیمت",
    quoteFor: "برای",
  },
  special: {
    kicker: "بارهای تخصصی و پیچیده",
    title: "برخی بارها به مراتب بیش از یک محموله معمولی نیازمند برنامه‌ریزی هستند",
    lead: "تجربه عملی من در هماهنگی این بارها:",
    items: [
      "کالای خطرناک (DG)",
      "بار دارویی",
      "بار کنترل‌دما",
      "بار باارزش",
      "تجهیزات IT و سرور",
      "بار فناوری",
      "بار برندی",
      "بار ویژه",
      "بار پروژه‌ای",
    ],
    note: "مشخصات کالا، محدودیت‌ها، فوریت و الزامات اسنادی، پیش از تعیین راهکار مناسب حمل‌ونقل بررسی می‌شوند.",
  },
  process: {
    kicker: "فرآیند",
    title: "از خرید تا تحویل",
    steps: [
      { no: "۰۱", t: "تأمین کالا", d: "یافتن و هماهنگی با تأمین‌کننده یا شرکت بازرگانی مناسب." },
      { no: "۰۲", t: "خرید", d: "هماهنگی فرآیند تجاری و خرید." },
      { no: "۰۳", t: "پرداخت بین‌المللی", d: "هماهنگی ترتیبات پرداخت مورد نیاز." },
      { no: "۰۴", t: "بار", d: "بررسی مشخصات کالا، محدودیت‌ها و اسناد." },
      { no: "۰۵", t: "حمل‌ونقل", d: "انتخاب و هماهنگی حمل هوایی، دریایی، ریلی، جاده‌ای یا چندوجهی." },
      { no: "۰۶", t: "گمرک", d: "هماهنگی رویه‌های واردات و ترخیص کالا." },
      { no: "۰۷", t: "تحویل", d: "هماهنگی مرحله نهایی حمل و تحویل کالا." },
    ],
  },
  why: {
    kicker: "چرا مشتریان با من کار می‌کنند",
    title: "هماهنگی، نه فقط اعلام نرخ",
    items: [
      { t: "تجربه عملی", d: "تجربه میدانی در فورواردینگ بین‌المللی و هماهنگی حمل‌ونقل." },
      { t: "بارهای پیچیده", d: "تجربه در کالای خطرناک، دارویی، کنترل‌دما، باارزش و محموله‌های فناوری." },
      { t: "مسیریابی منعطف", d: "توانایی ارزیابی روش‌های مختلف حمل و طراحی راهکارهای چندوجهی در صورت نیاز." },
      { t: "هماهنگی بین‌المللی", d: "هماهنگی با نمایندگان خارجی، ایرلاین‌ها، خطوط حمل، گمرک و شرکای لجستیکی." },
      { t: "پشتیبانی یکپارچه", d: "توانایی هماهنگی تأمین، بازرگانی، پرداخت بین‌المللی، حمل‌ونقل و گمرک به‌عنوان بخش‌های به‌هم‌پیوسته یک فرآیند." },
      { t: "دانش تجاری", d: "آشنایی عملی با اینکوترمز، اسناد حمل و رویه‌های حمل‌ونقل بین‌المللی." },
    ],
    qualification: { t: "مدرک حرفه‌ای", d: "دارای گواهی FIATA" },
  },
  cargo: {
    kicker: "تجربه انواع بار",
    title: "بارهایی که هماهنگ می‌کنم",
    items: [
      { t: "فناوری و IT", d: "سرور، تجهیزات شبکه، سخت‌افزار و سایر محموله‌های فناوری." },
      { t: "بار باارزش", d: "محموله‌هایی که نیازمند برنامه‌ریزی، مسیریابی و جابه‌جایی دقیق هستند." },
      { t: "کالای خطرناک", d: "باری که به حمل تخصصی، مستندسازی و ملاحظات مقرراتی نیاز دارد." },
      { t: "دارویی و کنترل‌دما", d: "محموله‌هایی که نیازمند شرایط حمل کنترل‌شده و جابه‌جایی مناسب هستند." },
      { t: "بار صنعتی و پروژه‌ای", d: "محموله‌های تخصصی و پروژه‌ای که برنامه‌ریزی حمل سفارشی می‌طلبند." },
      { t: "بار برندی", d: "محموله‌های برندی که به توجه بیشتر در اسناد، جابه‌جایی یا الزامات حمل نیاز دارند." },
    ],
  },
  solution: {
    title: "راهکاری برای محموله — نه صرفاً یک نرخ",
    paragraphs: [
      "نرخ حمل تنها بخشی از لجستیک بین‌المللی است.",
      "راهکار درست به کالا، مسیر، زمان‌بندی، محدودیت‌ها و الزامات عملیاتی بستگی دارد.",
      "رویکرد من این است که ابتدا محموله را به‌درستی بشناسم، گزینه‌های موجود را ارزیابی کنم و راهکاری متناسب با همان شرایط خاص هماهنگ کنم.",
    ],
  },
  cta: {
    title: "محموله‌ای در دست دارید؟",
    text: "جزئیات بار خود را برای من ارسال کنید تا الزامات و گزینه‌های لجستیکی موجود را بررسی کنم.",
  },
  contact: {
    kicker: "تماس",
    title: "بار شما را جابه‌جا کنیم",
    text: "چه به یک راهکار حمل، ترخیص کالا، تأمین بین‌المللی، هماهنگی پرداخت یا یک خدمت کامل تجاری و لجستیکی نیاز داشته باشید، الزامات خود را برای من بفرستید.",
    whatsapp: "واتساپ",
    labels: { phone: "تلفن / واتساپ", email: "ایمیل", location: "موقعیت" },
    location: "کرج، ایران",
  },
  footer: {
    role: "تجارت و لجستیک بین‌المللی",
    tag: "فورواردینگ • بار پروژه‌ای • حمل‌ونقل چندوجهی • تأمین بین‌المللی • ترخیص کالا",
    explore: "بخش‌ها",
    contact: "تماس",
    rights: "© ۲۰۲۶ آروین تاجیک. تمامی حقوق محفوظ است.",
  },
  form: {
    eyebrow: "درخواست قیمت",
    confirm: "تأیید",
    pickTitle: "انتخاب خدمت",
    pickIntro: "خدمت مورد نظر خود را انتخاب کنید — فرم درخواست متناسب با همان نوع محموله تنظیم می‌شود.",
    yourDetails: "اطلاعات شما",
    shipmentType: "نوع محموله",
    detailsSuffix: "— جزئیات",
    documents: "اسناد",
    uploadTitle: "بارگذاری اسناد پشتیبان",
    uploadHint: "فاکتور، لیست بسته‌بندی، مشخصات کالا — PDF، JPG، PNG، DOC، XLS · حداکثر ۵ فایل · هرکدام تا ۵ مگابایت",
    requiredNote: "فیلدهای دارای * الزامی هستند.",
    submit: "ارسال درخواست",
    sending: "در حال ارسال…",
    select: "انتخاب کنید…",
    chooseOption: "برای ادامه، یکی از گزینه‌های بالا را انتخاب کنید.",
    closeLabel: "بستن فرم درخواست",
    close: "بستن",
    successTitle: "درخواست دریافت شد",
    successHead: "از تماس شما سپاسگزارم.",
    successBody:
      "درخواست شما با موفقیت دریافت شد. جزئیات محموله را بررسی می‌کنم و درباره راهکار موجود با شما تماس خواهم گرفت.",
    successWhatsapp: "ارسال پیام در واتساپ",
    errRequired: "الزامی",
    errEmail: "یک ایمیل معتبر وارد کنید",
    errFiles: "برخی فایل‌ها پذیرفته نشدند (نوع یا حجم نامعتبر).",
    sendVia: "ارسال درخواست از طریق",
    sendViaHint: "روش مورد نظر خود را برای ارسال این درخواست انتخاب کنید.",
    sendEmail: "ایمیل",
    sendWhatsapp: "واتساپ",
    sendTelegram: "تلگرام",
    customIncoterm: "یا شرایط حمل / تجاری دلخواه را تایپ کنید",
  },
  serviceCopy: {
    air: {
      title: "حمل هوایی — Air Freight",
      desc: "برای محموله‌های فوری، حساس به زمان، باارزش و تخصصی.",
      formTitle: "درخواست حمل هوایی",
      formIntro: "ابعاد بار در حمل هوایی اهمیت ویژه‌ای دارد — لطفاً آن را تا حد امکان دقیق وارد کنید.",
    },
    sea: {
      title: "حمل دریایی — Sea Freight",
      desc: "راهکارهای FCL و LCL برای بارهای تجاری، صنعتی و با حجم بالاتر.",
      formTitle: "درخواست حمل دریایی",
      formIntro: "نوع محموله را انتخاب کنید تا اطلاعات مرتبط بررسی شود.",
      variantQuestion: "محموله شما FCL است یا LCL؟",
      variantCaptions: { FCL: "کانتینر دربست", LCL: "کمتر از یک کانتینر" },
    },
    rail: {
      title: "حمل ریلی — Rail Freight",
      desc: "جایگزینی کارآمد برای مسیرهای تجاری بین‌المللی منتخب.",
      formTitle: "درخواست حمل ریلی",
      formIntro: "حمل ریلی به‌صورت درخواست حمل کانتینری دربست بررسی می‌شود.",
    },
    road: {
      title: "حمل جاده‌ای — Road Transportation",
      desc: "حمل جاده‌ای بین‌المللی و منطقه‌ای، شامل هماهنگی بارگیری و تحویل.",
      formTitle: "درخواست حمل جاده‌ای",
      formIntro: "نوع بارگیری را انتخاب کنید تا اطلاعات مرتبط دریافت شود.",
      variantQuestion: "محموله شما FTL است یا LTL؟",
      variantCaptions: { FTL: "کامیون دربست", LTL: "کمتر از یک کامیون" },
    },
    multimodal: {
      title: "حمل‌ونقل چندوجهی — Multimodal",
      desc: "ترکیب دو یا چند روش حمل برای ایجاد مسیرهای عملی، در شرایطی که یک روش به‌تنهایی نمی‌تواند محموله را به‌صورت کارآمد جابه‌جا کند. راهکارهای چندوجهی به‌ویژه در مسیرهای پیچیده، کریدورهای محدود و شرایط دشوار حمل‌ونقل ارزشمند هستند؛ جایی که انعطاف‌پذیری و مسیریابی جایگزین اهمیت اساسی دارد.",
      formTitle: "درخواست حمل چندوجهی",
      formIntro: "مسیر و الزامات حمل‌ونقل را تا حد امکان کامل شرح دهید.",
    },
    project: {
      title: "بار پروژه‌ای — Project Cargo",
      desc: "در محموله‌های صنعتی، فوق‌حجیم یا پروژه‌ای، حمل‌ونقل باید بر اساس خودِ بار برنامه‌ریزی شود.",
      bullets: [
        { t: "ارزیابی بار", d: "بررسی وزن، ابعاد، بسته‌بندی و الزامات ویژه." },
        { t: "برنامه‌ریزی مسیر", d: "ارزیابی مسیرها و روش‌های حمل در دسترس." },
        { t: "هماهنگی حمل‌ونقل", d: "هماهنگی با خطوط حمل، نمایندگان خارجی و شرکای لجستیکی." },
        { t: "اسناد و گمرک", d: "هماهنگی رویه‌های حمل و گمرکی مورد نیاز." },
      ],
      formTitle: "درخواست بار پروژه‌ای",
      formIntro: "ویژه محموله‌های صنعتی، فوق‌حجیم و پروژه‌ای.",
    },
    sourcing: {
      title: "تأمین و بازرگانی بین‌المللی",
      desc: "لجستیک بین‌المللی می‌تواند پیش از وجود کالا آغاز شود. اگر قصد خرید کالا از خارج را دارید، در تأمین کالا و هماهنگی بازرگانی همراه شما هستم — به‌گونه‌ای که الزامات تأمین و حمل از ابتدای معامله با هم دیده شوند.",
      list: [
        "یافتن شرکت‌های بازرگانی مناسب",
        "هماهنگی با تأمین‌کننده و فروشنده",
        "هماهنگی خرید",
        "مکاتبات و ارتباطات تجاری",
        "تدارکات واردات",
        "ترتیبات بازرگانی",
        "هماهنگی میان خریدار، فروشنده و طرف‌های لجستیکی",
      ],
      formTitle: "درخواست تأمین و بازرگانی بین‌المللی",
      formIntro: "کالای مورد نظر و نوع تأمین‌کننده یا شرکت بازرگانی مورد نیاز خود را شرح دهید.",
    },
    payment: {
      title: "هماهنگی پرداخت بین‌المللی",
      desc: "خریدهای بین‌المللی ممکن است نیازمند هماهنگی میان چند طرف و چند کانال پرداخت باشد. من ترتیبات پرداخت بین‌المللی میان خریداران، تأمین‌کنندگان، فروشندگان و شرکت‌های بازرگانی را به‌عنوان بخشی از فرآیند کلی تجارت هماهنگ می‌کنم.",
      formTitle: "درخواست هماهنگی پرداخت بین‌المللی",
      formIntro: "این فرم صرفاً بر الزامات پرداخت بین‌المللی شما متمرکز است.",
    },
    customs: {
      title: "ترخیص کالا — Customs Clearance",
      desc: "پس از رسیدن بار، ترخیص کالا به مرحله حیاتی بعدی تبدیل می‌شود. در تمام مراحل فرآیند واردات، هماهنگی و پشتیبانی ارائه می‌دهم.",
      list: [
        "ترخیص گمرکی واردات",
        "اسناد گمرکی",
        "هماهنگی کد اچ‌اس (HS Code)",
        "برآورد هزینه‌های گمرکی",
        "هماهنگی با کارگزار گمرکی",
        "رویه‌های واردات",
        "هماهنگی میان گیرنده کالا، گمرک و طرف‌های لجستیکی",
      ],
      formTitle: "درخواست ترخیص کالا",
      formIntro: "کد HS، مشخصات بار و تاریخ تخمینی ورود به گمرک، مهم‌ترین اطلاعات مورد نیاز هستند.",
    },
  } as Record<string, ServiceCopy>,
};

export const DICT: Record<Lang, Dict> = { en: EN, fa: FA };

export const CARGO_IMAGES = [
  "/img/IMG_20260812_225201_003.PNG",
  "/img/IMG_20260812_225155_069.PNG",
  "/img/IMG-20260812-WA0001.jpg",
  "/img/IMG_20260812_225149_515.PNG",
  "/img/IMG_20260812_225155_120.PNG",
  "/img/IMG_20260812_225154_914.PNG",
];
