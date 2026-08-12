/**
 * Reference server-side handler for the service-specific inquiry forms.
 * Deploy at /api/inquiry (Vercel / Netlify function / Node server).
 *
 * The frontend POSTs multipart/form-data:
 *   payload  -> JSON string with all answered fields (service, shipmentType, values, chips)
 *   file_0.. -> up to 5 uploaded documents
 *
 * If this endpoint is absent, the frontend gracefully falls back to a
 * pre-filled mail client draft, so the site keeps working on static hosting.
 *
 * Environment variables (never in frontend code):
 *   SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS
 */
import nodemailer from "nodemailer";

const TO = "Rwin.tajik@gmail.com";
const ALLOWED = [".pdf", ".jpg", ".jpeg", ".png", ".doc", ".docx", ".xls", ".xlsx"];
const MAX_SIZE = 5 * 1024 * 1024;
const MAX_FILES = 5;
const rate = new Map();

const esc = (v = "") =>
  String(v).replace(/[<>&]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" })[c]).slice(0, 3000);

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const ip = (req.headers["x-forwarded-for"] || "").split(",")[0] || "unknown";
  const now = Date.now();
  const recent = (rate.get(ip) || []).filter((t) => now - t < 10 * 60 * 1000);
  if (recent.length >= 5) return res.status(429).json({ error: "Too many requests" });
  rate.set(ip, [...recent, now]);

  // Parse multipart with formidable/busboy for your runtime.
  const { fields, files = [] } = req.body;
  const data = JSON.parse(fields.payload || "{}");

  if (data._hp) return res.status(400).json({ error: "Rejected" }); // honeypot
  if (!data.fullName || !data.email || !data.phone) return res.status(400).json({ error: "Missing required fields" });
  if (!/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(data.email)) return res.status(400).json({ error: "Invalid email" });

  const attachments = files
    .slice(0, MAX_FILES)
    .filter((f) => f.size <= MAX_SIZE && ALLOWED.some((e) => f.originalFilename.toLowerCase().endsWith(e)))
    .map((f) => ({ filename: f.originalFilename, path: f.filepath }));

  const rows = Object.entries(data)
    .filter(([k, v]) => v && !["_hp", "to", "subject"].includes(k))
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 12px;background:#F7F1EA"><b>${esc(k)}</b></td><td style="padding:6px 12px">${esc(
          Array.isArray(v) ? v.join(", ") : v,
        )}</td></tr>`,
    )
    .join("");

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });

  await transporter.sendMail({
    from: `"Arvin Tajik Website" <${process.env.SMTP_USER}>`,
    to: TO,
    replyTo: esc(data.email),
    subject: `New ${esc(data.service)} Inquiry — Arvin Tajik`,
    html: `<h2 style="font-family:Georgia,serif">New ${esc(data.service)} inquiry</h2>
           <table style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px">${rows}</table>`,
    attachments,
  });

  return res.status(200).json({ ok: true });
}
