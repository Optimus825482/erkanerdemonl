import nodemailer from "nodemailer";

/**
 * Gmail SMTP — App Password ile.
 * Environment variables:
 *   - GMAIL_USER: gönderen adres (örn: info@erkanerdem.online)
 *   - GMAIL_APP_PASSWORD: Gmail App Password (16 haneli)
 *   - CONTACT_TO_EMAIL: alıcı (default: ikinciyenikitap54@gmail.com)
 */

const GMAIL_USER = process.env.GMAIL_USER;
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;
const TO_ADDRESS =
  process.env.CONTACT_TO_EMAIL ?? "ikinciyenikitap54@gmail.com";

let transporter: nodemailer.Transporter | null = null;

function getTransporter(): nodemailer.Transporter | null {
  if (transporter) return transporter;
  if (!GMAIL_USER || !GMAIL_APP_PASSWORD) return null;

  transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: GMAIL_USER,
      pass: GMAIL_APP_PASSWORD,
    },
  });
  return transporter;
}

interface ContactEmailParams {
  name: string;
  email: string;
  subject: string | null;
  message: string;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function sendContactEmail({
  name,
  email,
  subject,
  message,
}: ContactEmailParams): Promise<{ ok: boolean; error?: string }> {
  const tx = getTransporter();
  if (!tx) {
    console.warn(
      "[email] GMAIL_USER / GMAIL_APP_PASSWORD not set, skipping email. Message saved to DB.",
    );
    return { ok: true };
  }

  const finalSubject = subject
    ? `[İletişim] ${subject} — ${name}`
    : `[İletişim] Yeni mesaj — ${name}`;

  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #1a1a1a; color: #fafaf9;">
      <h2 style="margin: 0 0 8px; font-size: 18px; border-bottom: 1px solid #fafaf9; padding-bottom: 12px; letter-spacing: 0.1em; text-transform: uppercase; font-weight: 600;">
        Yeni İletişim Mesajı
      </h2>
      <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
        <tr>
          <td style="padding: 6px 0; color: #a3a3a3; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; width: 90px;">
            İsim
          </td>
          <td style="padding: 6px 0; font-size: 14px;">${escapeHtml(name)}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; color: #a3a3a3; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em;">
            E-posta
          </td>
          <td style="padding: 6px 0; font-size: 14px;">
            <a href="mailto:${escapeHtml(email)}" style="color: #ff4d2e; text-decoration: none;">${escapeHtml(email)}</a>
          </td>
        </tr>
        <tr>
          <td style="padding: 6px 0; color: #a3a3a3; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em;">
            Konu
          </td>
          <td style="padding: 6px 0; font-size: 14px;">${escapeHtml(subject ?? "—")}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; color: #a3a3a3; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em;">
            Tarih
          </td>
          <td style="padding: 6px 0; font-size: 14px;">${new Date().toLocaleString("tr-TR")}</td>
        </tr>
      </table>
      <div style="margin-top: 20px; padding: 16px; border-left: 2px solid #ff4d2e; background: #262626;">
        <p style="margin: 0; white-space: pre-wrap; font-size: 14px; line-height: 1.7;">${escapeHtml(message)}</p>
      </div>
      <p style="margin-top: 24px; font-size: 11px; color: #a3a3a3;">
        Bu mesaj erkanerdem.online iletişim formu üzerinden gönderildi.
      </p>
    </div>
  `.trim();

  const text = `
Yeni İletişim Mesajı
==================

İsim:    ${name}
E-posta: ${email}
Konu:    ${subject ?? "—"}
Tarih:   ${new Date().toLocaleString("tr-TR")}

Mesaj:
${message}

---
Bu mesaj erkanerdem.online iletişim formu üzerinden gönderildi.
  `.trim();

  try {
    await tx.sendMail({
      from: GMAIL_USER,
      to: TO_ADDRESS,
      replyTo: email,
      subject: finalSubject,
      html,
      text,
    });
    return { ok: true };
  } catch (err) {
    console.error("[email] Gmail SMTP error:", err);
    return {
      ok: false,
      error: err instanceof Error ? err.message : "Unknown error",
    };
  }
}
