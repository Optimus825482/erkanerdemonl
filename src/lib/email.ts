import { Resend } from "resend";

/**
 * Resend email client — server-side only.
 * RESEND_API_KEY environment variable gerekli.
 */
const apiKey = process.env.RESEND_API_KEY;

export const resend = apiKey ? new Resend(apiKey) : null;

interface ContactEmailParams {
  name: string;
  email: string;
  subject: string | null;
  message: string;
}

const FROM_ADDRESS =
  process.env.CONTACT_FROM_EMAIL ?? "noreply@erkanerdem.online";
const TO_ADDRESS =
  process.env.CONTACT_TO_EMAIL ?? "ikinciyenikitap54@gmail.com";

/**
 * İletişim formu mesajını ilgili adrese gönder.
 * RESEND_API_KEY yoksa no-op (DB kaydı yine de çalışır).
 */
export async function sendContactEmail({
  name,
  email,
  subject,
  message,
}: ContactEmailParams): Promise<{ ok: boolean; error?: string }> {
  if (!resend) {
    console.warn(
      "[email] RESEND_API_KEY not set, skipping email send. Message saved to DB only.",
    );
    return { ok: true };
  }

  try {
    const result = await resend.emails.send({
      from: FROM_ADDRESS,
      to: TO_ADDRESS,
      replyTo: email,
      subject: subject
        ? `[İletişim] ${subject} — ${name}`
        : `[İletişim] Yeni mesaj — ${name}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #1a1a1a; color: #fafaf9;">
          <h2 style="margin: 0 0 8px; font-size: 20px; border-bottom: 1px solid #fafaf9; padding-bottom: 12px;">
            Yeni İletişim Mesajı
          </h2>
          <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
            <tr>
              <td style="padding: 8px 0; color: #a3a3a3; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; width: 100px;">
                İsim
              </td>
              <td style="padding: 8px 0; font-size: 14px;">${escapeHtml(name)}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #a3a3a3; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">
                E-posta
              </td>
              <td style="padding: 8px 0; font-size: 14px;">
                <a href="mailto:${escapeHtml(email)}" style="color: #ff4d2e;">${escapeHtml(email)}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #a3a3a3; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">
                Konu
              </td>
              <td style="padding: 8px 0; font-size: 14px;">${escapeHtml(subject ?? "—")}</td>
            </tr>
          </table>
          <div style="margin-top: 24px; padding: 16px; border-left: 2px solid #ff4d2e; background: #262626;">
            <p style="margin: 0; white-space: pre-wrap; font-size: 14px; line-height: 1.6;">${escapeHtml(message)}</p>
          </div>
          <p style="margin-top: 24px; font-size: 11px; color: #a3a3a3;">
            Bu mesaj erkanerdem.online iletişim formu üzerinden gönderildi.
          </p>
        </div>
      `,
      text: `
Yeni İletişim Mesajı
==================

İsim:   ${name}
E-posta: ${email}
Konu:   ${subject ?? "—"}

Mesaj:
${message}

---
Bu mesaj erkanerdem.online iletişim formu üzerinden gönderildi.
      `.trim(),
    });

    if (result.error) {
      console.error("[email] Resend error:", result.error);
      return { ok: false, error: result.error.message };
    }

    return { ok: true };
  } catch (err) {
    console.error("[email] Failed to send contact email:", err);
    return { ok: false, error: err instanceof Error ? err.message : "Unknown error" };
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
